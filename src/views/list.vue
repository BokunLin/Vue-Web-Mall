`<template>
  <div class="list" :style="{ 'min-height': `${minHeight}px` }">
    <p>共<span>{{total}}</span>件相关产品</p>
    <Row :gutter="20" type="flex">
      <Col :sm="6" :xs="12" v-for="item in record" :key="item._id">
        <div v-scroll-reveal="{origin: 'right', duration: 800, scale: 1}" class="item" @click="$router.push(`/detail/${item._id}`)">
          <span class="imgArea">
            <img :src="item.imgs[0]">
          </span>
          <h5>{{item.name}}</h5>
          <p>{{item.price | formatPrice}}</p>
        </div>
      </Col>
    </Row>
    <Page class-name="page" :total="total" :page-size="16" @on-change="initData"></Page>
  </div>
</template>

<script>
import { getListByTag } from "@/api/index";
export default {
  data() {
    return {
      total: 1,
      record: [],
      timer: null,
      minHeight: 100
    };
  },
  filters: {
    formatPrice(val) {
      return `￥${(val / 100).toFixed(2)}`;
    }
  },
  watch: {
    $route(val) {
      this.initData();
      this.total = 1;
    }
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
  },
  created() {
    this.initData();
  },
  mounted() {
    this.minHeight = document.getElementById('container').offsetHeight;
  }
};
</script>

<style lang='scss'>
.list {
  flex: 1 0 0;
  background-color: #fff;
  padding: 20px;
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  &>P {
    width: 100%;
    text-align: left;
  }
  &>.ivu-row-flex {
    .item {
      display: flex;
      cursor: pointer;
      flex-wrap: wrap;
      align-items: center;
      p {
        width: 100%;
        text-align: center;
        font-size: .2rem;
      }
      h5 {
        font-size: .2rem;
        height: .6rem;
        overflow: hidden;
      }
      .imgArea {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        img {
          width: 100%;
        }
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