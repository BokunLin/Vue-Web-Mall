<template>
  <div class="footer">
    <section class="contain">
      <div class="bottom-mes">
        <ul>
          <li class="left"><img src="/static/images/1995-footer.png"></li>
          <li class="center">
            <div class="eamilFollow">
              <Icon type="ios-email-outline" class="email"></Icon>
              <input type="text" name="email-inp" class="inp" placeholder="输入邮箱订阅...">
              <Icon type="arrow-right-c" class="arrow-right"></Icon>
            </div>
            <p class="version-mes">&copy; 2018|1995.designed with &hearts; by Wedyon</p>
          </li>
          <li class="right">
            <section class="top">
              <div v-for="list in icon" class="icon" :key='list.img'>
                <img :src="list.img">
              </div>
            </section>
            <section class="bottom">
              <div v-for="mine in logo" class="logo" :key="mine.img">
                <img :src="mine.img">
              </div>
            </section>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value2: 0,
      number: 3500,
      foot: [
        {
          img: "/static/images/footer-banner.jpg",
          alt: "this is a footer banner!"
        },
        {
          img: "/static/images/footer-banner.jpg",
          alt: "this is a footer banner!"
        },
        {
          img: "/static/images/footer-banner.jpg",
          alt: "this is a footer banner!"
        },
        {
          img: "/static/images/footer-banner.jpg",
          alt: "this is a footer banner!"
        }
      ],
      icon: [
        {
          img: "/static/images/icon-qq.png"
        },
        {
          img: "/static/images/icon-wechat.png"
        },
        {
          img: "/static/images/icon-weibo.png"
        },
        {
          img: "/static/images/facebook.png"
        }
      ],
      logo: [
        {
          img: "/static/images/icon-zhifubao.png"
        },
        {
          img: "/static/images/icon-wechatpay.png"
        },
        {
          img: "/static/images/icon-unionpay.png"
        }
      ]
    };
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.contain {
  width: 100%;
}
.content {
  width: 100%;
}
.content img {
  width: 100%;
}
.bottom-mes {
  background-color: rgb(34, 34, 34);
  height: 140px;
}
.bottom-mes ul {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
}
.bottom-mes ul li {
  width: 33.3%;
  height: 100%;
  border-left: 1px solid rgb(50, 50, 50);
}
.inp {
  height: 40px;
  width: 100%;
  font-size: 14px;
  color: #eee;
  border-radius: 20px;
  border: none;
  background-color: rgb(57, 57, 57);
  padding-left: 50px;
}
.left {
  clear: both;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.version-mes {
  position: absolute;
  bottom: 10px;
  font-size: 18px;
  color: rgb(76, 76, 76);
}
.top {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}
.bottom {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  border-top: 1px solid rgb(50, 50, 50);
}
.icon {
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}
.logo {
  width: 33.3%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}
.eamilFollow {
  width: 280px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  top: -20px;
}
.email {
  font-size: 28px !important;
  color: #747474;
  position: absolute;
  font-weight: bold;
  left: 20px;
  top: 45%;
  transform: translateY(-50%);
}
.arrow-right {
  color: #fff;
  position: absolute;
  right: 20px;
  top: 45%;
  font-size: 24px;
  transform: translateY(-50%);
}
</style>