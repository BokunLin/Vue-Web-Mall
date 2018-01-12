<template>
  <div id="app">
    <transition name="fade" >
      <router-view></router-view>
    </transition> 
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style >
body {
  background-color: #f8f8f8;
}
#app{
  width: 100%;
  min-width: 1200px;
  font-family: '微软雅黑';
  overflow: hidden;
}
input {
  outline: none;
}
.ivu-carousel-arrow.right {
  text-align: center;
}
</style>
