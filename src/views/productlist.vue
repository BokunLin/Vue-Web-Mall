`<template>
  <div class="html">
    <top></top>
    <navgation></navgation>
    <section class="body">
      <div class="control">
        <p>共<span class="red">{{total}}</span>件相关产品</p>
      </div>
      <div class="product">
        <Row :gutter="20" type="flex" style="text-align: center;">
          <Col class="col" :span="6" v-for="item in record" :key="item._id">
          <div style="cursor: pointer;" @click="$router.push(`/index/detail/${item._id}`)">
            <img :src="item.imgs[0]">
            <h5 style="padding: 0 20px;height: 40px; overflow: hidden;">{{item.name}}</h5>
            <span style="font-weight: bold;font-size: 16px;">{{item.price | formatPrice}}</span>
          </div>
          </Col>
        </Row>
      </div>
      <Page :total="total" @on-change="initData" class="page"></Page>
    </section>
    <div class="top">
      <ul>
        <li>
          <span class="arrow-up"></span>
          <BackTop class="back">返回顶部</BackTop>
        </li>
      </ul>
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
      product.style = prod.style;
      product.sort = prod.sort;

      this.$store.commit("addcart", product);
    }
  }
};
</script>

<style scoped>
.html {
  background-color: #fafafa;
}
.body {
  background-color: #fff;
  width: 90%;
  margin: 10px auto;
}
.control p {
  font-size: 16px;
  padding: 10px 15px;
  border-bottom: 1px solid #aaa;
}
.col {
  padding: 30px 0;
  overflow: hidden;
}
.col img {
  width: 80%;
  height: 256px;
}
</style>