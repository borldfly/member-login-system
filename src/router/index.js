import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Management from '@/components/main/Management'
import Home from '@/components/main/Home'
import Supplier from '@/components/main/Supplier'
import Goods from '@/components/main/Goods'
import Staff from '@/components/main/Staff'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        component: Main,
        children: [
            {
                path: '/home',
                name: 'Home',
                component: Home,
                meta: {title: '首页'}
            },
            {
                path: '/management',
                name: 'Management',
                component: Management,
                meta: {title: '会员管理'}
            },
            {
                path: '/supplier',
                name: 'Supplier',
                component: Supplier,
                meta: {title: '供应商管理'}
            },
            {
                path: '/goods',
                name: 'Goods',
                component: Goods,
                meta: {title: '商品管理'}
            },
            {
                path: '/staff',
                name: 'Staff',
                component: Staff,
                meta: {title: '员工管理'}
            },
            {
                path: '/',
                redirect: '/home'
            }
        ]
    }
]

const router = new VueRouter({
  routes
})

export default router
