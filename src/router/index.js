import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home',
  
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: { title: '首页', icon: 'home' },
      },
    ]

  }
]

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})


export default router