<template>
  <div class="order">
    <Row type="flex" class="title">
      <Col :span="6">商品图片</Col>
      <Col :span="9">订单详情</Col>
      <Col :span="3">单价</Col>
      <Col :span="3">数量</Col>
      <Col :span="3">总价</Col>
    </Row>
    <Row type="flex" class="content" v-for="(item, index) in formData" :key="index">
      <div v-for="(product, index2) in item.snapShoot" :key="index2" style="width: 100%">
        <Col :span="5" class="textCenter borderL">
        <img :src="product.img" alt="">
        </Col>
        <Col :span="10">
        <h2 style="margin: 45px 0 0;line-height: 1; width: 70%;">{{product.name}}</h2>
        <p style="line-height: 35px;">尺码： 均码</p>
        </Col>
        <Col :span="3" class="textCenter"> {{product.price}}
        </Col>
        <Col :span="3" class="textCenter">{{product.count}}</Col>
        <Col :span="3" class="textCenter borderR">{{product | total}}</Col>
      </div>
      <Col class="detail">
      <p>订单状态：{{item.state | state}}</p>
      <p>下单时间：{{item.createTime | date}}</p>
      <p>联系方式：{{item.address.phone}}</p>
      <p>收货地址：{{item.address.address}}{{item.address.detail}}</p>
      <p>订单总额：{{item.total | money}}</p>
      <Button type="success" v-if="item.state === 0" @click="changeOrder(item.id)">确认收货</Button>
      <Button type="error" v-if="item.state === 1" @click="remove(item.id)">删除订单</Button>
      </Col>
    </Row>
      <Spin fix v-if="loading"></Spin>
  </div>
</template>

<script>
import expandRow from "@/components/expand-row";
import { format } from "@/utils/moment";
import async from "async";
import {
  getOrder,
  address,
  getAddress,
  getCitiesLabel,
  getProvincesLabel,
  getStreetsLabel,
  getAreasLabel,
  getSnapShoot,
  changeOrderState,
  removeOrder
} from "@/api/index";
export default {
  data() {
    return {
      loading: false,
      formData: []
    };
  },
  methods: {
    changeOrder(id) {
      changeOrderState(id).then(res => {
        this.$Message.success(res.msg);
        this.initData();
      });
    },
    remove(id) {
      removeOrder(id).then(res => {
        this.$Message.success(res.msg);
        this.initData();
      })
    },
    initData() {
      this.loading = true;
      //* 获取所有订单
      getOrder().then(order => {
        order.data.forEach(orderItem => {
          async.parallel(
            {
              snapShoot: cb => {
                //* 获取订单快照
                const tempArr = [];
                orderItem.snapShoot.forEach(item => {
                  getSnapShoot(item).then(snapShoot => {
                    tempArr.push(snapShoot.data);
                  });
                });
                cb(null, tempArr);
              },
              address: cb => {
                //* 获取订单地址
                getAddress(orderItem.address).then(res => {
                  //* 格式化订单地址
                  res.data.map(item => {
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
                    cb(null, item);
                  });
                });
              }
            },
            (err, result) => {
              let total = 0;
              result.snapShoot.forEach(el => {
                total += el.price * el.count;
              });
              this.formData.push({
                state: orderItem.state,
                createTime: orderItem.createTime,
                address: result.address,
                snapShoot: result.snapShoot,
                total,
                id: orderItem._id
              });
              this.loading = false;
            }
          );
        });
      });
    }
  },
  filters: {
    total(val) {
      return `￥${(val.count * val.price / 100).toFixed(2)}`;
    },
    date: format,
    state(val) {
      switch (val) {
        case 0:
          return "已发货";
        case 1:
          return "已完成";
      }
    },
    money(val) {
      return `￥${(val / 100).toFixed(2)}`;
    }
  },
  components: {
    expandRow
  },
  created() { this.initData() }
};
</script>

<style>
.order {
  padding: 0 15px 30px;
}
.order .ivu-row-flex {
  margin-bottom: 30px;
}
.order .ivu-col {
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
}
.order .ivu-col {
  height: 150px;
  line-height: 150px;
}
.order .detail {
  line-height: 1;
  padding: 10px;
  width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-top: 0;
}
.order .detail p {
  margin: 6px 0;
}
.textCenter {
  text-align: center;
}
p {
  height: 12px;
}
.order img {
  height: 120px;
}
.order .title {
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  background-color: #f5f5f5;
}
.order .title .ivu-col {
  height: 40px;
  line-height: 40px;
}
.noMt {
  margin: 0;
}
.order .borderL {
  border-left: 1px solid #ddd;
}
.order .borderR {
  border-right: 1px solid #ddd;
}
</style>