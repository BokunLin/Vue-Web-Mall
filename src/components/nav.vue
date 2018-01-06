<template>
  <div>
    <section class="nav">
      <Row type="flex" class="row">
        <Col :span="6">
        <img @click="$router.push('/index')" :src="setting.img" class="logo" style="cursor: pointer;">
        </Col>
        <Col push="4" class="col" :span="9">
        <ul class="navList" mode="horizontal">
          <li @click="jumpPage('index')" :class="['navItem', {'active': active === 'index'}]">首页</li>
          <li @click="jumpPage('childs')" :class="['navItem', {'active': active === 'childs'}]">儿童帽</li>
          <li @click="jumpPage('men')" :class="['navItem', {'active': active === 'men'}]">男士帽</li>
          <li @click="jumpPage('women')" :class="['navItem', {'active': active === 'women'}]">女士帽</li>
        </ul>
        </Col>
        <Col push="8" :span="1" class="car">
          <Icon type="ios-cart" @click.native="goCar"></Icon>
        </Col>
      </Row>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "index",
      setting: {
        img: "/static/images/logo.png",
        index: "首页",
        childs: "儿童帽",
        men: "男士帽",
        women: "女士帽",
        search: "/static/images/search.png",
        cart: "/static/images/cart.png"
      }
    };
  },
  created() {
    this.active = this.$route.name;
  },
  methods: {
    goCar() {
      if (!sessionStorage.name) {
        this.$Message.error("请先登录");
        this.$store.dispatch("changeLogin", true);
      } else {
        this.$router.push("/cart");
      }
    },
    jumpPage(name) {
      this.active = name;
      this.$router.push("/" + name);
    }
  }
};
</script>

<style scoped>
.nav {
  background-color: #fff;
}
.row {
  width: 1200px;
  margin: 0 auto;
  padding: 10px 0;
  height: 80px;
  overflow: hidden;
}
.navList {
  height: 60px;
}
.navList li {
  line-height: 40px;
  padding: 0px 20px;
  cursor: pointer;
  margin: 10px 10px;
  font-size: 16px;
  transition: all 0.2s;
  float: left;
  color: #333;
}
.navList li:hover,
.navList .active {
  border-bottom: 2px solid #333;
}
.car {
  line-height: 60px;
  font-size: 20px;
  cursor: pointer;
  float: right;
  margin-left: 10px;
}
.logo {
  width: auto;
  height: 40px;
}
</style>