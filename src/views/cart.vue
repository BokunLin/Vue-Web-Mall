<template>
  <div class="carPage" :style="{ 'min-height': `${minHeight}px` }">
    <div class="container">
      <div class="car">
        <h1>购物车</h1>
        <!-- <Table :loading="loading" :columns="columns" :data="product"></Table> -->
        <Row type="flex" :gutter="40">
          <Col :sm="17" :xs="24">
          <h3 v-if="product.length === 0">
            购物车空空如也
          </h3>
          <div v-else class="cartItem" v-for="(item, index) in product">
            <div class="closeIcon">
              <Icon size="32" type="ios-close-empty" @click.native="remove(item._id)"></Icon>
            </div>
            <Row :gutter="10">
              <Col :sm="4" :xs="6">
              <img :src="item.product.imgs[0]" alt="">
              </Col>
              <Col :sm="20" :xs="18">
              <Row>
                <Col>
                <h2>{{item.product.name}}</h2>
                </Col>
              </Row>
              <Row class="info">
                <Col :sm="12"> 尺码：均码</Col>
                <Col :sm="4"> 数量：<input type="text" v-model.number="item.count" @input="updateCap(index)"></Col>
                <Col :sm="4"> 单价： {{item.product.price | formatMoney}}</Col>
                <Col :sm="4"> 总价: {{ item.product.price * item.count | formatMoney}}</Col>
              </Row>
              </Col>
            </Row>
          </div>
          </Col>
          <Col :sm="7" :xs="24" class="summary">
          <h2>订单总计：</h2>
          <div class="detail" style="border-bottom: 1px solid #aaa;">
            <p>合计
              <span>{{ totalMoney | formatMoney }}</span>
            </p>
            <p>运费
              <span>￥0.00</span>
            </p>
            <p>优惠券
              <span>无</span>
            </p>
          </div>
          <div class="detail">
            <p>实付款
              <span class="large">{{ totalMoney | formatMoney }}</span>
            </p>
            <button @click="showAddressModal">结算</button>
          </div>
          </Col>
        </Row>
      </div>
    </div>
    <Modal v-model="visibel" width="80" class-name="addressModal">
      <span slot="footer">
        <Button type="primary" @click="$router.push('address')">管理收货地址</Button>
      </span>
      <div class="addressArea">
        <Row type="flex">
          <Col :sm="24" :xs="0">
            <Row class-name="title">
              <Col :span="12">详细地址</Col>
              <Col :span="4">联系方式</Col>
              <Col :span="4">收货人</Col>
              <Col :span="4">#</Col>
            </Row>
          </Col>
          <Col :span="24">
            <Row v-for="item in addressData" :key="item._id">
              <Col :sm="12" :xs="24">{{item.address}}{{item.detail}}</Col>
              <Col :sm="4" :xs="24">{{item.phone}}</Col>
              <Col :sm="4" :xs="24">{{item.name}}</Col>
              <Col :sm="4" :xs="24"><Button type="success" size="small" @click.native="generated(item._id)">选择并付款</Button></Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getCar,
  removeCar,
  getProduct,
  getAddress,
  getProvincesLabel,
  getCitiesLabel,
  getAreasLabel,
  getStreetsLabel,
  subOrder,
  addToCar
} from "@/api/index";

export default {
  data() {
    return {
      visibel: false,
      title: "购物车",
      count: 1,
      addressData: [],
      timer: null,
      uploadCar: [],
      loading: false,
      product: [],
      totalMoney: 0,
      minHeight: 100
    };
  },
  filters: {
    formatMoney(val) {
      return `￥${(val / 100).toFixed(2)}`;
    }
  },
  watch: {
    product: {
      deep: true,
      handler() {
        this.updateTotal();
      }
    }
  },
  methods: {
    showAddressModal() {
      if (this.product.length === 0) {
        this.$Message.error("请先添加商品到购物车");
      } else {
        this.visibel = true;
      }
    },
    updateCap(i) {
      clearTimeout(this.uploadCar[i]);
      this.uploadCar[i] = setTimeout(() => {
        addToCar(this.product[i].product._id, this.product[i].count);
      }, 2000);
    },
    generated(address) {
      let total = 0;
      const snapShoot = this.product.map(item => {
        const { count, product: { name, price, imgs: [img] } } = item;
        total += count * price;
        return { count, name, price, img };
      });
      subOrder({ address, snapShoot, total }).then(res => {
        this.$Message.success(res.msg);
        this.$router.push("/order");
      });
    },
    updateTotal() {
      let num = 0;
      this.product.forEach(el => {
        num += el.count * el.product.price;
      });
      this.totalMoney = num;
    },
    remove(id) {
      removeCar(id).then(res => {
        this.$Message.success(res.msg);
        this.initData();
      });
    },
    initData() {
      if (!sessionStorage.name) {
        return this.$store.dispatch("changeLogin", true);
      }
      this.loading = true;
      getCar().then(res => {
        this.product = [];
        res.data.forEach(item => {
          getProduct(item.product).then(data => {
            item.product = data.data;
            this.product.push(item);
          });
        });
        this.loading = false;
      });
    }
  },
  created() {
    this.initData();
    getAddress().then(res => {
      this.addressData = res.data.map(item => {
        item.address.forEach((el, index) => {
          switch (index) {
            case 0:
              getProvincesLabel(el).then(res => {
                item.address = res.data.label;
              });
              break;
            case 1:
              getCitiesLabel(el).then(res => {
                item.address += res.data.label;
              });
              break;
            case 2:
              getAreasLabel(el).then(res => {
                item.address += res.data.label;
              });
              break;
            case 3:
              getStreetsLabel(el).then(res => {
                item.address += res.data.label;
              });
              break;
          }
        });
        return item;
      });
    });
  },
  mounted() {
    setTimeout(() => {
      this.minHeight = document.getElementById("container").offsetHeight;
    }, 0);
  }
};
</script>

<style lang="scss">
.carPage {
  background-color: #fff;
  .container {
    margin: 0;
    width: 100%;
    overflow: hidden;
    .car {
      width: 100%;
      padding: 0 30px;
      max-width: 1200px;
      margin: 0 auto;
      h1 {
        margin: 30px 0 20px;
      }
      .ivu-row-flex {
        padding-bottom: 40px;
        .ivu-col {
          .cartItem {
            border: 1px solid #888;
            margin-bottom: 20px;
            padding: 20px;
            position: relative;
            .closeIcon {
              position: absolute;
              z-index: 1;
              height: 16px;
              width: 16px;
              line-height: 16px;
              top: 5px;
              right: 5px;
              cursor: pointer;
              overflow: hidden;
              i {
                height: 16px;
                line-height: 16px;
              }
            }
            h2 {
              width: 80%;
            }
            .info {
              font-weight: bold;
              color: #222;
              line-height: 2;
              font-size: 0.12rem;
              input {
                width: 35px;
                height: 35px;
                border: 1px solid #222;
                text-align: center;
                font-size: 0.2rem;
              }
            }
          }
          img {
            width: 100%;
          }
        }
        .summary {
          border: 1px solid #888;
          height: 340px;
          padding: 0 0 15px;
          & > h2 {
            line-height: 3;
            border-bottom: 1px solid #aaa;
          }
          .detail {
            line-height: 2;
            color: #888;
            padding: 15px 0;
            span {
              font-size: 0.18rem;
              font-weight: bold;
              color: #444;
              display: inline-block;
              text-align: left;
              width: 10%;
              margin-left: 20px;
            }
            .large {
              font-size: 0.25rem;
              color: #222;
            }
            button {
              margin: 35px 0 0;
              border: 0;
              color: #eee;
              background-color: #222;
              font-weight: bold;
              font-size: 0.2rem;
              width: 100%;
              transition: all 0.2s ease-out;
              cursor: pointer;
              height: 40px;
              text-align: center;
              &:hover {
                background-color: #111;
                color: #fff;
              }
            }
          }
        }
      }
    }
    @media screen and (max-width: 500px) {
      .hideXS {
        display: none;
      }
      .car {
        padding: 0 10px;
        h1 {
          margin: 15px 0;
        }
        .ivu-row-flex {
          padding: 0;
          .ivu-col {
            .cartItem {
              border: 0;
              border-bottom: 1px solid #aaa;
              h2 {
                font-size: 0.25rem;
                width: 100%;
              }
              .info {
                line-height: 1.6;
                font-weight: inherit;
                input {
                  height: 18px;
                  font-size: 0.1rem;
                }
              }
            }
          }
          .summary {
            border: 0;
            & > h2 {
              padding-bottom: 15px;
            }
          }
        }
      }
    }
  }
}
.addressModal {
  .addressArea {
    padding: 15px 20px 0;
    .title {
      background-color: #eee;
    }
    .ivu-row {
      padding: 10px 20px;
      margin: 10px 0;
      border-bottom: 1px solid #eee;
    }
    @media screen and (max-width: 500px){
      padding: 10px;
      .ivu-row {
        padding: 0 0 10px;
        .ivu-col {
          &:last-child {
            text-align: right;
            .ivu-btn-mini {
              padding: 5px 8px;
              span {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
