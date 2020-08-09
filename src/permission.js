import router from '@/router'
import {getTk, login} from '@/api/httpService'
import {Message} from 'element-ui'
import {setUser} from "./api/auth"
import store from './store'

/**
 * 权限判断
 * 实现原理：通过对token以及用户信息进行判断
 */
router.beforeEach((to, from, next)=>{
    const token = store.state.login.token,
        user = store.state.login.user;
    // 1.判断token是否存在
    // 如果token不存在，前往登录页获取token
    if (!token){
        if (to.path !== '/login'){
            next({path: '/login',params: {name: 'test'}});
        }else {
            next({params: {name: 'test'}});
        }
    } else {
        // 如果token存在，查看用户信息是否存在
        // 用户信息不存在，先获取用户信息
        if (!user){
            store.dispatch('Login', token).then(()=>{
                next({params: {name: 'test'}});
            }).catch(error => {
                Message('错误信息：' + err);
                next({path: '/login',params: {name: 'test'}});
            })
        } else {
            setUser(user);
            next();
        }
    }
});