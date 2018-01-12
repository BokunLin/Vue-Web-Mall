import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import detail from  '@/views/detail'
import cart from '@/views/cart'
import list from "@/views/list"
import order from "@/views/order"
import address from "@/views/address"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    {
    	path:"/index",
    	name:"index",
    	component:index
    },
    {
      path:"/index/detail/:id",
      name:"detail",
      component:detail
    },
    {
      path:"/cart",
      name:"cart",
      component:cart
    },
    {
      path: '/childs',
      name: 'childs',
      component: list
    },
    {
      path: '/men',
      name: 'men',
      component: list
    },
    {
      path: '/women',
      name: 'women',
      component: list
    },
    {
      path:'/order',
      name:'order',
      component:order
    },
    {
      path: '/address',
      name: 'address',
      component: address
    }
  ]
})

export default router;