<template>
  <div class="SongListDetail">
    <div class="body">
      <div class="title flexTable">
        <span>音乐标题</span>
        <span>歌手</span>
        <span>专辑</span>
        <span :style="_dtMarginLeft">时长</span>
        <span v-if="isShowPop" :style="_PopMarginLeft">热度</span>
      </div>
      <!-- 不是会员 -->
      <div v-if="!userProfile || userProfile.vipType === 0" class="vip_buy_info">
        <i></i>
        <span v-if="!isAlbumTitle">含{{vipCount}}首vip专享歌曲</span>
        <span v-else>会员享高品质听觉盛宴</span>
        <span>首开VIP仅5元</span>
      </div>
      <div class="list_con" v-if="getSongList">
        <song-list-item
          v-for="(item,index) in songListTracks"
          :key="item.id"
          :index="index+1"
          :songItem="item"
          :likeListIdsMap="likeListIdsMap"
          :isShowPop="isShowPop"
        ></song-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import SongListItem from "./SongListItem.vue";
import { mapGetters } from "vuex";
import { fetchLikeListAPI, fetchSongDetailApi } from "@/network/api/musicApi";
import { Track } from "@/common/pojo.js";
export default {
  components: { SongListItem },
  data() {
    return {
      typeIndex: 1,
      likeListIdsMap: new Map(),
      songlist: [],
      _debounceKeywords: null,
      songListTracks: [],
    };
  },
  props: {
    songIds: {
      type: Array,
      default() {
        return [];
      },
    },
    vipCount: {
      type: Number,
      default: 0,
    },
    keywords: {
      type: String,
      default: "",
    },
    isAlbumTitle: {
      type: Boolean,
      default: false,
    },
    isShowPop: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({ userProfile: "userProfile" }),
    getSongList() {
      if (this.songIds.length === 0) {
        return false;
      }
      this._initSongDetail();
      return true;
    },
    _PopMarginLeft() {
      if (this.isShowPop) {
        return { "margin-left": "40px" };
      }
    },
    _dtMarginLeft() {
      if (this.isShowPop) {
        return { "margin-left": "80px" };
      }
      return { "margin-left": "175px" };
    },
  },
  watch: {
    keywords(newKeyword) {
      this._debounceKeywords();
    },
  },
  created() {
    this._initLikeList();
    // 创建关键词防抖函数
    this._debounceKeywords = this._.debounce(this.seachMusicInSongList, 1000);
  },
  methods: {
    async _initLikeList() {
      let result = await fetchLikeListAPI({ uid: this.userProfile.userId });
      let map = new Map();
      result.ids.forEach((e, i) => {
        map.set(e, true);
      });
      this.likeListIdsMap = map;
    },
    _initSongDetail() {
      fetchSongDetailApi({ ids: this.songIds.join(",") }).then((result) => {
        result.songs.forEach((e, i) => {
          this.songlist.push(new Track(e, result.privileges[i]));
          this.songListTracks = this.songlist;
        });
      });
    },
    // ? 歌单内搜索
    seachMusicInSongList() {
      let regExp = new RegExp(`${this.keywords.trim()}`, "i");
      if (this.keywords.trim() !== "") {
        let temp = this.songlist.filter((e) => {
          if (regExp.test(e.name) || regExp.test(e.alia.join(""))) {
            return true;
          }
          if (e.tns && regExp.test(e.tns.join(""))) {
            return true;
          }
          // 在歌手里面查找
          let ar = "";
          e.ar.forEach((e, i) => {
            ar += e.name;
          });
          if (regExp.test(ar)) {
            return true;
          }
          // 专辑里面查找
          if (regExp.test(e.al.name) || regExp.test(e.al.tns.join(""))) {
            return true;
          }
        });
        this.songListTracks = temp;
      } else {
        this.songListTracks = this.songlist;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.SongListDetail {
  width: 100%;
  height: 100%;

  .body {
    .title {
      font-size: 13px;
      color: #807e7e;
      margin: 20px 0 10px;
      span:nth-child(1) {
        margin-left: 120px;
      }
      span:nth-child(2) {
        margin-left: 248px;
      }
      span:nth-child(3) {
        margin-left: 112px;
      }
    }
    .flexTable {
      display: flex;
      justify-content: left;
      align-items: center;
    }
    .vip_buy_info {
      display: flex;
      justify-content: left;
      align-items: center;
      background-color: #f2f2f2;
      height: 30px;
      font-size: 14px;
      color: #333;
      i {
        width: 18px;
        height: 15px;
        background: no-repeat url("~assets/vipmusic.png");
        margin-left: 20px;
      }
      span:nth-child(2) {
        margin-left: 10px;
      }
      span:nth-child(3) {
        margin-left: 50px;
        color: #807e7e;
        font-size: 12px;
      }
    }
  }
}
</style>