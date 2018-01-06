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
  #app{
    min-width: 1200px;
  }
  input {
    outline: none;
  }
</style>
