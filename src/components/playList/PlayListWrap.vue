<template>
  <div class="PlayList" :style="{width:width + 'px'}">
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      :modal="false"
      :append-to-body="false"
      size="100%"
      @closed="handleClosed(drawer)"
      @open="handleClosed(drawer)"
    >
      <header>
        <div class="category_con">
          <div
            class="category"
            :class="{category_check:categroyIndex === 0}"
            @click="categroyIndex !== 0 && handleCategoryChangePlayList()"
          >播放列表</div>
          <div
            class="category"
            :class="{category_check:categroyIndex === 1}"
            @click="categroyIndex !== 1 && handleCategoryChangeHistory()"
          >历史记录</div>
        </div>
      </header>
      <!-- 播放记录 -->
      <article v-show="categroyIndex === 0">
        <song-list-item
          v-for="(item,index) in playMusicList"
          :key="item.id"
          :index="index+1"
          :songItem="item"
        ></song-list-item>
      </article>
      <!-- 播放记录 -->
      <article v-show="categroyIndex === 1">
        <song-list-item
          v-for="(item,index) in historyMusicList"
          :key="item.id"
          :index="index+1"
          :songItem="item"
        ></song-list-item>
      </article>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SongListItem from "../../views/home/main/childComponents/songListWrap/SongListItem.vue";
export default {
  data() {
    return {
      drawer: false,
      width: 0,
      categroyIndex: 0,
    };
  },
  created() {
    this.$bus.$on("handleHistoryDrawer", (isDrawer) => {
      this.drawer = isDrawer;
    });
  },
  computed: {
    ...mapGetters({
      playMusicList: "playMusicList",
      historyMusicList: "historyMusicList",
    }),
    // playMusicList() {
    //   return this._playMusicList;
    // },
    // hisMusicList() {
    //   return this._historyMusicList;
    // },
  },
  methods: {
    handleClosed(flag) {
      flag ? (this.width = 420) : (this.width = 0);
    },
    handleCategoryChangePlayList() {
      this.categroyIndex = 0;
    },
    handleCategoryChangeHistory() {
      this.categroyIndex = 1;
    },
  },
  components: {
    SongListItem,
  },
};
</script>

<style lang="less" scoped>
.PlayList {
  z-index: 2003;
  height: 100%;
  right: 0;
  top: 0;
  .el-drawer__wrapper {
    position: absolute;
    /deep/ :focus {
      outline: 0;
    }
  }
  header {
    margin-top: 20px;
    .category_con {
      width: 230px;
      border-radius: 20px;
      border: 1px solid #bbbbbb;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 30px;
      margin: 0 auto;
      .category {
        height: 100%;
        line-height: 27px;
        flex: 1;
        border-radius: 20px;
        font-size: 12px;
        color: #373737;
        text-align: center;
        &:hover {
          cursor: pointer;
          background-color: #f4f4f4;
        }
        &.category_check {
          background-color: #bbbbbb;
          color: #fff;
        }
      }
    }
  }
}
</style>