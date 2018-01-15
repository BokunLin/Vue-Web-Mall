<template>
  <div id="app">
    <public-header ref="nav"></public-header>
    <div id="container" :style="{'min-height': `${minHeight}px`}">
      <router-view></router-view>
    </div>
    <public-footer ref="footer"></public-footer>
  </div>
</template>

<script>
import publicHeader from "@/components/publicHeader";
import publicFooter from "@/components/publicFooter";
export default {
  name: "app",
  data() {
    return {
      minHeight: 100
    }
  },
  components: {
    publicHeader,
    publicFooter
  },
  created() {
    window.onresize = () => {
      var ele = document.getElementsByTagName("html")[0],
        size = document.body.clientWidth / 320 * 20;
      ele.style.fontSize = Math.max(54, size) + "px";
    }
  },
  mounted() {
    this.minHeight = window.innerHeight - this.$refs.footer.$el.clientHeight - this.$refs.nav.$el.clientHeight;
  }
};
</script>

<style lang="scss">
html {
  font-size: 54px;
  body {
    background-color: #f8f8f8;
    input {
      outline: none;
    }
    .ivu-carousel-arrow.right {
      text-align: center;
    }
    #app {
      width: 100%;
      height: 100%;
      min-width: 375px;
      font-family: "微软雅黑";
      overflow: hidden;
      position: relative;
    }
  }
}
</style>
