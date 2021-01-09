import Vue from 'vue'
import VueRouter from "vue-router"
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/find/music',
    component: () => import('@/components/layout/LayOut'),
    children: [
      {
        path: 'find/music',
        component: () => import('@/views/home/main/childComponents/findMusicWrap/FindMusicWrap'),
      },
    ]

  }
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach((to, from, next) => {

  if (store.getters.userProfile) {
    if (store.getters.menu) {
      next()
    } else {
      store.dispatch('loginModule/AddMenuRouter').then((result) => {
        router.addRoutes(result)
        next({ ...to, replace: true })
      })
    }
  } else {
    next()
  }


})

export default router