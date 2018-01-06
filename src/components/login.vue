<template>
  <div class="body">
    <section class="login">
      <section class="logo">
        <ul>
          <li class="logo-img"></li>
        </ul>
      </section>
      <section class="input">
        <Form :model="formLeft" :label-width="0" class="input" :rules="ruleInline">
          <FormItem prop="name">
            <Input v-model="formLeft.name" class="inpt" placeholder="请输入您的邮箱"></Input>
          </FormItem>
          <FormItem prop="pw">
            <Input type="password" v-model="formLeft.pw" class="inpt" placeholder="请输入您的密码"></Input>
          </FormItem>
        </Form>
      </section>
      <section class="Choice">
        <p class="submit-button"><input type="submit" class="submit" value="登录" @click="submit"></p>
        <section class="register">
          <p class="text">还不是会员？</p>
          <i-button type="text" @click="$emit('update:state', 'reg')">立即加入</i-button>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
import { login } from "@/api/index.js";
export default {
  data() {
    return {
      mesg: "1995随时为你服务",
      formLeft: {
        name: "",
        password: ""
      },
      ruleInline: {
        name: [{ required: true, message: "请输入您的账号!", trigger: "blur" }],
        password: [{ required: true, message: "请输入您的密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit() {
      login(this.formLeft).then(res => {
        this.$Message.success(res.msg);
      }).catch(err => {
        this.$Message.error(err.msg);
      });
    }
  },
  props: ["state"]
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.error,
.sceen {
  display: block !important;
  color: red;
  width: 80%;
  font-family: 微软雅黑;
  font-size: 16px;
}
.body {
  width: 100%;
  height: 100%;
  /*padding: 5%;*/
}
.login {
  width: 500px;
  height: 500px;
  margin: 0 auto;
  padding-top: 1%;
  background-color: #fff;
}
.logo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  margin-top: 50px;
}
.logo ul {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.logo ul li {
  font-size: 18px;
  font-family: "微软雅黑";
  margin-bottom: 10px;
}
.logo-img {
  background: url("/static/images/logo.jpg") no-repeat;
  -webkit-background-size: contain;
  background-size: contain;
  width: 150px;
  height: 80px;
}
/*登陆input*/
.input {
  width: 80%;
  height: 110px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.inpt {
  width: 350px !important;
  margin-top: 20px;
}
.choice-ul {
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.statement {
  width: 70%;
  font-size: 13px;
  font-family: 微软雅黑;
  color: grey;
  margin: 0 auto;
  margin-top: 30px;
  text-align: center;
  margin-bottom: 20px;
}
.statement a {
  color: grey;
  text-decoration: underline;
  font-weight: bold;
}
.submit {
  width: 350px;
  height: 100%;
  background-color: black;
  border: none;
  color: white;
  font-size: 18px;
}
.submit-button {
  margin-top: 40px;
  width: 100%;
  height: 40px;
  text-align: center;
}
.register {
  width: 28%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 5% auto;
  text-align: center;
  font-size: 12px;
}
.register-link {
  color: black;
  font-size: 13px;
  text-decoration: underline;
}
</style>