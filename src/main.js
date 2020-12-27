import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router'
import store from '@/store'


// 通用css normal.css
import 'normalize.css/normalize.css'
import '@/style/index.css'

// 引入
import '@/icons/index'


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()


Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


