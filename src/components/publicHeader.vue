<template>
  <header>
    <nav>
      <Row type="flex">
        <Col class="logo" :lg="{ span: 6, order: 0 }" :sm="{ order: 0, span: 4 }" :xs="{ order: 1, span: 12,}">
          <img @click="$router.push('/index')" src="/static/images/logo.png" style="cursor: pointer;">
        </Col>
        <Col class="col" :lg="{ span: 10, order: 1, push: 4 }" :sm="{ order: 1, span: 15, push: 1 }" :xs="{ order: 0, span: 6}">
          <Button class="showXS" type="text" @click="isShowNav = !isShowNav"><Icon size="40" type="navicon"></Icon></Button>
          <div class="navList">
            <ul mode="horizontal" :class="{ 'showNav': isShowNav }">
              <li @click="jumpPage('index')" :class="['navItem hideXS', {'active': active === 'index'}]">首页</li>
              <li @click="jumpPage('childs')" :class="['navItem', {'active': active === 'childs'}]">儿童帽</li>
              <li @click="jumpPage('men')" :class="['navItem', {'active': active === 'men'}]">男士帽</li>
              <li @click="jumpPage('women')" :class="['navItem', {'active': active === 'women'}]">女士帽</li>
            </ul>
          </div>
        </Col>
        <Col class="login" :lg="{ span: 4, order: 2, push: 4 }" :sm="{ order: 2, span: 5, push: 0 }" :xs="{ order: 2, span: 6}">
          <template v-if="!nick">
            <i-button type="text" size="small" @click="login(1)">登录</i-button>
            <i-button type="text" size="small" @click="login(0)" class="hideXS">注册</i-button>
          </template>
          <template v-else>
            <Dropdown placement="bottom-end" trigger="click">
              <i-button type="text">
                {{nick}}&nbsp;
                <Icon type="arrow-down-b"></Icon>
              </i-button>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="showOrder">我的订单</DropdownItem>
                <DropdownItem @click.native="$router.push('/address')">收货地址</DropdownItem>
                <DropdownItem @click.native="$router.push('/cart')">购物车</DropdownItem>
                <DropdownItem @click.native="loginOut">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
          <span class="car hiddeXS">
            <Icon type="ios-cart" @click.native="goCar" size="22" style="cursor: pointer;"></Icon>
          </span>
        </Col>
      </Row>
    </nav>
    <div class="mask" :class="{ 'showMask': isShowNav }" @touchstart="isShowNav = false" @click="isShowNav = false"></div>
    <Modal @keyup.enter.native="sub" class-name="loginModal" v-model="$store.state.isLogin" @on-cancel="$store.state.isLogin = false">
      <span slot="header"> </span>
      <span slot="footer"></span>
      <div>
        <div class="center">
          <img src="http://kunine.oss-cn-shenzhen.aliyuncs.com/CapMall/282549895715789092.png" alt="1995">
        </div>
        <Form ref="form" :model="formData" :rules="rule" class="form">
          <FormItem prop="nick" v-if="!isLogin">
            <i-input size="large" v-model="formData.nick" placeholder="请输入你的昵称"></i-input>
          </FormItem>
          <FormItem prop="name">
            <i-input size="large" v-model="formData.name" placeholder="请输入你的用户名"></i-input>
          </FormItem>
          <FormItem prop="pw">
            <i-input size="large" type="password" v-model="formData.pw" placeholder="请输入你的密码"></i-input>
          </FormItem>
          <FormItem class="sub">
            <Button class="login" v-text="isLogin ? '登录' : '注册'" long size="large" @click="sub"></Button>
            <p class="signupP" v-if="isLogin">还不是会员?
              <Button type="text" @click="isLogin = false">立即加入</Button>
            </p>
            <p class="signupP" v-else>已有账号?
              <Button type="text" @click="isLogin = true">立即登录</Button>
            </p>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </header>
</template>

<script>
import { login, signup, loginOut } from "@/api/index";
export default {
  data() {
    return {
      isShowNav: true,
      nick: sessionStorage.name,
      isLogin: true,
      visible: true,
      formData: {
        nick: "",
        name: "",
        pw: ""
      },
      rule: {
        nick: { required: true, message: "请输入昵称", trigger: "blur" },
        name: { required: true, message: "请输入用户名", trigger: "blur" },
        pw: { required: true, message: "请输入密码", trigger: "blur" }
      },
      active: "index"
    };
  },
  methods: {
    goCar() {
      if (!sessionStorage.name) {
        this.$Message.error("请先登录");
        this.$store.dispatch("changeLogin", true);
      } else {
        this.$router.push("/cart");
      }
    },
    jumpPage(name) {
      this.isShowNav = false;
      this.active = name;
      this.$router.push("/" + name);
    },
    login(e) {
      this.isLogin = e;
      this.$store.state.isLogin = true;
    },
    showOrder() {
      if (!sessionStorage.name) {
        this.$sotre.dispatch("changeLogin", true);
      } else {
        this.$router.push("/order");
      }
    },
    loginOut() {
      loginOut().then(res => {
        sessionStorage.clear();
        this.nick = "";
      });
    },
    sub() {
      const _this = this;
      const callback = (fn, ...rest) =>
        fn(...rest)
          .then(res => {
            _this.$Message.success(res.msg);
            _this.nick = sessionStorage.name = res.data.nick;
            _this.$store.state.isLogin = false;
            location.reload();
          })
          .catch(err => {
            _this.$Message.error(err.msg);
          });
      this.$refs.form.validate(vaild => {
        if (vaild) {
          this.isLogin
            ? callback(login, this.formData)
            : callback(signup, this.formData);
        } else {
          this.$Message.error("请完整填写信息");
        }
      });
    }
  },
  created() {
    this.active = this.$route.name;
    this.isShowNav = window.innerWidth > 768 ? true : false;
  }
};
</script>

<style lang='scss'>
header {
  * {
    transition: all .2s;
  }
  position: relative;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  .right {
    text-align: right;
  }
  nav {
    position: relative;
    background-color: #fff;
    z-index: 2;
    width: 1200px;
    height: 80px;
    margin: 0px auto;
    padding: 10px;
    .ivu-row-flex {
      height: 60px;
      .logo {
        text-align: left;
        height: 46px;
        margin-top: 7px;
        img {
          height: 100%;
        }
      }
      .navList {
        height: 60px;
        li {
          line-height: 40px;
          padding: 0px 20px;
          cursor: pointer;
          margin: 10px 10px;
          font-size: 16px;
          float: left;
          color: #333;
        }
        li:hover,
        .active {
          border-bottom: 2px solid #333;
        }
      }
      .login {
        line-height: 62px;
        text-align: right;
        .ivu-btn-text {
          vertical-align: super;
        }
        .car {
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
    .showXS {
      display: none;
    }
    @media screen and (max-width: 1200px) {
      width: 100%;
      padding: 10px 30px;
    }
    @media screen and (max-width: 767px) {
      padding: 5px;
      height: 60px;
      .ivu-row-flex {
        height: 50px;
        .navList {
          ul {
            display: none;
            background-color: #fff;
            position: fixed;
            padding: 5px 0;
            left: 0px;
            right: 0px;
            opacity: 0;
            margin-top: -5px;
            z-index: 2;
            text-align: center;
            transform: translateY(-10px);
            box-shadow: 0px 2px 2px #888;
            li {
              width: 33%;
              color: #888;
              margin: 0;
              &:hover {
                border: 0;
              }
            }
            .active {
              border: 0;
              color: #222;
            }
          }
          .showNav {
            display: block;
            opacity: 1;
            transform: translateY(0px);
          }
        }
        .login {
          span {
            line-height: 44px;
            font-size: 14px;
          }
          .car {
            display: none;
          }
        }
        .logo {
          height: auto;
          text-align: center;
          img {
            height: 80%;
          }
        }
        .hideXS {
          display: none;
        }
        .showXS {
          display: inline-block;
        }
      }
    }
  }
  .mask {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: #000;
    opacity: .2;
    z-index: 1;
    display: none;
    transition: opacity .2s ease-out;
  }
  @media screen and (max-width: 767px){
    .showMask {
      display: block;
    }
  }
}
.loginModal {
  .center {
    text-align: center;
    margin: 0px 0 60px;
    img {
      width: 50%;
    }
  }
  .form {
    max-width: 400px;
    margin: 0 auto;
  }
  .sub {
    margin-top: 50px;
  }
  .login {
    background-color: #000;
    color: #eee;
    border-radius: 0;
    padding: 10px 0;
    &:hover {
      background-color: #111;
      color: #fff;
    }
  }
  .signupP {
    text-align: center;
  }
  .ivu-modal-header,
  .ivu-modal-footer {
    display: none;
  }
  .ivu-modal-content {
    padding: 45px 0;
  }
  .ivu-input {
    border-radius: 0;
    font-size: 16px;
  }
  @media screen and (max-width: 767px){
    .ivu-modal {
      top: 50px;
    }
  }
}
</style>

