<template>
  <div id="SongMain">
    <happy-scroll color="#e0e0e0" size="8" :resize="true" :hide-horizontal="true">
      <div class="con">
        <header class="song_info_wrap">
          <div class="song_img_left flexC">
            <div class="plate_needle"></div>
            <div class="plate_img">
              <img :src="_songImg" alt width="210px" height="210px" />
            </div>
          </div>
          <div class="song_word_right">
            <div class="title flexC">
              <span>{{songInfo.name}}</span>
              <span v-if="songInfo.mv !== 0" style="margin-right:5px">
                <img src="~assets/mv.png" alt />
              </span>
              <span>
                <img src="~assets/biaozhun.png" alt />
              </span>
            </div>
            <div class="detail flexL">
              <div>
                <span>专辑：</span>
                <router-link :to="{name:'PersonalizedAlbum',params:{'id':_alId}}">{{_alName}}</router-link>
              </div>
              <div>
                <span>歌手：</span>
                <span v-for="(item,index) in songInfo.ar" :key="item.id">
                  <router-link :to="{name:'PersonalizedArtist',params:{id:item.id}}">{{item.name}}</router-link>
                  <i v-if="(index + 1) !== songInfo.ar.length">&nbsp;&nbsp;/&nbsp;&nbsp;</i>
                </span>
              </div>
              <div>
                <span>来源：</span>
              </div>
            </div>
            <div class="song_word_wrap">
              <lyric-wrap :lyric="lyric"></lyric-wrap>
            </div>
          </div>
        </header>
        <article class="song_commend_wrap"></article>
      </div>
    </happy-scroll>
  </div>
</template>

<script>
import { fetchSongDetailApi, fetchSongLyricAPI } from "@/network/api/musicApi";
import { Track } from "@/common/pojo.js";
import LyricWrap from "./childComponents/LyricWrap.vue";
export default {
  components: { LyricWrap },
  data() {
    return {
      songId: this.$route.params.id,
      songInfo: {},
      lyric: [],
      albumHeights: [],
      scrollIndex: 0,
      scrollFlag: true,
      start: 0,
    };
  },
  created() {
    this._initSongDetail();
  },
  computed: {
    _songImg() {
      if (Object.keys(this.songInfo).length === 0) return;
      return (
        this.tansIdentityIconUrl(this.songInfo.al.picUrl) + "?param=210y210"
      );
    },
    _alId() {
      if (Object.keys(this.songInfo).length === 0) return;
      return this.songInfo.al.id;
    },
    _alName() {
      if (Object.keys(this.songInfo).length === 0) return;
      return this.songInfo.al.name;
    },
  },
  methods: {
    async _initSongDetail() {
      let result = await fetchSongDetailApi({ ids: this.songId });
      result.songs.forEach((k, i) => {
        this.songInfo = new Track(k, result.privileges[i]);
      });
      let word = await fetchSongLyricAPI({ id: this.songId });

      let regexp = new RegExp("\n");
      this.lyric.push(...word.lrc.lyric.split(regexp));
    },
    tansIdentityIconUrl(picUrl) {
      picUrl = picUrl.replace(new RegExp("p[1-5]{1}"), "p3");
      return picUrl;
    },
    
  },
};
</script>

<style lang="less" scoped>
#SongMain {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .flexC {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .happy-scroll {
    /deep/ .happy-scroll-container {
      width: 100% !important;
      height: 100% !important;
      .happy-scroll-content {
        width: 100%;
      }
    }
  }
  .con {
    width: 100%;
    height: 100%;
    .song_info_wrap {
      padding: 0 30px 30px 80px;
      height: 460px;
      display: flex;
      justify-content: flex-start;
      .song_img_left {
        height: 100%;
        position: relative;
        .plate_needle {
          position: absolute;
          width: 250px;
          height: 67px;
          top: 0;
          left: 35%;
          background: no-repeat url("~assets/needle.png");
        }
        .plate_img {
          width: 326px;
          height: 326px;
          text-align: center;
          line-height: 326px;
          background: no-repeat url("~assets/center.png") 0 0;
          img {
            border-radius: 50%;
          }
        }
      }
      .song_word_right {
        height: 100%;
        color: #333333;
        width: 400px;
        margin-left: auto;
        margin-right: 20px;
        padding-top: 30px;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        .title {
          width: 100%;
          font-size: 25px;
          span:first-child {
            margin-right: 5px;
          }
        }
        .detail {
          width: 100%;
          margin-top: 15px;
          div {
            flex: 1;
            a {
              color: #507daf;
              &:hover {
                color: #507daf;
              }
            }
          }
        }
        .song_word_wrap {
          margin-top: 20px;
          height: 90%;
        }
      }
    }
    .song_commend_wrap {
    }
  }
}
</style>

