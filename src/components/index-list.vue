<template>
  <div class="capBannerArea">
    <Carousel v-model="active" :autoplay="false" :autoplay-speed="3000" dots="none"  arrow="always">
      <CarouselItem v-for="(item, index) in myArr" :key="index">
        <div class="item">
          <div v-for="product in item" :key="product._id" @click="$router.push('/detail/' + product._id)">
            <span class="imgArea">
              <img :src="product.imgs[0]">
            </span>
            <p class="title">{{product.name}}</p>
            <p class="price">￥{{(product.price/100).toFixed(2)}}</p>
          </div>
        </div>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      activeNumber: 2,
      myArr: [],
      price: ""
    };
  },
  methods: {},
  watch: {
    list(val) {
      //* 每页数量
      const count = 4;
      const length = Math.ceil(val.length / count);
      const newArr = [];
      for (let i = 0; i < length; i++) {
        const tempArr = [];
        for (let j = 0; j < 4; j++) {
          if(val[i * count + j]) tempArr.push(val[i * count + j]);
        }
        newArr.push(tempArr);
      }
      this.myArr = newArr;
    }
  },
  props: ["list"]
};
</script>

<style lang="scss">
.capBannerArea {
  padding: 0 60px;
  width: 90%;
  max-width: 1200px;
  margin: 30px auto;
  &:hover {
    .ivu-carousel-arrow.right,
    .ivu-carousel-arrow.left {
      opacity: 1;
    }
  }
  .ivu-carousel-arrow.right {
    right: -56px;
  }
  .ivu-carousel-arrow.left {
    left: -56px;
  }
  .item {
    display: flex;
    justify-content: center;
    align-content: center;
    & > div {
      width: 25%;
      overflow: hidden;
      line-height: 2;
      text-align: center;
      .imgArea {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
        margin: 0 auto;
        background-color: #fff;
        cursor: pointer;
        img {
          width: 100%;
        }
      }
      .title {
        width: 60%;
        font-size: .22rem;
        color: #000;
        white-space: nowrap;
        margin: 0 auto;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .price {
        font-size: .18rem;
        color: #888;
      }
    }
  }
  @media screen and (max-width: 500px){
    width: 100%;
    padding: 0 30px;
    .ivu-carousel-arrow.right {
      right: -22px;
      width: 20px;
      height: 20px;
    }
    .ivu-carousel-arrow.left {
      left: -22px;
      width: 20px;
      height: 20px;
    }
    .item {
      display: block;
      width: 100%;
      height: 130px;
      overflow: hidden;
      & > div {
        width: 50%;
        float: left;
      }
    }
  }
}
</style>
