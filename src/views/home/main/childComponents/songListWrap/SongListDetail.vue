<template>
  <div class="SongListDetail" v-mask-loading="{loading:loading}">
    <div class="body">
      <div class="title flexTable">
        <span>音乐标题</span>
        <span>歌手</span>
        <span :style="_alMarginLef">专辑</span>
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
    </div>
    <div v-if="getSongList">
      <song-list-item
        v-for="(item,index) in songListTracks"
        :key="item.id"
        :index="index+1"
        :songItem="item"
        :likeListIdsMap="likeListIdsMap"
        :isShowPop="isShowPop"
        @openDeleteSongDialog="openDeleteSongDialog(index)"
      ></song-list-item>
    </div>
    <el-dialog
      :visible.sync="dialogTableVisible"
      center
      width="470px"
      :modal-append-to-body="false"
      :modal="false"
    >
      <div style="text-align: center;">确定将选中歌曲从我喜欢的音乐中删除</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" plain @click="deleteSongItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SongListItem from "./SongListItem.vue";
import { mapGetters } from "vuex";
import { fetchSongDetailApi, fetchLikeMusicAPI } from "@/network/api/musicApi";
import { Track } from "@/common/pojo.js";
export default {
  components: { SongListItem },
  data() {
    return {
      typeIndex: 1,
      songlist: [],
      _debounceKeywords: null,
      songListTracks: [],
      vipCount: 0,
      dialogTableVisible: false,
      deleteSongIndex: "",
      loading: "on",
    };
  },
  props: {
    songIds: {
      type: Array,
      default() {
        return [];
      },
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
    ...mapGetters({
      userProfile: "userProfile",
      likeListIdsMap: "likeMusicList",
    }),
    getSongList() {
      if (this.songIds.length === 0) {
        return false;
      }
      this._initSongDetail();
      return true;
    },
    _PopMarginLeft() {
      if (this.isShowPop) {
        return { right: "70px" };
      }
    },
    _dtMarginLeft() {
      if (this.isShowPop) {
        return { right: "145px" };
      }
      return { right: "35px" };
    },
    _alMarginLef() {
      if (this.isShowPop) {
        return { left: "505px" };
      }
      return { right: "235px" };
    },
  },
  watch: {
    keywords(newKeyword) {
      this._debounceKeywords();
    },
    songListTracks() {
      this.$nextTick(() => {
        this.loading = "off";
      });
    },
  },
  created() {
    // 创建关键词防抖函数
    this._debounceKeywords = this._.debounce(this.seachMusicInSongList, 1000);
  },
  methods: {
    openDeleteSongDialog(index) {
      this.dialogTableVisible = true;
      this.deleteSongIndex = index;
    },
    _initSongDetail() {
      fetchSongDetailApi({ ids: this.songIds.join(",") }).then((result) => {
        result.songs.forEach((e, i) => {
          if (e.fee === 1) {
            this.vipCount++;
          }
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
    deleteSongItem() {
      this.dialogTableVisible = false;
      let songId = this.songListTracks[this.deleteSongIndex].id;
      this.cancelLikeMusic(songId);
    },
    // ? 取消喜欢音乐
    async cancelLikeMusic(songId) {
      try {
        await fetchLikeMusicAPI({
          id: songId,
          like: false,
        });
        this.$delete(this.likeListIdsMap, songId);
        // * 将歌曲移除列表
        this.songListTracks.splice(this.deleteSongIndex, 1);
        this.$store.commit(
          "songModule/SET_LIKE_MUSIC_MAP",
          this.likeListIdsMap
        );
      } catch (error) {
        this.$gMessage.show("你TM不是VIP你不知道吗？？？");
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
      height: 30px;
      line-height: 30px;
      position: relative;
      span {
        position: absolute;
        top: 0;
        &:nth-child(1) {
          left: 120px;
        }
        &:nth-child(2) {
          left: 410px;
        }
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