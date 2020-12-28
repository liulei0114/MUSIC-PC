import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    // redirect: '/text',
    component: () => import('@/components/layout/LayOut'),
    children: [


    ]

  }
]

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})


export default router