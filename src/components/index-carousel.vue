<template>
  <div class="banner">
     <Carousel autoplay v-model="active" :auto-speed="3000" arrow="always">
        <CarouselItem v-for="item in mylist" :key="item.banner" style="cursor: pointer;" @click.native="$router.push('/detail/' + item._id)">
            <div class="bannerBlock">
              <img :src="item.banner" class="bannerImg">
            </div>
        </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export  default{
    data(){
      return{
        active:0
      }
    },
    props:[
      'mylist'
    ]
}
</script>

<style lang="scss">
.banner {
  .bannerBlock {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
