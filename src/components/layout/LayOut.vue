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
import MusicHead from "@/views/head/MusicHead.vue";
import MusicFooter from "@/views/footer/MusicFooter.vue";
import MusicAside from "@/views/home/aside/MusicAside.vue";
import MusicMain from '@/views/home/main/MusicMain.vue';
export default {
  name: "LayOut",
  components: {
    MusicHead,
    MusicFooter,
    MusicAside,
    MusicMain,
  },
};
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
      .el-main {
        padding: 0;
      }
    }
    .el-footer {
      height: 70px !important;
      padding: 0;
    }
  }
}
</style>