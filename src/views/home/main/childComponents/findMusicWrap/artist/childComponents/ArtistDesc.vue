<template>
  <div class="ArtistDesc">
    <div class="item" v-for="(item,index) in descList" :key="index">
      <p class="title">{{item.ti}}</p>
      <div class="txt">
        <div v-html="getArtistDesc(item.txt)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchArtistDescAPI } from "@/network/api/musicApi";
export default {
  data() {
    return {
      descList: [],
    };
  },
  props: {
    artistId: {
      type: String,
      default: "",
    },
  },
  created() {
    this._initArtistDesc();
  },
  methods: {
    async _initArtistDesc() {
      let result = await fetchArtistDescAPI({ id: this.artistId });
      result.introduction.forEach((e, i) => {
        this.descList.push(e);
      });
    },
    getArtistDesc(descTxt) {
      let regexp = new RegExp("\n");
      let descList = descTxt.split(regexp);
      let p = "";
      descList.forEach((e, i) => {
        p += `<p class="indent">${e}</p>`;
      });
      return p;
    },
  },
};
</script>

<style lang="less" scoped>
.ArtistDesc {
  width: 100%;
  padding: 30px;
  color: #676767;
  font-size: 14px;
  .item {
    margin-bottom: 30px;
    .title {
      color: #373737;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .txt {
      color: #676767;
      /deep/ .indent {
        text-indent: 2em;
        line-height: 30px;
      }
    }
  }
}
</style>