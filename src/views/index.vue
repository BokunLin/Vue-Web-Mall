<template>
  <div>
    <top></top>
    <nav-bar></nav-bar>
    <Hbanner :mylist="Ibanner"></Hbanner>
    <div class="recommend">
      <Row type="flex" :gutter="1" align="middle" justify="center">
        <Col :span="24 / city.length" v-for="list in city" :key="list.img">
          <div class="item" @click="$router.push(`/index/detail/${list._id}`)">
            <div class="imgArea">
              <img :src="list.imgs[0]">
            </div>
            <div>
              <p class="title">{{list.name}}</p>
              <p class="price">￥{{(list.price/100).toFixed(2)}}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <div class="areaTitle">
      <p>男士专场</p>
      <p> 春 & 夏 2 0 1 8 典 藏"</p>
    </div>
    <capbanner :list="mancap"></capbanner>
    <center-content></center-content>
    <div class="areaTitle">
      <p>女士专场</p>
      <p>春 & 夏 2 0 1 8 典 藏"</p>
    </div>
    <capbanner :list="womencap"></capbanner>
    <bottom></bottom>
  </div>
</template>

<script>
//引入组件文件(components)
import top from "@/components/top";
import bottom from "@/components/footer";
import navBar from "@/components/nav";
import Hbanner from "@/components/index-banner";
import capbanner from "@/components/capBanner";
import centerContent from "@/components/center-content";

//api
import { heightBanner, getcap, getNewproduct } from "@/api/index.js";

export default {
  data() {
    return {
      nav: {
        item1: "首页",
        item2: "儿童帽",
        item3: "男士帽",
        item4: "女士帽"
      },
      Ibanner: [],
      mancap: [],
      womencap: [],
      city: [],
      detail: [],
      screen: false,
      price: ""
    };
  },
  components: {
    top,
    bottom,
    navBar,
    Hbanner,
    capbanner,
    centerContent
  },

  created() {
    heightBanner().then(response => {
      this.Ibanner = response.data;
    });
    getcap("男士帽").then(response => {
      this.mancap = response.data;
    });
    getcap("女士帽").then(response => {
      this.womencap = response.data;
    });
    getNewproduct().then(res => {
      this.city = res.data;
    });
  },
  methods: {
    search: function() {
      this.screen = !this.screen;
    },
    submit: function() {
      return;
    }
  }
};
</script>

<style lang="scss">
.recommend {
  width: 80%;
  min-width: 1200px;
  margin: 25px auto;
  border: 1px solid #666;
  background-color: #666;
  .item {
    width: 100%;
    cursor: pointer;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    .imgArea {
      display: flex;
      align-items: center;
      min-height: 144px;
      min-width: 144px;
      width: 40%;
      margin-right: 5%;
      border: 1px solid #ddd;
      img {
        width: 100%;
      }
    }
    & > div {
      width: 50%;
      .title {
        font-size: 18px;
        color: #333;
        height: 54px;
        overflow: hidden;
        line-height: 1.5;
      }
      .price {
        font-size: 14px;
        font-weight: bold;
        color: #666;
      }
    }
  }
}
.areaTitle {
  width: 100%;
  text-align: center;
  p {
    &:first-child {
      font-size: 24px;
      color: #000;
    }
    &:last-child {
      font-size: 20px;
      color: #333;
    }
  }
}
</style>
