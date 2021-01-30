<template>
  <div id="SongMain" ref="SongMain" v-show="this.songMainStatus">
    <happy-scroll color="#e0e0e0" size="8" :resize="true" :hide-horizontal="true">
      <div class="con">
        <header class="song_info_wrap">
          <div class="song_img_left flexC">
            <div class="plate_needle" :class="{play_plate_needle:_playStatus}"></div>
            <div class="plate_img">
              <img
                class="play_plate_img"
                :src="_songImg"
                :style="{'animation-play-state':_playStatus?'running':'paused'}"
                width="210px"
                height="210px"
              />
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
              <div class="textOverflowElli">
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
            <div class="song_word_wrap" v-show="lyric">
              <lyric-wrap :lyric="lyric"></lyric-wrap>
            </div>
            <div class="song_word_wrap" v-show="!lyric">
              <span class="no_lyric">纯音乐，请欣赏</span>
            </div>
          </div>
        </header>
        <article class="song_commend_wrap"></article>
      </div>
    </happy-scroll>
  </div>
</template>

<script>
import { fetchSongDetailApi, fetchSongLyricAPI } from '@/network/api/musicApi'
import { Track } from '@/common/pojo.js'
import LyricWrap from './childComponents/LyricWrap.vue'
import { mapGetters } from 'vuex'
export default {
  components: { LyricWrap },
  data() {
    return {
      songId: '',
      oldSongId: '',
      songInfo: {},
      lyric: [],
    }
  },
  created() {},
  watch: {
    songMainStatus(status) {
      if (!status) {
        this.$router.go(-1)
      }
    },
    curPlaySongIndex(index) {
      if (this.songMainStatus) {
        this.$router.replace({
          name: 'SongMain',
          params: { id: this.playMusicList[index].id },
        })
        this.songId = this.$route.params.id
        if (this.oldSongId !== this.songId) {
          this._initSongDetail()
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      songMainStatus: 'songMainStatus',
      songPlayStatus: 'songPlayStatus',
      curPlaySongIndex: 'curPlaySongIndex',
      playMusicList: 'playMusicList',
    }),
    _songImg() {
      if (Object.keys(this.songInfo).length === 0) return
      return (
        this.tansIdentityIconUrl(this.songInfo.al.picUrl) + '?param=210y210'
      )
    },
    _alId() {
      if (Object.keys(this.songInfo).length === 0) return
      return this.songInfo.al.id
    },
    _alName() {
      if (Object.keys(this.songInfo).length === 0) return
      return this.songInfo.al.name
    },
    _playStatus() {
      return this.songPlayStatus
    },
  },
  methods: {
    async _initSongDetail() {
      let result = await fetchSongDetailApi({ ids: this.songId })
      result.songs.forEach((k, i) => {
        this.songInfo = new Track(k, result.privileges[i])
      })
      let word = await fetchSongLyricAPI({ id: this.songId })
      this.lyric = []

      if (word.nolyric) {
        // 纯音乐，没有歌词
        this.lyric = null
      } else {
        let regexp = new RegExp('\n')
        this.lyric.push(...word.lrc.lyric.split(regexp))
      }
    },
    tansIdentityIconUrl(picUrl) {
      picUrl = picUrl.replace(new RegExp('p[1-5]{1}'), 'p3')
      return picUrl
    },
  },
  activated() {
    this.songId = this.$route.params.id
    if (this.oldSongId !== this.songId) {
      this._initSongDetail()
    }
  },
  deactivated() {
    this.oldSongId = this.songId
    this.$store.commit('songModule/SET_SONG_PLAY_STATUS', false)
  },
}
</script>

<style lang="less" scoped>
#SongMain {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: inline-block;

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
          top: 0px;
          left: 35%;
          background: no-repeat url('~assets/needle.png');
          transition: transform 0.8s ease-in;
          transform-origin: 45px -10px;
          &.play_plate_needle {
            transform: rotate(30deg);
          }
        }
        .plate_img {
          width: 326px;
          height: 326px;
          text-align: center;
          line-height: 326px;
          background: no-repeat url('~assets/center.png') 0 0;
          img {
            border-radius: 50%;
            animation-play-state: 'running';
            animation-delay: 1.2s;
            &.play_plate_img {
              animation: rotate 5s linear infinite;
            }
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
          height: 80%;
          position: relative;
          .no_lyric {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
    .song_commend_wrap {
    }
  }
}
</style>

