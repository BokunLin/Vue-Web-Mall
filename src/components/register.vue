
<template>
  <div class="body">
    <section class="logo">
      <ul>
        <li class="logo-img"></li>
      </ul>
    </section>
    <Form :model="formLeft" :label-width="0" class="input" :rules="ruleInline">
      <FormItem prop="name">
        <Input v-model="formLeft.name" class="inpt" placeholder="请输入您的用户名"></Input>
      </FormItem>
      <FormItem prop="user">
        <Input v-model="formLeft.nick" class="inpt" placeholder="请输入您的昵称"></Input>
      </FormItem>
      <FormItem prop="pw">
        <Input type="password" v-model="formLeft.pw" class="inpt" placeholder="请输入您的密码"></Input>
      </FormItem>
    </Form>
    <div class="submit">
      <input type="submit" value="注册" class="inp" @click="reg">
      <p class="tips">已经是会员啦？
        <i-button type="text" @click.stop="$emit('update:state', 'join')">立即登录</i-button>
      </p>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/index.js";
export default {
  data() {
    return {
      formLeft: {
        name: "",
        nick: "",
        pw: "",
      },
      ruleInline: {
        name: [{ required: true, message: "请输入您的用户名", trigger: "blur" }],
        nick: [{ required: true, message: "请输入您的昵称", trigger: "blur" }],
        pw: [{ required: true, message: "请输入您的密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    reg() {
      register(this.formLeft).then(res => {
        this.$Message.success(res.msg);
      }).catch(err => {
        this.$Message.error(err.msg);
      })
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
.body {
  width: 500px;
  height: 500px;
  background-color: #fff;
  margin: 0 auto;
}
.logo {
  margin-top: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: "微软雅黑";
  font-size: 16px;
}
.logo-img {
  background: url("/static/images/logo.jpg") no-repeat;
  -webkit-background-size: contain;
  background-size: contain;
  width: 150px;
  height: 80px;
}
.input {
  height: 200px;
  width: 80%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
}
.inpt {
  margin-top: 30px;
}
.from {
  width: 100%;
  height: 30px;
}
.sex {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.sex div {
  width: 45%;
  height: 30px;
  line-height: 25px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.statement {
  text-align: center;
  margin-top: 20px;
}
a {
  font-family: 微软雅黑;
  font-size: 12px;
  color: black;
  text-decoration: underline;
  font-weight: bold;
}
.submit {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.inp {
  margin-top: 35px;
  width: 80%;
  height: 35px;
  color: white;
  font-family: 微软雅黑;
  font-size: 18px;
  background-color: black;
  border: 1px solid #ccc;
}
.active {
  border: 2px solid rgb(125, 167, 235) !important;
}
.tips {
  margin-top: 20px;
}
</style>