`<template>
  <div>
    <top></top>
    <navgation></navgation>
    <div class="list">
      <p>共<span>{{total}}</span>件相关产品</p>
      <Row :gutter="20" type="flex">
        <Col :span="6" v-for="item in record" :key="item._id">
          <div class="item" @click="$router.push(`/index/detail/${item._id}`)">
            <span class="imgArea">
              <img :src="item.imgs[0]">
            </span>
            <h5>{{item.name}}</h5>
            <p>{{item.price | formatPrice}}</p>
          </div>
        </Col>
      </Row>
      <Page class-name="page" :total="total" :page-size="16" @on-change="initData"></Page>
      <div>
        <span class="arrow-up"></span>
        <BackTop class="back">返回顶部</BackTop>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import top from "@/components/top";
import bottom from "@/components/footer";
import navgation from "@/components/nav";
import banner from "@/components/index-banner";

import { getListByTag } from "@/api/index";

export default {
  data() {
    return {
      total: 1,
      record: [],
      sort: "综合排序",
      banner: [],
      top: "返回顶部",
      scrollTop: null,
      timer: null
    };
  },
  filters: {
    formatPrice(val) {
      return `￥${(val / 100).toFixed(2)}`;
    }
  },
  components: {
    top,
    bottom,
    navgation,
    banner
  },
  watch: {
    $route(val) {
      this.initData();
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData(page = 1) {
      let tags = "男士帽";
      switch (this.$route.name) {
        case "women":
          tags = "女士帽";
          break;
        case "childs":
          tags = "儿童帽";
          break;
      }
      getListByTag({ tags, page }).then(response => {
        this.total = response.count;
        this.record = response.data;
      });
    },
    skip(prod) {
      let product = {};

      product.imgs = prod.imgs;
      product.title = prod.title;
      product.descript = prod.descript;
      product.price = prod.price;
      product.sort = prod.sort;

      this.$store.commit("addcart", product);
    }
  }
};
</script>

<style lang='scss'>
.list {
  background-color: #fff;
  padding: 20px;
  overflow: hidden;
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  &>P {
    width: 100%;
    text-align: left;
  }
  .item {
    display: flex;
    cursor: pointer;
    flex-wrap: wrap;
    align-items: center;
    p {
      width: 100%;
      text-align: center;
      font-size: 14px;
    }
    h5 {
      font-size: 14px;
      height: 45px;
      overflow: hidden;
    }
    .imgArea {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      min-height: 275px;
      img {
        width: 100%;
      }
    }
  }
  .page {
    color: #222;
    margin: 20px 0 10px;
    .ivu-page-item, li {
      border: none;
      font-weight: bolder;
      font-size: 14px;
      a {
        transition: color .2s;
        color: #aaa;
      }
      &:hover {
        a {
          color: #222;
        }
      }
    }
    .ivu-page-item-active {
      background-color: #fff;
      a {
        color: #222;
      }
    }
  }
}
</style>