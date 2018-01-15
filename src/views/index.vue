<template>
  <div id="index">
    <indexCarousel :mylist="Ibanner"></indexCarousel>
    <div class="recommend">
      <Row type="flex" :gutter="1" align="middle" justify="center">
        <Col :sm="24 / city.length" :xs="24"  v-for="list in city" :key="list.img">
          <div class="item" @click="$router.push(`/detail/${list._id}`)">
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
    <index-list :list="mancap"></index-list>
    <index-advertising></index-advertising>
    <div class="areaTitle">
      <p>女士专场</p>
      <p>春 & 夏 2 0 1 8 典 藏"</p>
    </div>
    <index-list :list="womencap"></index-list>
  </div>
</template>

<script>
//引入组件文件(components)
import indexCarousel from "@/components/index-carousel";
import indexList from "@/components/index-list";
import indexAdvertising from "@/components/index-advertising";

//api
import { heightBanner, getcap, getNewproduct } from "@/api/index.js";

export default {
  data() {
    return {
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
    indexCarousel,
    indexList,
    indexAdvertising
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
#index {
  * {
    transition: all .2s;
  }
  .recommend {
    width: 90%;
    max-width: 1200px;
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
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: .3rem;
          height: .9rem;
          color: #333;
          line-height: 1.5;
        }
        .price {
          font-size: .3rem;
          font-weight: bold;
          color: #666;
        }
      }
      @media screen and (max-width: 500px) {
        padding: 10px;
        .imgArea {
          width: 30%;
        }
        & > div {
          width: 62%;
        }
      }
    }
  }
  .areaTitle {
    width: 100%;
    text-align: center;
    p {
      &:first-child {
        font-size: .35rem;
        color: #000;
      }
      &:last-child {
        font-size: .25rem;
        color: #333;
      }
    }
  }
}
</style>
