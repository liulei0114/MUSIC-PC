import Vue from 'vue'
import VueRouter from "vue-router"
import store from '@/store'

Vue.use(VueRouter)

const routes = [

  {
    path: '',
    redirect: '/find/music/alization',
  },
  {
    path: '/find/music',
    redirect: '/find/music/alization',
  },
  {
    path: '/find',
    component: () => import('@/components/layout/LayOut'),
    children: [
      {
        path: 'music',
        component: () => import('@/views/home/main/childComponents/findMusicWrap/FindMusicMain'),
        children: [
          {
            path: 'alization',
            component: () => import('@/views/home/main/childComponents/findMusicWrap/personalization/PersonAlizationMain.vue'),
            meta: {
              index: 1
            }
          },
          {
            path: 'songlist',
            component: () => import('@/views/home/main/childComponents/findMusicWrap/songlist/SongListMain.vue'),
            meta: {
              index: 2
            }
          },
          {
            path: 'dj',
            component: () => import('@/views/home/main/childComponents/findMusicWrap/dj/DjMain.vue'),
            meta: {
              index: 3
            }
          },
          {
            path: 'rank',
            component: () => import('@/views/home/main/childComponents/findMusicWrap/rankSonglist/RankSonglistMain.vue'),
            meta: {
              index: 4
            }
          },
          {
            path: 'artist',
            component: () => import('@/views/home/main/childComponents/findMusicWrap/artist/ArtistMain.vue'),
            meta: {
              index: 5
            }
          },
        ]
      }
    ]



  },

  {
    path: '/personalized',
    component: () => import('@/components/layout/LayOut'),
    children: [
      {
        path: 'song/list/:id',
        name: 'PersonalizedSongList',
        component: () => import('@/views/home/main/childComponents/songListWrap/SongListWrap.vue'),
      }
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