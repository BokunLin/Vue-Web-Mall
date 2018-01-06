<template>
	<div class="app">
		<Top></Top>
			<section class="body">
					<header class="nav">
						<ul>
							<li class="nav-search"><img src="/static/images/search.png"></li>
							<li>{{nav.item1}}</li>
							<li>{{nav.item2}}</li>
							<li class="nav-logo"></li>
							<li>{{nav.item3}}<div class="detail-down"></div></li>
							<li>{{nav.item4}}<div class="detail-down"></div></li>
							<li class="cart"><img src="/static/images/cart.png" alt=""></li>
						</ul>
					</header>
					<banner	:mylist="banner"></banner>
					<section class="city-style">
						<ul>
							<li v-for="list in city" :key="list.city">
								<div class="city-content">
									<img :src="list.img">
									<div class="city-contain">
										<p class="product-title">{{list.title}}</p>
										<p class="product-des">{{list.descript}}</p>
									</div>
								</div>
							</li>
						</ul>
					</section>
					<section class="wealthe">
							<div class="headline">
								<p class="head-title">{{headtitle}}</p>
								<p class="head-like"> {{like}}</p>
							</div>
					</section>
					<cap-banner :list="getcapbanner"></cap-banner>
					<section class="main-content">
						<div class="content-left">
							<ul>
							</ul>
						</div>
					</section>
			</section>
		<Bottom></Bottom>
	</div>
</template>

<script>
import Top from '@/components/top'
import Bottom from '@/components/footer'
import capBanner from '@/components/capBanner'
import banner from '@/components/index-banner'

import { getcap } from '@/api/cap-banner.js'
import {heightBanner} from '@/api/index-banner.js'
export	default{
		data(){
			return{
				nav:{
					item1:"首页",
					item2:"儿童帽",
					item3:"男士帽",
					item4:"女士帽"
				},
				value2:0,
				banner:[],
        headtitle:"新品首发",
        like:"春 & 夏 2 0 1 8 典 藏",
				getcapbanner: []
			}
		},
		components:{ Bottom, Top, capBanner },
		created() {
			getcap().then(response => {
				this.getcapbanner = response.data;
			}); 
			heightBanner().then(response => {
				this.banner = response.data;
			}) 
		}
		
	}
</script>

<style scoped>
	*{
		margin: 0px;
		padding: 0px;
	}
	.body{
		background-color: #fafafa;
	}
	.nav{
		width: 100%;
		height: 65px;
		background-color: #fff;
	}
	.nav ul{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
	.nav ul li{
		list-style-type: none;
		flex-grow: .5;
		height: 30px;
		line-height: 30px;
		font-family: "微软雅黑";
		font-size: 20px;
		position: relative;
	}
	.nav-search{
		flex-grow: 2 !important;
	}
	.cart{
		flex-grow: 2 !important;
		height: 40px;
	}
	.cart img{
		height: 60%;
		width:  5%;
	}
	.nav-logo{
		background: url("/static/images/title.png") no-repeat;
		-webkit-background-size: contain;
		background-size: contain;
		background-position: center center;
	}
	.detail-down{
		width: 30px;
		height: 30px;
		background:url("/static/images/detail-arrow.png") no-repeat;
		-webkit-background-size: contain;
		background-size: contain;
		position: absolute;
		top: 5%;
		right:10%;
	}
	.banner{
	width: 100%;
	height: 1000px;
	}
	
	
	.headline{
		width: 40%;
		height: 200px;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
	}
	.head-title{
		font-family: "微软雅黑";
		font-size: 22px;
		margin: 15px;
	}
	.head-like{
		font-size: 19px;
		color: grey;
	}

</style>