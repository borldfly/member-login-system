import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/main'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        //采用懒加载形式
        component: resolve => require(["../views/login"],resolve)
    },
    {
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: resolve => require(["../views/main/home.vue"],resolve),
                meta: {title: '首页'}
            },
            {
                path: '/management',
                name: 'management',
                component: resolve => require(["../views/main/management.vue"],resolve),
                meta: {title: '会员管理'}
            },
            {
                path: '/supplier',
                name: 'supplier',
                component: resolve => require(["../views/main/supplier.vue"],resolve),
                meta: {title: '供应商管理'}
            },
            {
                path: '/goods',
                name: 'goods',
                component: resolve => require(["../views/main/goods.vue"],resolve),
                meta: {title: '商品管理'}
            },
            {
                path: '/staff',
                name: 'staff',
                component: resolve => require(["../views/main/staff.vue"],resolve),
                meta: {title: '员工管理'}
            }
        ]
    }
]

const router = new VueRouter({
  routes
})

export default router
