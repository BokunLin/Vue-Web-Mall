<template>
  <div class="body">
    <top></top>
    <Inav></Inav>
    <section class="content">
      <transition name="fade">
        <div class="picture">
            <img :src="banner">
        </div>
      </transition>
      <div class="message">
        <p class="title">{{product.name}}</p>
        <p class="price">{{`￥${(product.price / 100).toFixed(2)}`}}</p>
        <div class="type">
          <RadioGroup type="button" size="large" class="fort">
            <Radio disabled label="均码"></Radio>
          </RadioGroup>
        </div>
        <div class="summit">
          <button class="addcart" @click="addCart" style="cursor: pointer">{{summit}}</button>
        </div>
        <p class="descript">{{product.detail}}</p>
      </div>
      <section class="preview">
        <ul>
          <li v-for="(item, index) in product.imgs" :key="index" class="imgs" @click="banner = item">
            <i></i>
            <img :src="item">
          </li>
        </ul>
      </section>
    </section>
    <bottom></bottom>
  </div>
</template>

<script>
import top from "@/components/top";
import bottom from "@/components/footer";
import Inav from "@/components/nav";

import { getProduct, addToCar } from '@/api/index';

export default {
  data() {
    return {
      size: "均码",
      summit: "加入购物车",
      banner: '',
      product: {}
    };
  },
  components: {
    top,
    bottom,
    Inav
  },
  created() {
    getProduct(this.$route.params.id).then(res => {
      if (!res.data._id) {
        this.$Message.error('商品请求错误， 请重新选择');
        this.$router.go(-1);
      }
      this.product = res.data;
      this.banner = this.product.imgs[0];
    });
  },
  methods: {
    addCart() {
      if (!sessionStorage.name) {
        this.$Message.error('请先登录');
        this.$store.dispatch('changeLogin', true);
      } else {
        addToCar(this.product._id).then(res => {
          this.$Message.success(res.msg);
        });
      }
    }
  }
};
</script>

<style scoped>
.imgs {
  cursor: pointer;
  position: relative;
}
.imgs:hover i{
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  opacity: .1;
  
}
.body {
  background-color: #fafafa;
  width: 100%;
  height: auto;
}
.content {
  width: 70%;
  margin: 40px auto;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.picture {
  width: 50%;
  height: 50%;
}
.picture img {
  width: 90%;
}
.message {
  width: 50%;
  font-family: "微软雅黑";
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.title {
  width: 80%;
  font-size: 28px;
}
.price {
  color: red;
  font-size: 19px;
  text-indent: 1em;
  margin: 15px 0;
}
.type {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.fort {
  margin: 20px 0;
}
.summit {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.addcart {
  margin: 30px 0;
  width: 209px;
  height: 60px;
  background-color: black;
  border: none;
  color: white;
}
.descript {
  margin-top: 10px;
  color: #aaa;
}
.preview {
  width: 50%;
}
.preview ul {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.preview ul li {
  width: 33.3%;
}
.preview ul li img {
  width: 90%;
}
</style>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>
