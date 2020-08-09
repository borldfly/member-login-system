import axios from 'axios'
import {Loading, Message} from 'element-ui'

// 配置全局加载层
let loading = {
    loadingInterceptor: null,
    open() {
        this.loadingInterceptor = !this.loadingInterceptor && Loading.service({
            target: 'body',
            background: 'rgba(0,0,0,.5)'
        });
    },
    close() {
        this.loadingInterceptor && this.loadingInterceptor.close();
    }
};

// 添加请求拦截器(请求头拦截,比如token，超时时间的设置)
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    loading.open();
    return config;
}, function (error) {
    // 对请求错误做些什么
    loading.close();
    Message({
        type: 'error',
        message: error.message || '系统异常'
    })
    return Promise.reject(error);
});

// 添加响应拦截器(数据处理)
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    loading.close();
    const resData = response.data;
    if (resData.code !== 200){
        Message({
            type: 'error',
            message: resData.message || '请求失败，请联系开发人员'
        })
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    loading.close();
    Message({
        type: 'error',
        message: error.message || '系统异常'
    })
    return Promise.reject(error);
});