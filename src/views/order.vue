<template>
  <div>
    <top></top>
    <Inav></Inav>
    <div class="container">
      <div class="content">
        <p class="title">我的订单</p>
        <Itable class="Itable"></Itable>
      </div>
    </div>
    <div class="backtop">
      <Icon type="chevron-up" class="arrow-up"></Icon>
      <BackTop class="back">返回顶部</BackTop>
    </div>
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
  components: {
    top,
    Inav,
    bottom,
    Itable
  }
};
</script>

<style lang="scss">
.container {
  background-color: #fff;
  width: 80%;
  min-width: 1200px;
  margin: 10px auto;
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
  p.title {
    width: 98%;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
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
  .listimg {
    width: 139px;
    height: 117px;
  }
  .backcolor {
    background-color: #fff !important;
  }
}
.backtop {
  height: 60px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
}
</style>