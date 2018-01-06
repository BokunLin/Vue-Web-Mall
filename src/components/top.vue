<template>
	<div class="top">
		<Row justify="center">
			<Col span="8">欢迎来到1995,开始你的购物之旅把！</Col>
			<Col span="8" offset="8" class="right">
			<template v-if="!nick">
				<i-button type="text" size="small" @click="login(1)">登录</i-button>
				<i-button type="text" size="small" @click="login(0)">注册</i-button>
			</template>
			<template v-else>
				<Dropdown placement="bottom-end">
					<i-button type="text">
						{{nick}}&nbsp;
						<Icon type="arrow-down-b"></Icon>
					</i-button>
					<DropdownMenu slot="list">
						<DropdownItem @click.native="showOrder">我的订单</DropdownItem>
						<DropdownItem @click.native="loginOut">退出登录</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</template>
			</Col>
		</Row>
		<Modal v-model="$store.state.isLogin" class="loginModal" @on-cancel="$store.state.isLogin = false">
			<span slot="header"> </span>
			<span slot="footer"></span>
			<div class="center">
				<img src="http://kunine.oss-cn-shenzhen.aliyuncs.com/CapMall/282549895715789092.png" alt="1995" class="logo">
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
		</Modal>
	</div>
</template>
<script>
import { login, signup, loginOut } from '@/api/index'
export default {
	data() {
		return {
			nick: sessionStorage.name,
			isLogin: true,
			visible: true,
			formData: {
				nick: '',
				name: '',
				pw: ''
			},
			rule: {
				nick: { required: true, message: '请输入昵称', trigger: 'blur' },
				name: { required: true, message: '请输入用户名', trigger: 'blur' },
				pw: { required: true, message: '请输入密码', trigger: 'blur' }
			}
		}
	},
	methods: {
		login(e) {
			this.isLogin = e;
			this.$store.state.isLogin = true;
		},
		showOrder() {
			if (!sessionStorage.name) {
				this.$sotre.dispatch('changeLogin', true);
			} else {
				$router.push('/order')
			}
		},
		loginOut() {
			loginOut().then(res => {
				sessionStorage.clear();
				this.nick = '';
			})
		},
		sub() {
			const _this =this;
			const callback = (fn, ...rest) => fn(...rest).then(res => {
				_this.$Message.success(res.msg);
				_this.nick = sessionStorage.name = res.data.name;
				_this.$store.state.isLogin = false;
			}).catch(err => {
				_this.$Message.error(err.msg);
			})
			this.$refs.form.validate(vaild => {
				if (vaild) {
					this.isLogin ? callback(login, this.formData) : callback(signup, this.formData);
				} else {
					this.$Message.error('请完整填写信息');
				}
			})
		}
	},
	created() {
	}
};
</script>

<style>
.top {
  width: 1200px;
  margin: 0 auto;
  line-height: 30px;
  height: 30px;
}
.right {
  text-align: right;
}
.center {
  text-align: center;
  margin: 0px 0 60px;
}
.logo {
  width: 30%;
}
.form {
  width: 400px;
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
}
.login:hover {
  background-color: #111;
  color: #fff;
}
.signupP {
  text-align: center;
}
.loginModal .ivu-modal-content {
  padding: 45px 0;
}
.loginModal .ivu-modal-header,
.loginModal .ivu-modal-footer {
  border: none;
}
.loginModal .ivu-input {
  border-radius: 0;
  font-size: 16px;
}
</style>
