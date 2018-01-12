<template>
  <div class="capBannerArea">
    <Carousel v-model="active" :autoplay="true" :autoplay-speed="3000" dots="none">
      <CarouselItem class="item" v-for="(item, index) in myArr" :key="index">
        <div v-for="list in item" :key="list.item" @click="$router.push('/index/detail/' + list._id)">
          <span class="imgArea">
            <img :src="list.imgs[0]">
          </span>
          <p class="title">{{list.name}}</p>
          <p class="price">￥{{(list.price/100).toFixed(2)}}</p>
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
      const length = Math.ceil(val.length / 4);
      const newArr = [];
      for (let i = 1; i <= length; i++) {
        const tempArr = [];
        for (let j = 0; j <= 3; j++) {
          tempArr.push(val[i * j]);
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
  width: 80%;
  min-width: 1200px;
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
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    & > div {
      width: 25%;
      height: 300px;
      overflow: hidden;
      line-height: 2;
      text-align: center;
      .imgArea {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
        margin: 0 auto;
        min-height: 216px;
        background-color: #fff;
        cursor: pointer;
        img {
          width: 100%;
        }
      }
      .title {
        width: 60%;
        font-size: 14px;
        color: #000;
        white-space: nowrap;
        margin: 0 auto;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .price {
        font-size: 14px;
        color: #888;
      }
    }
  }
}
</style>
