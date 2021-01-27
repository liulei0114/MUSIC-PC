<template>
  <div id="LayOut">
    <!-- 布局组件 -->
    <el-container class="layout_wrap">
      <!-- 头部  START -->
      <el-header>
        <music-head></music-head>
      </el-header>
      <!-- 头部  END -->

      <!-- 内容区  START -->
      <el-container class="home_wrap">
        <el-aside width="200px">
          <music-aside></music-aside>
        </el-aside>
        <el-main>
          <music-main></music-main>
        </el-main>
        <!-- 登录窗口 -->
        <transition name="el-fade-in-linear">
          <div class="login_wrap" v-show="this.$store.getters.loginDialogStatus">
            <login-wrap></login-wrap>
          </div>
        </transition>

        <!-- 播放列表 -->
        <play-list-wrap class="paly_list_wrap"></play-list-wrap>
        <transition name="liulei">
          <keep-alive>
            <router-view name="SongMain" class="SongMainClass"></router-view>
          </keep-alive>
        </transition>
      </el-container>
      <!-- 内容区  END -->

      <!-- 底部  START -->
      <el-footer>
        <music-footer></music-footer>
      </el-footer>
      <!-- 底部  END -->
    </el-container>
  </div>
</template>

<script>
import MusicHead from '@/views/head/MusicHead.vue'
import MusicFooter from '@/views/footer/MusicFooter.vue'
import MusicAside from '@/views/home/aside/MusicAside.vue'
import MusicMain from '@/views/home/main/MusicMain.vue'
import LoginWrap from '@/views/home/main/childComponents/LoginWrap.vue'
import PlayListWrap from '../playList/PlayListWrap.vue'
export default {
  name: 'LayOut',
  data() {
    return {}
  },
  computed: {},
  methods: {
    handleClose() {
      this.$store.commit('loginModule/SET_LOGIN_DIALOG_STATUS', false)
    },
  },
  components: {
    MusicHead,
    MusicFooter,
    MusicAside,
    MusicMain,
    LoginWrap,
    PlayListWrap,
  },
}
</script>
<style lang="less" scoped>
#LayOut {
  width: 100%;
  height: 100%;
  .layout_wrap {
    width: 100%;
    height: 100%;
    .el-header {
      height: 60px;
      padding: 0;
    }
    .home_wrap {
      width: 100%;
      height: calc(100% - 60px - 70px);
      position: relative;
      .el-main {
        padding: 0;
      }
      .SongMainClass {
        position: absolute;
        // width: 100%;
        // height: 100%;
        bottom: 0;
        left: 0;
        z-index: 2000;
        transform-origin: left bottom;
      }
      .paly_list_wrap {
        position: absolute;
      }
    }
    .el-footer {
      height: 70px !important;
      padding: 0;
    }
  }
  .liulei-enter-active,
  .liulei-leave-active {
    transition-property: opacity, width, height;
    transition-duration: 1s, 0.8s, 0.5s;
    transition-timing-function: ease;
  }
  .liulei-enter,
  .liulei-leave-to {
    opacity: 0;
    width: 0px;
    height: 0px;
  }
  .liulei-enter-to,
  .liulei-leave {
    opacity: 1;
    width: 100%;
    height: -100%;
  }
}
</style>