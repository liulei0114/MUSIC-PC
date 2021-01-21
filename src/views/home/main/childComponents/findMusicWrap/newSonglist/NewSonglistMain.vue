<template>
  <div class="NewSonglistMain" v-mask-loading="{loading:loading}">
    <header>
      <div class="category_con">
        <div
          class="category"
          :class="{category_check:categroyIndex === 0}"
          @click="categroyIndex !== 0 && handleCategoryChangeNewSong()"
        >新歌速递</div>
        <div
          class="category"
          :class="{category_check:categroyIndex === 1}"
          @click="categroyIndex !== 1 && handleCategoryChangeAlbum()"
        >新碟上架</div>
      </div>
    </header>
    <nav class="flexL">
      <div class="seach_con">
        <div class="type_con flexL">
          <p v-for="item in areaList" :key="item.type">
            <span
              :class="{checkClass:item.type === areaCheckIndex}"
              @click="item.type !== areaCheckIndex && handelAreaChange(item.type)"
            >{{item.name}}</span>
          </p>
        </div>
      </div>
      <div class="new_song_option flexL" v-if="categroyIndex === 0">
        <div class="normal flexL">
          <i>
            <svg-icon icon-class="playall"></svg-icon>
          </i>
          <span>播放全部</span>
        </div>
        <div class="normal flexL">
          <i>
            <svg-icon icon-class="shoucang"></svg-icon>
          </i>
          <span>收藏全部</span>
        </div>
      </div>
      <div class="album_option flexL" v-else>
        <span
          @click="!isAlbumRecommend && handleRecommend()"
          :class="{checkOption:isAlbumRecommend}"
        >推荐</span>
        <span
          @click="isAlbumRecommend && handleAlbumAll()"
          :class="{checkOption:!isAlbumRecommend}"
        >全部</span>
      </div>
    </nav>
    <article v-if="categroyIndex === 0">
      <song-list-item
        v-for="(item,index) in topSongList"
        :key="item.id"
        :index="index+1"
        :songItem="item"
        height="80px"
        :isShowALpic="true"
      ></song-list-item>
    </article>
    <article v-else-if="categroyIndex === 1" class="flexL">
      <top-album-detail :albumRecommendMap="albumRecommendMap" @initPreMonth="initPreMonth"></top-album-detail>
    </article>
  </div>
</template>

<script>
import {
  fetchTopSongAPI,
  fetchTopAlbumAPI,
  fetchAllAlbumAPI,
} from "@/network/api/musicApi";
import { Single, Album } from "@/common/pojo.js";
import SongListItem from "../../songListWrap/SongListItem.vue";
import TopAlbumDetail from "./childComponents/TopAlbumDetail.vue";
export default {
  data() {
    return {
      categroyIndex: 0,
      areaList: [
        { type: 0, name: "全部" },
        { type: 7, name: "华语" },
        { type: 96, name: "欧美" },
        { type: 16, name: "韩国" },
        { type: 8, name: "日本" },
      ],
      areaCheckIndex: 0,
      topSongList: [],
      isAlbumRecommend: true,
      limit: 1,
      curPage: 1,
      curDate: this.$moment(),
      albumRecommendMap: {},
      allAllbumSearch: {
        limit: 500,
        curPage: 1,
      },
      loading: "on",
    };
  },
  computed: {
    albumAreaType() {
      switch (this.areaCheckIndex) {
        case 0:
          return "ALL";
        case 7:
          return "ZH";
        case 96:
          return "EA";
        case 16:
          return "KR";
        case 8:
          return "JP";
      }
    },
  },
  created() {
    this._initTopSonglist();
  },
  watch: {
    topSongList() {
      this.$nextTick(() => {
        this.loading = "off";
      });
    },
    albumRecommendMap: {
      deep: true,
      handler(newValue) {
        setTimeout(() => {
          this.loading = "off";
        }, 500);
       
      },
    },
  },
  methods: {
    async _initTopSonglist() {
      this.loading = "on";
      let result = await fetchTopSongAPI({ type: this.areaCheckIndex });
      result.data.forEach((e, i) => {
        this.topSongList.push(new Single(e));
      });
    },
    async _initAlbumRecommendlist() {
      this.loading = "on";

      let year = this.curDate.year();
      let month = this.curDate.month() + 1;
      let param = new URLSearchParams();
      param.append("area", this.albumAreaType);
      param.append("year", year);
      param.append("month", month);
      let result = await fetchTopAlbumAPI(param);
      let monthData = [];
      let weekData = [];
      result.monthData.forEach((e, i) => {
        monthData.push(new Album(e));
      });
      if (result.weekData) {
        result.weekData.forEach((e, i) => {
          weekData.push(new Album(e));
        });
        if (!this.albumRecommendMap["本周新碟"]) {
          this.$set(this.albumRecommendMap, "本周新碟", weekData);
        }
      }

      this.$set(this.albumRecommendMap, `${month}-${year}`, monthData);
    },
    async _initAllAlbumlist() {
      this.loading = "on";

      // 这接口就返回500条
      let param = new URLSearchParams();
      param.append("limit", this.allAllbumSearch.limit);
      param.append("area", this.albumAreaType);
      param.append(
        "offset",
        (this.allAllbumSearch.curPage - 1) * this.allAllbumSearch.limit
      );
      let result = await fetchAllAlbumAPI(param);
      this.albumRecommendMap = {};
      result.albums.forEach((e, i) => {
        let temp = new Album(e);
        if (this.albumRecommendMap[temp.publishTime]) {
          this.albumRecommendMap[temp.publishTime].push(temp);
        } else {
          let arr = [temp];
          this.albumRecommendMap[temp.publishTime] = arr;
        }
      });
    },
    handleCategoryChangeNewSong() {
      this.categroyIndex = 0;
      this.areaCheckIndex = 0;
      this.topSongList.length = [];
      this._initTopSonglist();
    },
    handleCategoryChangeAlbum() {
      this.categroyIndex = 1;
      this.areaCheckIndex = 0;
      this.albumRecommendMap = {};
      this._initAlbumRecommendlist();
    },
    handelAreaChange(type) {
      this.areaCheckIndex = type;

      if (this.categroyIndex === 0) {
        // 新歌速递
        this.topSongList.length = [];
        this._initTopSonglist();
      } else {
        this.albumRecommendMap = {};
        this.curDate = this.$moment();
        // 新碟上架

        if (this.isAlbumRecommend) {
          this._initAlbumRecommendlist();
        } else {
          this._initAllAlbumlist();
        }
      }
    },
    handleRecommend() {
      this.isAlbumRecommend = true;
      this._initAlbumRecommendlist();
    },
    handleAlbumAll() {
      this.isAlbumRecommend = false;
      this._initAllAlbumlist();
    },
    monthSubtract() {
      this.curDate.subtract(1, "months");
    },
    // ? 加载上一个月份
    initPreMonth() {
      if (this.isAlbumRecommend) {
        this.monthSubtract();
        this._initAlbumRecommendlist();
      }
    },
  },
  components: { SongListItem, TopAlbumDetail },
};
</script>
<style lang="less" scoped>
.NewSonglistMain {
  width: 100%;
  padding-right: 8px;
  header {
    margin-top: 10px;
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
  nav {
    margin: 30px 0;
    height: 25px;
    .seach_con {
      display: flex;
      justify-content: flex-start;
      .title {
        width: 40px;
        color: #373737;
      }
      .type_con {
        flex: 1;
        flex-wrap: wrap;
        font-size: 13px;
        p {
          padding: 0 10px;
          text-align: center;
          span {
            padding: 3px 8px;
            border-radius: 10px;
            &:hover {
              color: #373737;
              cursor: pointer;
            }
            &.checkClass {
              color: #373737;
              font-size: 15px;
              font-weight: 600;
            }
          }
        }
      }
    }
    .new_song_option {
      margin-left: auto;
      .normal {
        height: 25px;
        color: #373737;
        border-radius: 15px;
        margin-left: 10px;
        padding: 0 15px;
        font-size: 13px;
        span {
          margin-left: 5px;
        }
        &:first-child {
          background-color: #ec4141;
          color: #fff;
          &:hover {
            background-color: #d73535;
            cursor: pointer;
          }
        }
        &:last-child {
          border: 1px solid #d8d8d8;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .album_option {
      margin-left: auto;
      margin-right: 30px;
      font-size: 12px;
      span {
        margin-left: 30px;
        padding: 3px 10px;

        &:hover {
          color: #373737;
          cursor: pointer;
        }
        &.checkOption {
          background-color: #fdeded;
          color: #ec4141;
          border-radius: 10px;
        }
      }
    }
  }
  article {
  }
}
</style>