<template>
  <div class="container">
    <Row type="flex" justify="center" :gutter="20">
        <Col>
          <ul class="left-section">
            <li v-for = "(item, index) in series" :key="index">
              <img :src="item.img">
              <div class="mes">
                <p class="title">{{item.title}}</p>
                <p class="descript">{{item.descript}}</p>
              </div>
            </li>
          </ul>
        </Col>
        <Col class-name="middle">
          <img src="/static/images/center-adver.png">
        </Col>
        <Col>
          <ul class="left-section">
            <li v-for = "(item, index) in series" :key="index">
              <img :src="item.img">
              <div class="mes">
                <p class="title">{{item.title}}</p>
                <p class="descript">{{item.descript}}</p>
              </div>
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
        series:[
          {
            img:"/static/images/1.png",
            title:"运动系列",
            descript:"永远保持真我"
          },
           {
            img:"/static/images/1.png",
            title:"运动系列",
            descript:"永远保持真我"
          }
        ]
      }
    }
  } 
</script>

<style scoped>
  .container {
    overflow: hidden;
  }
  .left-seciton{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .left-section li{
    width: 350px;
    height: 300px;
    position: relative;
    margin-bottom: 20px;

  } 
  .left-section li img{
    width: 100%;
    height: 100%;
  }
  .mes{
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
  .middle {
    width: 389px;
    height: 620px;
  }
  .middle img {
    width: 100%;
    height: 100%;
  }
</style>