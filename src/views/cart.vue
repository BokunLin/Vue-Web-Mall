<template>
  <div class="carPage">
    <top></top>
    <Navigation></Navigation>
    <div class="container">
      <div class="car">
        <h1>购物车</h1>
        <Table :loading="loading" :columns="columns" :data="product"></Table>
        <div class="detail">
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
      </div>
    </div>
    <Modal v-model="visibel" width="80">
      <span slot="footer">
        <Button type="primary" @click="$router.push('address')">管理收货地址</Button>
      </span>
      <div style="padding: 25px 15px 0;">
        <Table :data="addressData" :columns="addressColumns"></Table>
      </div>
    </Modal>
    <bottom></bottom>
  </div>
</template>

<script>
import top from "@/components/top";
import bottom from "@/components/footer";
import Navigation from "@/components/nav";
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
      columns: [
        {
          title: " ",
          render: (h, params) =>
            h("img", {
              attrs: {
                src: params.row.product.imgs[0]
              },
              class: "carImg"
            })
        },
        {
          title: "商品信息",
          render: (h, params) => h("span", params.row.product.name)
        },
        {
          title: "单价",
          render: (h, params) =>
            h("span", `￥${(params.row.product.price / 100).toFixed(2)}`)
        },
        {
          title: "数量",
          render: (h, params) =>
            h("span", [
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "text"
                  },
                  on: {
                    click: () => {
                      if (params.row.count > 0) {
                        this.product[params.index].count--;
                        this.updateCap(params.index);
                      }
                    }
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "minus"
                    }
                  })
                ]
              ),
              h("Input", {
                class: "countInput",
                props: {
                  size: "small",
                  value: params.row.count
                },
                style: "width: 50px",
                on: {
                  input: event => {
                    this.unShake(params.index, event);
                  }
                }
              }),
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "text"
                  },
                  on: {
                    click: () => {
                      this.product[params.index].count++;
                      this.updateCap(params.index);
                    }
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "plus"
                    }
                  })
                ]
              )
            ])
        },
        {
          title: "金额",
          render: (h, params) =>
            h(
              "span",
              "￥" +
                (params.row.count * (params.row.product.price / 100)).toFixed(2)
            )
        },
        {
          title: "操作",
          render: (h, params) =>
            h("Icon", {
              props: {
                type: "close-round"
              },
              style: "color: red;cursor:pointer",
              nativeOn: {
                click: () => {
                  this.remove(params.row._id);
                }
              }
            })
        }
      ],
      addressData: [],
      addressColumns: [
        {
          title: "收货人",
          key: "name",
          width: 100
        },
        {
          title: "联系方式",
          key: "phone",
          width: 160
        },
        {
          title: "收货地址",
          render: (h, params) =>
            h("span", params.row.address + params.row.detail)
        },
        {
          title: "",
          width: 150,
          render: (h, params) =>
            h(
              "Button",
              {
                props: {
                  type: "success"
                },
                on: {
                  click: () => {
                    this.generated(params.row._id);
                  }
                }
              },
              "选择并付款"
            )
        }
      ],
      timer: null,
      uploadCar: [],
      loading: false,
      product: [],
      totalMoney: 0
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
        //* 截流改变购物车
      }
    }
  },
  components: {
    top,
    bottom,
    Navigation
  },
  methods: {
    showAddressModal() {
      if (this.product.length === 0) {
        this.$Message.error('请先添加商品到购物车');
      } else {
        this.visibel = true;
      }
    },
    unShake(i, e) {
      clearTimeout(this.timer); // 清除未执行的代码，重置回初始化状态
      this.timer = setTimeout(() => {
        this.totalMoney += e * this.product[i].product.price;
        this.product[i].count = e;
      }, 500);
      this.updateCap(i);
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
        return this.$store.dispatch('changeLogin', true);
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
  }
};
</script>

<style lang="scss">
.carPage {

.container {
  margin: 0;
  width: 100%;
  overflow: hidden;
  .car {
    width: 80%;
    min-width: 1200px;
    margin: 0 auto;
    h1 {
      text-align: center;
      margin: 30px 0 20px;
    }
    .ivu-table-wrapper {
      border: 0;
      .ivu-table {
        &:after {
          display: none;
        }
        th {
          font-size: 14px;
          line-height: 50px;
          height: 50px;
          text-align: center;
          background-color: #fff;
        }
        td {
          text-align: center;
          span {
            display: inline-block;
            text-align: left;
          }
          padding: 10px;
        }
        input {
          text-align: center;
        }
        img {
          width: 100px;
        }
      }
    }
    .detail,
    .sub {
      line-height: 2;
      color: #888;
      border-bottom: 1px solid #eee;
      text-align: right;
      padding: 15px;
      span {
        font-size: 14px;
        font-weight: bold;
        color: #444;
        display: inline-block;
        text-align: left;
        width: 10%;
        margin-left: 20px;
      }
      .large {
        font-size: 20px;
        color: #222;
      }
      button {
        margin: 15px 0;
        border: 0;
        color: #eee;
        background-color: #222;
        font-weight: bold;
        font-size: 16px;
        width: 150px;
        transition: all 0.2s ease-out;
        cursor: pointer;
        height: 50px;
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
</style>
