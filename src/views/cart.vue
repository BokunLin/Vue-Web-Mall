<template>
  <div class="body">
    <top></top>
    <Navigation></Navigation>
    <div class="carDiv">
      <Table class="carTable" :columns="columns" :data="product"></Table>
    </div>
    <section class="detail-mes">
      <ul>
        <li class="detail-content">
          <ul class="default">
            <li>{{message.total}}</li>
            <li>{{message.freight}}</li>
            <li>{{message.coupon}}</li>
          </ul>
          <ul class="pay-mes">
            <li>{{pay.totalmoney}}</li>
            <li>{{pay.payfreight}}</li>
            <li>{{pay.pon}}</li>
          </ul>
        </li>
      </ul>
    </section>
    <section class="last-current">
      <ul>
        <li class="last-contain">
          <ul class="last-default">
            <li>{{pay.real}}</li>
          </ul>
          <ul class="last-mes">
            <li>{{pay.realpay}}</li>
          </ul>
        </li>
        <li>
          <button class="settlement">结算</button>
        </li>
      </ul>
    </section>
    <bottom></bottom>
  </div>
</template>

<script>
import top from "@/components/top";
import bottom from "@/components/footer";
import Navigation from "@/components/nav";

import { getCar, removeCar } from '@/api/index';

export default {
  data() {
    return {
      title: "购物车",
      count: 1,
      Basics: [
        {
          goods: "商品信息",
          cost: "单价",
          count: "数量",
          money: "金额"
        }
      ],
      columns: [
        {
          title: " ",
          render: (h, params) =>
            h("img", {
              attrs: {
                src: params.row.img
              },
              class: "carImg"
            })
        },
        {
          title: "商品信息",
          key: "descript"
        },
        {
          title: "单价",
          key: "price"
        },
        {
          title: "数量",
          key: "count"
        },
        {
          title: "金额",
          key: "total"
        },
        {
          title: "操作",
          render: (h, params) =>
            h("Icon", {
              props: {
                type: "close-round"
              },
              style: "color: red",
              nativeOn: {
                click:() => {
                  this.remove(params.row._id);
                }
              }
            })
        }
      ],
      product: [],
      message: {
        total: "合计:",
        freight: "运费:",
        coupon: "优惠券:"
      },
      pay: {
        totalmoney: "￥470.00",
        payfreight: "￥0.00",
        pon: "无",
        realpay: "￥471.80",
        real: "实付款:"
      }
    };
  },
  components: {
    top,
    bottom,
    Navigation
  },
  methods: {
    remove(id) {
      removeCar(id).then(res => {
        this.$Message.success(res.msg);
        this.initData();
      })
    },
    plus() {
      this.product.count++;
    },
    minus() {
      if (this.product.count == 0) {
        return;
      }
      this.product.count--;
    },
    initData() {
      getCar().then(res => {
        console.log('res', res)
        this.product = res.data;
      })
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style scoped>
.detail-mes {
  width: 1000px;
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
  width: 120px;
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
  width: 1000px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.last-contain {
  margin-right: 50px;
  width: 150px;
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
  background-color: black;
  margin-top: 20px;
}
</style>

<style>
.carDiv {
  width: 1000px;
  margin: 20px auto;
}
.carImg {
  width: 120px;
  height: 120px;
}
</style>