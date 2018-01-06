<template>
  <div>
    <section class="nav">
      <ul>
        <li class="logo" @click="$router.push('/index')"><img :src="setting.img"></li>
        <li class="hover">
          <router-link to="/index" tag="a">{{setting.index}}</router-link>
        </li>
        <li class="hover">
          <router-link to="/list/childs" tag="a">{{setting.childs}}</router-link>
        </li>
        <li class="hover">
          <router-link to="/list/men" tag="a">{{setting.men}}</router-link>
        </li>
        <li class="hover">
          <router-link to="/list/women" tag="a">{{setting.women}}</router-link>
        </li>
        <li class="icon">
          <div class="cart"><img :src="setting.cart" alt="" @click="goCar"></div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default{
  data() {
    return{
       setting:{
        img   :"/static/images/title.png",
        index :"首页",
        childs:"儿童帽",
        men   :"男士帽",
        women :"女士帽",
        search:"/static/images/search.png",
        cart  :"/static/images/cart.png"
       }
    }
  },
  methods: {
    goCar() {
      if (!sessionStorage.name) {
        this.$Message.error('请先登录');
        this.$store.dispatch('changeLogin', true);
      } else {
        this.$router.push('/cart')
      }
    }
  }
}
</script>

<style scoped>
.nav {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #aaa;
}
.nav ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.nav ul li {
  /*height: 50%;*/
  flex-grow: 0.05;
  text-align: center;
  font-family: "微软雅黑";
  font-size: 17px;
  color: black;
  border-bottom: 2px solid transparent;
  /*padding-bottom: 10px;*/
  cursor: pointer;
}
.logo {
  flex-grow: 0.4 !important;
}
.icon {
  flex-grow: 0.3 !important;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.arrow {
  background: url(/static/images/detail-arrow.png) no-repeat;
  -webkit-background-size: contain;
  background-size: contain;
  width: 15px;
  height: 15px;
  display: block;
}
a {
  color: black;
}
.hover:hover {
  border-bottom: 2px solid black;
}
.hover a {
  width: 100%;
  height: 100%;
}
.search {
  flex-grow: 0.1;
}
</style>