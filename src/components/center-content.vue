<template>
  <div class="container">
    <Row type="flex" justify="center" :gutter="20">
        <Col :span="6">
          <ul class="left-section">
            <li v-for = "(item, index) in groudone" :key="index">
              <img :src="item.img">
              <div class="mes" style="display:none">
                <p>{{item.title}}</p>
                <p>{{item.descript}}</p>
              </div>
              <div class="mask" style="display:none"></div>
            </li>
          </ul>
        </Col>
        <Col class-name="middle">
          <img src="/static/images/center-adver.png">
        </Col>
        <Col :span="6">
          <ul class="left-section">
            <li v-for = "(item, index) in groudtwo" :key="index">
              <img :src="item.img">
              <div class="mes" style="display:none">
                <p>{{item.title}}</p>
                <p>{{item.descript}}</p>
              </div>
              <div class="mask" style="display:none"></div>
            </li>
          </ul>
        </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        groudone:[
          {
            img:"/static/images/9.jpg",
            title:"EK 系列",
            descript:"EK series"
          },
           {
            img:"/static/images/6.jpg",
            title:"假日系列",
            descript:"Holiday series"
          }
        ],
        groudtwo:[
          {
            img:'/static/images/5.jpg',
            title:'城市系列',
            descript:'city series'
          },
          {
            img:'/static/images/7.jpg',
            title:"娱乐系列",
            descript:"Entertainment"
          }
        ],
        istrue:''
      }
    },
    methods:{
      leftEnter(){
        this.istrue = 'left'; 
      },
      rightEnter(){
        this.istrue = 'right';
      }
    }
  } 
</script>

<style scoped>
  .container {
    overflow: hidden;
    width: 1200px;
    margin: 0 auto;
  }
  *{
    padding: 0;
    margin:0;
  }
  .left-seciton{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .left-section li{
    position: relative;
    margin-bottom: 34px;
    height: 283px;
  } 
   .left-section li:hover .mes{
    display: block !important;
    width: 100%;
    height: 50px;
    margin:auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom:0;
    right:0;
    text-align: center;
    color: white;
    font-family: 微软雅黑;
    font-size: 18px;
    font-weight: bold;
  }
  .left-section li:hover .mask{
    width: 100%;
    height: 100%;
    position: absolute;
    display: block !important;
    top: 0;
    left: 0;
    background-color:rgba(120,120,120,.4);
  }
  .left-section li img{
    width: 100%;
    height: 100%;
  }
  .middle {
    height: 600px;
  }
  .middle img {
    height: 100%;
  }
</style>