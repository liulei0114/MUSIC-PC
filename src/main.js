import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router'
import store from '@/store'
import _ from 'lodash'
import md5 from 'js-md5';
import HappyScroll from 'vue-happy-scroll'
//1.导入 monment 文件
import moment from 'moment'
import VueLazyLoad from 'vue-lazyload'

import AudioPlayer from '@liripeng/vue-audio-player'


// * 注册自定义全局组件
import gMessage from '@/components/message'

// 通用css normal.css
import 'normalize.css/normalize.css'
import '@/style/index.css'
// 引入
import '@/icons/index'
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'

//播放插件css
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'


import gLoading from '@/components/loading'

Vue.prototype._ = _
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.prototype.$md5 = md5;
Vue.prototype.$moment = moment;

Vue.use(gMessage)
Vue.use(ElementUI)
Vue.use(HappyScroll)
Vue.use(gLoading)
Vue.use(AudioPlayer)


//3.调用API进行汉化
moment.locale('zh-cn');


Vue.use(VueLazyLoad, {
  loading: require('@/assets/default.jpg')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


