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