<template>
  <div class="body">
    <top></top>
    <Navigation></Navigation>
    <div class="carDiv">
      <Spin fix v-if="loading"></Spin>
      <Table class="carTable" :columns="columns" :data="product"></Table>
    </div>
    <section class="detail-mes">
      <ul>
        <li class="detail-content">
          <ul class="default">
            <li>合计:</li>
            <li>运费:</li>
          </ul>
          <ul class="pay-mes">
            <li>{{totalMoney | formatMoney}}</li>
            <li>￥0.00</li>
          </ul>
        </li>
      </ul>
    </section>
    <section class="last-current">
      <ul>
        <li class="last-contain">
          <ul class="last-default">
            <li>实付款:</li>
          </ul>
          <ul class="last-mes">
            <li>{{totalMoney | formatMoney}}</li>
          </ul>
        </li>
        <li>
          <button class="settlement" style="cursor:pointer;" @click="visibel = true">结算</button>
        </li>
      </ul>
    </section>
    <Modal v-model="visibel" width="80" style="padding: 10px;">
      <span slot="footer">
        <Button type="primary" @click="$router.push('address')">管理收货地址</Button>
      </span>
      <Table :data="addressData" :columns="addressColumns"></Table>
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
        addToCar(
          this.product[i].product._id,
          this.product[i].count
        );
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

<style scoped>
.detail-mes {
  width: 1190px;
  height: 100px;
  margin: 0px auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.detail-content {
  margin-right: 86px;
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
}
.default {
  text-align: right;
  color: #ccc;
}
.pay-mes {
  text-align: left;
  color: black;
}
.pay-mes li,
.default li {
  margin: 7px 0;
}
.last-current {
  width: 1190px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.last-contain {
  margin-right: 50px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.last-default {
  color: #ccc;
}
.last-mes {
  color: black;
  font-weight: bold;
  font-size: 23px;
}
.settlement {
  width: 170px;
  height: 50px;
  border: none;
  color: white;
  font-size: 16px;
  float: right;
  background-color: black;
  margin-top: 20px;
}
</style>

<style>
.carDiv {
  width: 1190px;
  margin: 20px auto;
}
.carImg {
  width: 120px;
  height: 120px;
}
</style>