<template>
  <div id="detail" :style="{ 'min-height': `${minHeight}px` }">
    <Row :gutter="20">
      <Col :sm="12">
        <div class="bannerArea">
          <div class="banner" :style="{ 'transform': `translateX(-${translateX}%)` }">
            <span v-for="(item, index) in product.imgs" :key="index">
              <img :src="item">
            </span>
          </div>
        </div>
        <div class="imgs">
          <span v-for="(item, index) in product.imgs" :key="index" @click="banner = index">
            <img :src="item">
          </span>
        </div>
      </Col>
      <Col :sm="12" class="info">
        <h1>{{product.name}}</h1>
        <b class="price">{{`￥${(product.price / 100).toFixed(2)}`}}</b>
        <div class="type">
          <RadioGroup type="button" size="large" class="fort">
            <Radio disabled label="均码"></Radio>
          </RadioGroup>
        </div>
        <div class="sub">
          <button @click="addCart">加入购物车</button>
        </div>
        <p class="intro">
          {{product.detail}}
        </p>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getProduct, addToCar } from '@/api/index';

export default {
  data() {
    return {
      size: "均码",
      summit: "加入购物车",
      banner: 0,
      translateX: 0,
      minHeight: 100,
      product: {}
    };
  },
  created() {
    getProduct(this.$route.params.id).then(res => {
      if (!res.data._id) {
        this.$Message.error('商品请求错误， 请重新选择');
        this.$router.go(-1);
      }
      this.product = res.data;
      this.banner = 0;
    });
  },
  watch: {
    banner(val) {
      this.translateX = 100 * val;
    }
  },
  methods: {
    addCart() {
      if (!sessionStorage.name) {
        this.$Message.error('请先登录');
        this.$store.dispatch('changeLogin', true);
      } else {
        addToCar(this.product._id).then(res => {
          if (res.msg === '更改数量成功') {
            this.$Message.error('购物车中已有该商品');
          } else {
            this.$Message.success(res.msg);
          }
        });
      }
    }
  },
  mounted() {
    this.minHeight = document.getElementById('container').offsetHeight;
  }
};
</script>

<style lang='scss'>
#detail {
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  margin: 0 auto;
  padding: 50px 20px;
  .bannerArea {
    overflow: hidden;
    .banner {
      position: relative;
      white-space: nowrap;
      transition: transform .2s ease-out;
      transform: translateX(0);
      &>span {
        display: inline-block;
        padding: 0 40px;
        img {
          width: 100%;
        }
      }
    }
  }
  .info {
    h1 {
      width: 80%;
      font-size: .4rem;
    }
    .price {
      color: #222;
      font-size: .35rem;
      line-height: 2;
    }
    .type {
      padding: 30px 0;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }
    .sub {
      padding: 30px 0;
      border-bottom: 1px solid #ddd;
      button {
        border: 0;
        background-color: #222;
        font-size: .2rem;
        padding: 10px 25px;
        color: #eee;
        transition: all .3s ease-out;
        cursor: pointer;
        &:hover {
          color: #fff;
          background-color: #111;
        }
      }
    }
    p.intro {
      width: 90%;
      margin-top: 15px;
      color: #aaa;
      font-size: .15rem;
      line-height: 1.8;
    }
  }
  .imgs {
    span {
      display: inline-block;
      width: 33%;
      text-align: center;
      position: relative;
      cursor: pointer;
      &:hover {
        opacity: .6;
      }
      img {
        width: 80%;
      }
    }
  }
  @media screen and (max-width: 500px){
    padding: 20px;
    .info {
      width: 100%;
      h1 {
        width: 100%;
      }
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: transform .3s ease-out;
  }
  .slide-enter-to {
    transform: translateX(0);
  }
  .slide-enter {
    transform: translateX(100%);
  }
  .slide-leave-to{
    transform: translateX(-100%);
  }
}
</style>
