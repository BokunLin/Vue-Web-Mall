<template>
  <div>
    <Table :columns="columns1" :data="list"></Table>
  </div>
</template>

<script>
import expandRow from "@/components/expand-row";

export default {
  data() {
    return {
      columns1: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              },
              class: "backcolor"
            });
          }
        },
        {
          title: " ",
          render: (h, params) =>
            h("img", {
              attrs: {
                src: params.row.img
              },
              class: "listimg"
            })
        },
        {
          title: "订单详情",
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
          title: "总价",
          key: "total"
        }
      ],
      list: [
        {
          img: "/static/images/5.jpg",
          descript: "克利夫兰骑士经典系列 9TWENTY 尺码：均码",
          price: "￥129.00",
          count: "1",
          total: "￥129.00",
          mess: {
            state: "商家已发货",
            time: "2018-01-05 09:24:43",
            mode: "在线支付",
            address: "咸蛋超人,176****7688,广东省广州市兴港西路152号",
            ordertotal: "￥259.00"
          }
        }
      ]
    };
  },
  components: {
    expandRow
  },
  created() {

  }
};
</script>

<style>

</style>