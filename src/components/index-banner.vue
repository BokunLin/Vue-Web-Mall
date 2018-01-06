<template>
  <div>
     <Carousel autoplay v-model="value2" loop :auto-speed="2500" :radius-dot="true">
        <CarouselItem v-for = "item in mylist" :key="item.banner"  class="container">
            <div class="demo-carousel">
              <img :src="item.banner">
            </div>
        </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export  default{
    data(){
      return{
        value2:0
      }
    },
    props:[
      'mylist'
    ],


}
</script>

<style scoped>
  .container div{
    width: 100%;
    height: 800px;
  }
  .container div img{
    width: 100%;
    height: 100%;
  }
 
</style>