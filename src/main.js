import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import '@/api/httpService'
import store from './store'
// import '@/api/iterator'
import '@/permission'
import '@/axiosInterceptor'

// import mock from '@/db/mock.js'

Vue.config.productionTip = false

Vue.prototype.http = axios

Vue.use(ElementUI)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')


