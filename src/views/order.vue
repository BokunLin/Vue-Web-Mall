<template>
  <div>
    <top></top>
    <Inav></Inav>
    <section class="container">
      <section class="content">
        <p class="title">我的订单</p>
        <div class="state-list">
          <span type="text" class="status" :class="{active:istrue === 'order'}" @click="clickone()">全部订单</span>
          <span type="text" class="status" :class="{active:istrue === 'return'}" @click="clicktwo()">待收货</span>
          <span type="text" class="status" :class="{active:istrue === 'complate'}" @click="clickthree()">已完成</span>
        </div>
        <Itable class="Itable"></Itable>
      </section>
      <div class="backtop">
        <Icon type="chevron-up" class="arrow-up"></Icon>
        <BackTop class="back">返回顶部</BackTop>
      </div>
    </section>
    <bottom></bottom>
  </div>
</template>

<script>
import top from "@/components/top";
import Inav from "@/components/nav";
import bottom from "@/components/footer";
import Itable from "@/components/order-table";

export default {
  data() {
    return {
      istrue: "order"
    };
  },
  methods: {
    clickone() {
      this.istrue = "order";
    },
    clicktwo() {
      this.istrue = "return";
    },
    clickthree() {
      this.istrue = "complate";
    }
  },
  components: {
    top,
    Inav,
    bottom,
    Itable
  }
};
</script>

<style scoped>
.container {
  background-color: #fafafa;
  padding: 10px;
}
.content {
  width: 1190px;
  margin: 0 auto;
  background-color: #fff;
}
.backtop {
  height: 100px;
  width: 1190px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
}
.back {
  position: static !important;
  font-size: 16px;
  margin-left: 5px;
}
.arrow-up {
  font-size: 16px;
}
.return {
  width: 1190px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.Itable {
  margin-top: 20px;
}
.arrow-left {
  font-size: 16px;
  margin-right: 5px;
}
.return {
  cursor: pointer;
}
.title {
  width: 98%;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  font-size: 18px;
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
  font-size: 16px;
  padding-bottom: 5px;
  cursor: pointer;
  margin-right: 10px;
}
.active {
  color: orange;
  border-bottom: 2px solid orange;
}
</style>
<style scoped>
.listimg {
  width: 139px;
  height: 117px;
}
.backcolor {
  background-color: #fff !important;
}
</style>