<template>
  <div>
    <Carousel v-model="value3" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots" :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow" class="capbanner">
      <CarouselItem v-for="(item, index) in myArr" :key="index" class="product-container">
        <ul>
          <li class="demo-carousel product-banner" v-for="list in item" :key="list.item">
            <router-link :to="{ name:'detail', params:{id:list._id}}">
              <img :src="list.imgs[0]">
              <p class="title">{{list.name}}</p>
              <p class="price">￥{{(list.price/100).toFixed(2)}}</p>
            </router-link>
          </li>
        </ul>
      </CarouselItem>
    </Carousel>
    }
  </div>
</template>

<script>
export default {
  data() {
    return {
      value3: 0,
      activeNumber: 2,
      myArr: [],
      setting: {
        autoplay: true,
        autoplaySpeed: 4000,
        dots: "outside",
        radiusDot: true,
        trigger: "click",
        arrow: "hover"
      },
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

<style scoped>
.capbanner {
  padding-bottom: 5%;
}
.product-container {
  width: 100%;
  text-align: center;
}
.product-container ul {
  width: 80%;
  margin: 3% auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.product-banner {
  width: 23.5%;
  height: 450px;
}
.product-banner img {
  height: 281px;
}
.title {
  font-family: "微软雅黑";
  font-size: 13px;
  color: grey;
  margin: 5px;
}
.price {
  font-size: 15px;
  color: #aaa;
}
</style>	