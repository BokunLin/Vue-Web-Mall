<template>
  <div>
    <top></top>
    <section class="body">
      <nav-bar></nav-bar>
      <Hbanner :mylist="Ibanner"></Hbanner>
      <section class="city-style">
        <ul>
          <li v-for="list in city" :key="list.img">
            <div class="city-content" style="cursor:pointer" @click="$router.push(`/index/detail/${list._id}`)">
              <img :src="list.imgs[0]">
              <div class="city-contain">
                <p class="product-title">{{list.name}}</p>
                <p class="product-price" ref="pay">￥{{(list.price/100).toFixed(2)}}</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section class="wealthe">
        <div class="headline">
          <p class="head-title">{{headtitle}}</p>
          <p class="head-like"> {{like}}</p>
        </div>
      </section>
      <capbanner :list="mancap"></capbanner>
      <center></center>
      <section class="hot-sale">
        <p class="head-title">{{hotsale}}</p>
        <p class="head-like">{{like}}</p>
      </section>
      <capbanner :list="womencap"></capbanner>
    </section>
    <section class="footer-banner">
      <img src="/static/images/footer-banner.jpg">
    </section>
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
import center from "@/components/center-content";

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
      headtitle: "新品首发",
      like: "春 & 夏 2 0 1 8 典 藏",
      hotsale: "热销尖货",
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
    center
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

<style scoped>
.footer-banner {
  height: 300px;
}
.footer-banner img {
  height: 100%;
  width: 100%;
}
.body {
  background-color: #fafafa;
}
.nav {
  min-width: 1200px;
  height: 100px;
  background-color: #fff;
  text-align: center;
}
.nav ul {
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
}
a {
  color: black;
}
.nav ul li {
  list-style-type: none;
  flex-grow: 0.1;
  height: 30px;
  line-height: 30px;
  font-family: "微软雅黑";
  font-size: 16px;
  position: relative;
  border-bottom: 2px solid transparent;
  padding-bottom: 30px;
  cursor: pointer;
}
.hover:hover {
  border-bottom: 2px solid black;
}
.nav-search,
.cart {
  flex-grow: 0.03 !important;
  cursor: pointer;
}
.nav-search img {
  margin-right: 10px;
  width: 25px;
  height: 25px;
}
.search-input {
  width: 0;
  height: 0;
  border: none;
}
.searching {
  width: 150px;
  height: 30px;
  border: 1px solid #ccc;
  transition: 0.3 all;
  border-radius: 5px;
}
.nav-logo {
  height: 45px !important;
  background: url("/static/images/title.png") no-repeat;
  -webkit-background-size: contain;
  background-size: contain;
  background-position: center center;
  flex-grow: 0.15 !important;
}
.detail-down {
  width: 30px;
  height: 30px;
  background: url("/static/images/detail-arrow.png") no-repeat;
  -webkit-background-size: contain;
  background-size: contain;
  position: absolute;
  top: 5%;
  right: 10%;
}
.item {
  cursor: pointer;
}
.item a {
  color: black;
}
.city-style {
  margin: 5% auto;
  width: 80%;
  height: 250px;
  border: 1px solid black;
}
.city-style ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.city-style ul li {
  width: 33.3%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-left: 1px solid black;
}
.city-content {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.city-content img {
  width: 55%;
}
.city-contain {
  font-family: "微软雅黑";
  width: 55%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
}
.product-title {
  width: 100%;
  font-size: 12px;
  font-weight: bold;
  color: black;
  text-align: left;
}
.product-price {
  width: 100%;
  margin-top: 20px;
  text-align: left;
  font-size: 13px;
  color: grey;
}

.headline {
  width: 40%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}
.head-title {
  font-family: "微软雅黑";
  font-size: 30px;
  margin: 10px;
}
.head-like {
  font-size: 22px;
  color: grey;
}
.hot-sale {
  width: 100%;
  height: 100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>