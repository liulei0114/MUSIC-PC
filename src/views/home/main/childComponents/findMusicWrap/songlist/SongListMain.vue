<template>
  <div class="SongListWrap">
    <song-list-head :subName="curTag"></song-list-head>
    <div class="hot_tag_con">
      <div class="curTag" @click.stop="isAllSubShow = !isAllSubShow">
        <span>
          {{curTag}}
          <i>
            <svg-icon icon-class="arrow-right"></svg-icon>
          </i>
        </span>
      </div>
      <div class="tag_list">
        <span
          v-for="(item,index) in songlistHotSub"
          :key="index"
          @click="handleChangeTag(item.name)"
          :class="{curTagClass:item.name === curTag}"
        >{{item.name}}</span>
      </div>
      <all-song-list-sub
        v-show="isAllSubShow"
        :songlistCategory="songlistCategory"
        @handleChangeTag="handleChangeTag"
        :curTag="curTag"
      ></all-song-list-sub>
    </div>
    <article>
      <music-introduce-module
        v-for="(item,index) in topSonglist"
        :key="index"
        :musicItem="item"
        :isImgBottom="true"
        width="175"
        height="175"
        @click.native="handlePersonalizedSongList(item.id)"
      >
        <span slot="imgBottom" class="flexL">
          <i>
            <svg-icon icon-class="user1"></svg-icon>
          </i>
          <span class="textOverflowElli" style="margin-left:5px">{{item.nickname}}</span>
          <img
            v-if="item.identityIconUrl"
            :src="item.identityIconUrl"
            alt
            width="14px"
            height="14px"
            style="margin-left:5px"
          />
        </span>
      </music-introduce-module>
    </article>
    <footer>
      <div class="pageination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageInfo.total"
          :page-size="pageInfo.limit"
          :current-page="pageInfo.currentPage"
          hide-on-single-page
          @current-change="handelChangeCurrentPage"
        ></el-pagination>
      </div>
    </footer>
  </div>
</template>

<script>
import {
  fetchPlaylistCategoryAPI,
  fetchHotSonglistSubAPI,
  fetchHqSonglistSubAPI,
  fetchTopSonglistAPI,
} from "@/network/api/musicApi";
import {
  SonglistCategory,
  SonglistSub,
  HotSonglistSub,
  HqSonglistSub,
  HqSonglist,
} from "@/common/pojo";
import { loadingMixin } from "@/mixin/loadingMixin";
import SongListHead from "./childComponents/SongListHead.vue";
import AllSongListSub from "./childComponents/AllSongListSub.vue";
import MusicIntroduceModule from "../personalization/childComponents/MusicIntroduceModule.vue";
export default {
  mixins: [loadingMixin],
  data() {
    return {
      songlistCategory: [],
      songlistHotSub: [],
      songlistHqSub: [],
      topSonglist: [],
      curTag: "电子",
      isAllSubShow: false,
      pageInfo: {
        limit: 100,
        offset: 0,
        currentPage: 1,
        total: 0,
      },
    };
  },
  props: {},
  computed: {},
  created() {
    this.$nextTick(() => {
      this.initLoading();
    });
    this._initSonglistCategory();
    this._initHotSonglistSub();
    this._initHqSonglistSub();
    this._initTopSonglist();
    this.endLoading();
  },
  watch: {
    isAllSubShow(flag) {
      flag
        ? this.addAppClickEventListener()
        : this.removeAppClickEventListener();
    },
  },
  destroyed() {
    this.removeAppClickEventListener();
  },
  methods: {
    async _initSonglistCategory() {
      let result = await fetchPlaylistCategoryAPI();
      this.transform2SonglistCategory(result.categories, result.sub);
    },
    async _initHotSonglistSub() {
      let result = await fetchHotSonglistSubAPI();
      result.tags.forEach((e, i) => {
        this.songlistHotSub.push(new HotSonglistSub(e));
      });
    },
    async _initHqSonglistSub() {
      let result = await fetchHqSonglistSubAPI();
      result.tags.forEach((e, i) => {
        this.songlistHqSub.push(new HqSonglistSub(e));
      });
    },
    async _initTopSonglist() {
      let param = new URLSearchParams();
      param.append("limit", this.pageInfo.limit);
      param.append("cat", this.curTag);
      param.append("offset", this.pageInfo.offset);
      let result = await fetchTopSonglistAPI(param);
      this.pageInfo.total = result.total;
      this.topSonglist.length = 0;
      result.playlists.forEach((e, i) => {
        this.topSonglist.push(new HqSonglist(e));
      });
    },
    transform2SonglistCategory(categories, subList) {
      for (let key in categories) {
        let category = new SonglistCategory(key, categories[key]);
        this.songlistCategory.push(category);
      }
      subList.forEach((e, i) => {
        let sub = new SonglistSub(e);
        let type = sub.category;
        this.songlistCategory[type].subs.push(sub);
      });
    },
    // ? 选择标签
    handleChangeTag(name) {
      this.curTag = name;
      this.isAllSubShow = false;
      // * 渲染页面数据
      this.pageInfo.currentPage = 1;
      this.pageInfo.offset = 0;
      this.$nextTick(() => {
        this.initLoading();
      });
      this._initTopSonglist();
      this.endLoading();
    },
    // ? 添加监听
    addAppClickEventListener() {
      // 组件初始化添加事件监听
      document
        .getElementById("MusicMain")
        .addEventListener("click", this.handleClickEvent);
    },
    // ? 移除监听
    removeAppClickEventListener() {
      document
        .getElementById("MusicMain")
        .removeEventListener("click", this.handleClickEvent);
    },
    // ? 监听处理函数
    handleClickEvent(e) {
      let refClick = document
        .getElementsByClassName("AllSongListSub")[0]
        .contains(e.target); // 包含自身

      if (!refClick) {
        this.isAllSubShow = false;
      }
    },
    // ? 跳转歌单详情
    handlePersonalizedSongList(id) {
      this.$router.push({ name: "PersonalizedSongList", params: { id } });
    },
    handelChangeCurrentPage(curPage) {
      this.pageInfo.currentPage = curPage;
      this.pageInfo.offset = (curPage - 1) * this.pageInfo.limit;
      this.$nextTick(() => {
        this.initLoading();
      });
      this._initTopSonglist();
      this.scrollParentStart("#FindMusicPoint");
      this.endLoading();
    },
    scrollParentStart(name) {
      document.querySelector(name).scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    },
  },
  components: { SongListHead, AllSongListSub, MusicIntroduceModule },
};
</script>

<style lang="less" scoped>
.SongListWrap {
  width: 100%;
  .hot_tag_con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    position: relative;
    margin-bottom: 10px;
    .curTag {
      height: 100%;
      span {
        margin-top: 9px;
        display: block;
        padding: 5px 30px;
        border: 1px solid #d8d8d8;
        font-size: 16px;
        color: #373737;
        border-radius: 20px;
        &:hover {
          cursor: pointer;
          background-color: #f2f2f2;
        }
      }
    }
    .tag_list {
      span {
        padding: 0 10px;
        color: #676767;
        font-size: 12px;
        &:hover {
          cursor: pointer;
          color: #373737;
        }
        &.curTagClass {
          background-color: #fdf5f5;
          border-radius: 10px;
          color: #ec4141;
        }
      }
    }
  }
  article {
    display: flex;
    justify-content: flex-start;
    align-content: space-between;
    flex-wrap: wrap;
    .MusicIntroduceMoudle {
      margin-right: 25px;
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
  footer {
    width: 100%;
    height: 50px;
    .pageination {
      text-align: center;
      margin-top: 30px;
      margin-bottom: 50px;
      /deep/ .active {
        background-color: #ec4141 !important;
      }
      /deep/ li:not(.disabled):hover {
        color: #606266 !important;
      }
    }
  }
}
</style>