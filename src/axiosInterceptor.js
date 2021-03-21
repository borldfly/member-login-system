import axios from 'axios'
import {Loading, Message} from 'element-ui'
import {storage} from '@/api/common'

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

/**
 * axios请求请求头参数配置
 */
let instance = axios.create({
    timeout: 3000,
    header: {
        'token': storage.get('token') || ''
    }
});

// 添加请求拦截器(请求头拦截,比如token，超时时间的设置)
instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    if(storage.get('token'))config.headers['token']=storage.get('token');
    loading.open();
    return config;
}, error => {
    // 对请求错误做些什么
    loading.close();
    Message({
        type: 'error',
        message: error.message || '系统异常'
    })
    return Promise.reject(error);
});

// 添加响应拦截器(数据处理)
instance.interceptors.response.use(response => {
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
}, error => {
    // 对响应错误做点什么
    loading.close();
    Message({
        type: 'error',
        message: error.message || '系统异常'
    })
    return Promise.reject(error);
});