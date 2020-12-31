import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router'
import store from '@/store'
import _ from 'lodash'
import md5 from 'js-md5';
import HappyScroll from 'vue-happy-scroll'


// * 注册自定义全局组件
import gMessage from '@/components/message'

// 通用css normal.css
import 'normalize.css/normalize.css'
import '@/style/index.css'
// 引入
import '@/icons/index'
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'


Vue.prototype._ = _
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.prototype.$md5 = md5;


Vue.use(gMessage)
Vue.use(ElementUI)
Vue.use(HappyScroll)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


