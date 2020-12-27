import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/text',
    component: () => import('@/components/layout/LayOut'),
    children: [
      {
        path: 'text',
        name: 'text',
        component: () => import('@/views/home/main/childComponents/text'),
      }

    ]

  }
]

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})


export default router