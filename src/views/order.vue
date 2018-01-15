<template>
  <div class="order" :style="{ 'min-height': `${minHeight}px` }">
    <div>
      <p class="title">我的订单</p>
      <div class="order">
        <Row type="flex" class="title">
          <Col :sm="6" :xs="6">商品图片</Col>
          <Col :sm="9" :xs="12">订单详情</Col>
          <Col :sm="3" :xs="3">单价</Col>
          <Col :sm="3" :xs="3">数量</Col>
          <Col :sm="3" :xs="0">总价</Col>
        </Row>
        <Row type="flex" v-for="(item, index) in formData" :key="index">
          <div class="content" v-for="(product, index2) in item.snapShoot" :key="index2">
            <Col :sm="5" :xs="5" class="borderL">
            <img :src="product.img" alt="">
            </Col>
            <Col :sm="10" :xs="13" class="textCenter">
            <h2>{{product.name}}</h2>
            <p>尺码： 均码</p>
            </Col>
            <Col :sm="3" :xs="3" class="textCenter">{{product.price | money}}</Col>
            <Col :sm="3" :xs="3" class="textCenter">{{product.count}}</Col>
            <Col :sm="3" :xs="0" class="textCenter hideXS">{{product | total}}</Col>
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
        <p class="default" v-if="formData.length === 0">暂无数据</p>
        <Spin fix v-if="loading"></Spin>
      </div>
    </div>
  </div>
</template>

<script>
import expandRow from "@/components/expand-row";
import { format } from "@/utils/moment";
import async from "async";
import {
  getOrder,
  address,
  getAddressById,
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
      minHeight: 100,
      loading: false,
      formData: []
    };
  },
  methods: {
    changeOrder(id) {
      changeOrderState(id).then(res => {
        this.$Message.success(res.msg);
        location.reload();
      });
    },
    remove(id) {
      removeOrder(id).then(res => {
        this.$Message.success(res.msg);
        location.reload();
      });
    },
    initData() {
      this.loading = true;
      //* 获取所有订单
      getOrder().then(order => {
        async.forEachOf(
          order.data,
          orderItem => {
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
                  getAddressById(orderItem.address).then(res => {
                    //* 格式化订单地址
                    res.data.address.forEach((el, index) => {
                      switch (index) {
                        case 0:
                          getProvincesLabel(el).then(label => {
                            res.data.address = label.data.label;
                          });
                          break;
                        case 1:
                          getCitiesLabel(el).then(label => {
                            res.data.address += label.data.label;
                          });
                          break;
                        case 2:
                          getAreasLabel(el).then(label => {
                            res.data.address += label.data.label;
                          });
                          break;
                        case 3:
                          getStreetsLabel(el).then(label => {
                            res.data.address += label.data.label;
                          });
                          break;
                      }
                    });
                    cb(null, res.data);
                  });
                }
              },
              (err, result) => {
                this.formData.push({
                  state: orderItem.state,
                  createTime: orderItem.createTime,
                  address: result.address,
                  snapShoot: result.snapShoot,
                  id: orderItem._id,
                  total: orderItem.total
                });
                this.loading = false;
              }
            );
          },
          (err, orderItemResult) => {
            this.loading = false;
          }
        );
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
  created() {
    this.initData();
  },
  mounted() {
    this.minHeight = document.getElementById("container").offsetHeight;
  }
};
</script>

<style lang="scss">
.order {
  background-color: #fff;
  width: 100%;
  max-width: 1200px;
  margin: 10px auto;
  .order {
    padding: 20px 10px;
    min-height: 278px;
    .default {
      text-align: center;
    }
    .ivu-row-flex {
      margin-bottom: 30px;
      .ivu-col {
        margin-bottom: 0px;
        border-top: 1px solid #ddd;
      }
      .detail {
        line-height: 1;
        padding: 10px;
        width: 100%;
        height: auto;
        border: 1px solid #ddd;
        p {
          margin: 6px 0;
        }
      }
    }
    .title {
      margin-bottom: 20px;
      text-align: center;
      font-size: 0.18rem;
      font-weight: bold;
      border: 0;
      height: 40px;
      background-color: #f5f5f5;
      .ivu-col {
        height: 40px;
        border: 0;
        line-height: 40px;
      }
    }
    .noMt {
      margin: 0;
    }
    .content {
      display: flex;
      align-content: center;
      justify-content: center;
      & > div {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        flex-wrap: wrap;
        h2 {
          width: 80%;
          flex-shrink: 1;
        }
        p {
          width: 80%;
          line-height: 35px;
          text-align: left;
        }
        &:first-child {
          border-left: 1px solid #ddd;
        }
        &:last-child {
          border-right: 1px solid #ddd;
        }
      }
      img {
        width: 80%;
      }
    }
  }
  p.title {
    width: 98%;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
    font-size: 0.2rem;
    border-bottom: 1px solid #ccc;
  }
  .state-list {
    width: 98%;
    height: 70px;
    margin: 0 auto;
    line-height: 70px;
    padding-left: 10px;
    border-bottom: 1px solid #ccc;
  }
  .status {
    font-size: 0.18rem;
    padding-bottom: 5px;
    cursor: pointer;
    margin-right: 10px;
  }
  .active {
    color: orange;
    border-bottom: 2px solid orange;
  }
  @media screen and (max-width: 500px) {
    .order {
      .content {
        h2 {
          font-size: 0.1rem;
          font-weight: inherit;
        }
        .hideXS {
          display: none;
        }
        & > div {
          padding: 10px 0;
          &:nth-last-child(2) {
            border-right: 1px solid #ddd;
          }
          p {
            margin: 0;
            line-height: 14px;
          }
        }
      }
    }
    p.title {
      text-align: center;
      font-size: 0.3rem;
    }
  }
}
</style>