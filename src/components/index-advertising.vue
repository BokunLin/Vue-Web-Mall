<template>
  <div class="advertising">
    <div class="item">
      <div v-for="(item, index) in groudone" :key="index"  @click="$router.push('/men')">
        <span>
          <img :src="item.img">
          <div class="map">
            <div class="info">
              <p>{{item.title}}</p>
              <p>{{item.descript}}</p>
            </div>
          </div>
        </span>
      </div>
    </div>
    <div class="mainAd" @click="$router.push('/men')">
      <img src="/static/images/center-adver.png">
    </div>
    <div class="item">
      <div v-for="(item, index) in groudtwo" :key="index"  @click="$router.push('/men')">
        <span>
          <img :src="item.img">
          <div class="map">
            <div class="info">
              <p>{{item.title}}</p>
              <p>{{item.descript}}</p>
            </div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groudone: [
        {
          img: "/static/images/9.jpg",
          title: "EK 系列",
          descript: "EK series"
        },
        {
          img: "/static/images/6.jpg",
          title: "假日系列",
          descript: "Holiday series"
        }
      ],
      groudtwo: [
        {
          img: "/static/images/5.jpg",
          title: "城市系列",
          descript: "city series"
        },
        {
          img: "/static/images/7.jpg",
          title: "娱乐系列",
          descript: "Entertainment"
        }
      ],
      istrue: ""
    };
  }
};
</script>

<style lang="scss">
.advertising {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  padding: 0 30px;
  height: 42vw;
  overflow: hidden;
  .mainAd {
    flex-grow: 0;
    flex-shrink: 0;
    height: 100%;
    cursor: pointer;
    margin: 0 20px;
    img {
      height: 100%;
    }
  }
  .item {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-wrap: wrap;
    align-content: space-between;
    & > div {
      width: 100%;
      height: 48%;
      text-align: center;
      img {
        height: 100%;
      }
      & > span {
        cursor: pointer;
        &:hover {
          .map {
            opacity: 1;
          }
        }
        display: inline-block;
        position: relative;
        height: 100%;
        .map {
          position: absolute;
          transition: opacity .5s ease-out;
          opacity: 0;
          background-color: rgba(0,0,0,.5);
          z-index: 1;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          .info {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            p {
              color: #eee;
              font-size: .35rem;
            }
          }
        }
        @media screen and (max-width: 1025px){
          .map {
            opacity: 1;
            .info {
              p {
                font-size: .1rem;
              }
            }
          }          
        }
      }
    }
  }
}
</style>

