import Vue from 'vue'
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    // redirect: '/text',
    component: () => import('@/components/layout/LayOut'),
    children: [
      {
        path: 'song/list/:id',
        name: 'songListWrap',
        component: () => import('@/views/home/main/childComponents/songListWrap/SongListWrap')
      }
    ]

  }
]
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})


export default router