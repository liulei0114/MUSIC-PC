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
          {
            path: 'new',
            component: () => import('@/views/home/main/childComponents/findMusicWrap/newSonglist/NewSonglistMain.vue'),
            meta: {
              index: 6
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
      // 歌单详情页
      {
        path: 'songlist/:id',
        name: 'PersonalizedSongList',
        component: () => import('@/views/home/main/childComponents/songListWrap/SongListWrap.vue'),
      },
      // 专辑详情页
      {
        path: 'album/:id',
        name: 'PersonalizedAlbum',
        component: () => import('@/views/home/main/childComponents/findMusicWrap/newSonglist/childComponents/AlbumDetail.vue'),
      },
      // 歌手详情页
      {
        path: 'artist/:id',
        name: 'PersonalizedArtist',
        component: () => import('@/views/home/main/childComponents/findMusicWrap/artist/childComponents/ArtistDetail.vue'),
      },
      // 歌曲详情页
      {
        path: 'song/:id',
        name: 'SongMain',
        components: {
          SongMain: () => import('@/components/song/SongMain.vue'),
        }
      },
    ]
  },

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
    // ! 有个bug，不影响使用，页面刷新vuex数据清空，加载所有喜欢音乐是异步操作会导致加载两次
    // 是否有我喜欢的音乐，没有加载

    if (store.getters.menu) {
      next()
    } else {
      if (!store.getters.likeMusicList) {
        // 清空我喜欢的音乐
        store.dispatch('songModule/SaveLikeMusicList')
      }
      if (!store.getters.historyMusicList) {
        // 清空我喜欢的音乐
        store.dispatch('songModule/SaveHistoryMusicList')
      }
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