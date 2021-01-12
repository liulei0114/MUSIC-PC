<template>
  <div class="HqSongList flexL" v-if="hqSongList.length !== 0">
    <div class="coverImg" :style="coverBg"></div>
    <div class="left">
      <img v-lazy="getCoverImgUrl" alt />
    </div>
    <div class="right">
      <div class="wangguan flexL">
        <i style="font-size:17px; margin-right:5px">
          <svg-icon icon-class="wangguan"></svg-icon>
        </i>
        <span>精品歌单</span>
      </div>
      <div class="name">
        <span>{{hqSongListDetail.name}}</span>
      </div>
      <p>{{hqSongListDetail.copywriter}}</p>
    </div>
  </div>
</template>

<script>
import { fetchHqSonglistAPI } from "@/network/api/musicApi";
import { HqSonglist } from "@/common/pojo";
export default {
  data() {
    return {
      hqSongList: [],
      hqSongListDetail: {},
    };
  },
  props: {
    subName: {
      type: String,
      default: "",
    },
  },
  computed: {
    getCoverImgUrl() {
      if (!this.hqSongListDetail) return;
      return this.hqSongListDetail.picUrl + "?param?140y140";
    },
    coverBg() {
      if (!this.hqSongListDetail) return;
      return {
        background: `url(${this.hqSongListDetail.picUrl}) center center no-repeat`,
      };
    },
  },
  watch:{
    subName(newValue){
      this._initHqSongList()
    }
  },
  created() {
    this._initHqSongList();
  },
  methods: {
    async _initHqSongList() {
      let params = new URLSearchParams();
      params.append("limit", 1);
      params.append("cat", this.subName);
      let result = await fetchHqSonglistAPI(params);
      this.hqSongList.length = 0
      result.playlists.forEach((e, i) => {
        this.hqSongList.push(new HqSonglist(e));
      });
      this.hqSongListDetail = this.hqSongList[0];
    },
  },
};
</script>

<style lang="less" scoped>
.HqSongList {
  width: 100%;
  height: 170px;
  padding: 15px 0 15px 15px;
  overflow: hidden;
  border-radius: 5px;
  color: #fff;
  position: relative;
  .coverImg {
    position: absolute;
    top: 0;
    left: 0;
    width: 782px;
    height: 170px;
    z-index: 1;
    background-size: contain;
    filter: blur(30px)  saturate(3);
    background-size: 200%;
  }
  .left {
    width: 140px;
    height: 140px;
    overflow: hidden;
    border-radius: 5px;
    z-index: 2;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    margin-left: 20px;
    z-index: 2;
    .wangguan {
      width: 120px;
      font-size: 14px;
      color: #e7aa5a;
      padding: 0 20px;
      border-radius: 20px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #e7aa5a;
      margin: 15px 0;
    }
    .name {
      font-size: 18px;
      margin-bottom: 10px;
    }
    p {
      font-size: 14px;
      color: #b09db4;
    }
  }
}
</style>