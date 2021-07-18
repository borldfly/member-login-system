const express = require('express');
const app = express();
// var login = require('./src/db/login');
var apiRoutes = express.Router();
const path = require('path');
app.use('/api', apiRoutes);

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    devServer: {
        // before(app) {
        //     app.get('/api/login',(req,res)=>{
        //         res.json({login});
        //     });
        // },
        port: 8801, //端口号
        https: false, //开发环境设置false
        host: 'localhost', // 协议
        // proxy: 'http://localhost:8090', // host+port 用于向非当前主机服务器发送请求
        open: true, // 构建成功自动打开
        progress: false, // 关闭进度条
    },
    lintOnSave:false,
    // 开启调试
    // configureWebpack: config => {
    //     config.module.rules.push({
    //         test: /\.worker.js$/,
    //         use: [
    //             {
    //                 loader: 'worker-loader'
    //             },
    //             {
    //                 loader: "babel-loader",
    //                 options: {
    //                     presets: ["@babel/preset-env"],
    //                 }
    //             }
    //         ]
    //     })
    // },
    chainWebpack: config => {
        config.resolve.alias.set('@',resolve('src'))
    }
};