<template>
  <div id="MusicFooter" class="flexL">
    <div class="play_song flexL">
      <div v-if="songInfo !== null" class="paly_song_con flexL">
        <img :src="_songImg" alt width="50px" height="50px" @click="handleToPlay()" />
        <article>
          <div class="textOverflowElli">
            <span style="margin-right:5px">{{songInfo.name}}</span>
            <span style="color:#949495">{{_songAliasName}}</span>
          </div>
          <div class="textOverflowElli" style="margin-top:5px">
            <span class="songName" v-for="(item,index) in songInfo.ar" :key="item.id">
              <router-link :to="{name:'PersonalizedArtist',params:{id:item.id}}">{{item.name}}</router-link>
              <i v-if="(index + 1) !== songInfo.ar.length">&nbsp;&nbsp;/&nbsp;&nbsp;</i>
            </span>
          </div>
        </article>
        <div class="like">
          <span @click="handleLikeMusic()">
            <svg-icon :icon-class="headStatus" class="svgnoraml"></svg-icon>
          </span>
        </div>
      </div>
    </div>
    <div class="play_progress">
      <audio-player
        ref="MyAudioPlayer"
        :audio-list="audioList"
        @play-prev="handlePlayPrev()"
        @play-next="handlePlayNext()"
        @ended="handlePlayEnd()"
      />
    </div>
    <div class="play_history">
      <div class="bar"></div>
      <div class="history" @click="handleOpenPlayListDrawer()"></div>
    </div>
  </div>
</template>

<script>
import {
  fetchSongUrlAPI,
  fetchSongDetailApi,
  fetchLikeMusicAPI,
} from '@/network/api/musicApi'
import { Track } from '@/common/pojo.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      songInfo: {},
      nextSongInfo: {},
      audioList: [],
      isLike: false,
      playIndex: 0,
      precentInitNextSong: 0.5,
      initFlag: true,
    }
  },
  watch: {
    playMusicList: {
      immediate: true,
      handler(playList) {
        if (playList.length === 0) {
          this.songInfo = null
          return
        }
        // 加载点击的歌曲
        this.audioList = []
        this._initSongDetail(playList[this.curPlaySongIndex].id)
        let songids = playList.map((e) => {
          return e.id
        })
        this._initSongUrl(songids.join(','))
      },
    },
    curPlaySongIndex(newIndex) {
      this.$refs.MyAudioPlayer.currentPlayIndex = newIndex
      this._initSongDetail(this.playMusicList[newIndex].id)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this._hiddenPlayPorgessItem()
    })
  },
  computed: {
    ...mapGetters({
      likeListIdsMap: 'likeMusicList',
      playListDrawerStatus: 'playListDrawerStatus',
      playMusicList: 'playMusicList',
      curPlaySongIndex: 'curPlaySongIndex',
      curPlaySongId: 'curPlaySongId',
      songMainStatus: 'songMainStatus',
    }),
    _songImg() {
      if (Object.keys(this.songInfo).length === 0) return
      return this.tansIdentityIconUrl(this.songInfo.al.picUrl) + '?param=50y50'
    },
    _songAliasName() {
      if (Object.keys(this.songInfo).length === 0) return
      if (this.songInfo.alia.length != 0) {
        return `(${this.songInfo.alia.join(' / ')})`
      }
      return ''
    },
    headStatus() {
      if (!this.likeListIdsMap) return ''
      if (this.likeListIdsMap[this.songInfo.id]) {
        this.isLike = true
        return 'headlike'
      }
      return 'headnolike'
    },
    initNextSongTime() {
      return ~~((this.songInfo.dt / 1000) * this.precentInitNextSong)
    },
  },
  methods: {
    async _initSongDetail(id) {
      let result = await fetchSongDetailApi({ ids: id })
      this.songInfo = new Track(result.songs[0], result.privileges[0])
    },
    async _initSongUrl(id) {
      let result = await fetchSongUrlAPI({ id: id })
      let temp = {}
      result.data.forEach((e, i) => {
        // 接口返回顺序不是传入ids的顺序
        temp[e.id] = this.tansMediaUrl(e.url)
      })
      this.playMusicList.forEach((e, i) => {
        if (temp[e.id] === null) {
        }
        this.audioList.push(temp[e.id])
      })
    },
    tansIdentityIconUrl(picUrl) {
      picUrl = picUrl.replace(new RegExp('p[1-5]{1}'), 'p3')
      return picUrl
    },
    _hiddenPlayPorgessItem() {
      document
        .querySelector('.audio__btn-wrap')
        .removeChild(document.querySelector('.audio__play-rate'))
      document
        .querySelector('.audio__btn-wrap')
        .removeChild(document.querySelector('.audio__play-volume-icon-wrap'))
    },
    handleLikeMusic() {
      // 普通歌单界面
      if (this.isLike) {
        this.cancelLikeMusic()
      } else {
        this.doLikeMusic()
      }
    },
    // ? 取消喜欢音乐
    async cancelLikeMusic() {
      try {
        await fetchLikeMusicAPI({
          id: this.songInfo.id,
          like: false,
        })
        this.isLike = false
        this.$delete(this.likeListIdsMap, this.songInfo.id)
        this.$store.commit('songModule/SET_LIKE_MUSIC_MAP', this.likeListIdsMap)
        this.$gMessage.show(`<span>取消喜欢成功</span>`, 'complate', '40px')
      } catch (error) {
        this.$gMessage.show('你TM不是VIP你不知道吗？？？')
      }
    },
    // ? 添加我喜欢的音乐
    async doLikeMusic() {
      try {
        await fetchLikeMusicAPI({
          id: this.songInfo.id,
          like: true,
        })
        this.isLike = true
        this.$set(this.likeListIdsMap, this.songInfo.id, true)
        this.$gMessage.show(
          `<span>已添加到我喜欢的音乐</span>`,
          'complate',
          '40px'
        )
        this.$store.commit('songModule/SET_LIKE_MUSIC_MAP', this.likeListIdsMap)
      } catch (error) {
        this.$gMessage.show('你TM不是VIP你不知道吗？？？')
      }
    },
    // 打开关闭历史播放记录
    handleOpenPlayListDrawer() {
      this.$bus.$emit('handleHistoryDrawer', !this.playListDrawerStatus)
    },
    handlePlayEnd() {
      // 播放完，播放下一首
      this.$store.commit(
        'songModule/SET_CUR_PLAY_SONG_INDEX',
        this.curPlaySongIndex + 1
      )
    },
    handlePlayPrev() {
      this.$store.commit(
        'songModule/SET_CUR_PLAY_SONG_INDEX',
        this.curPlaySongIndex - 1
      )
    },
    handlePlayNext() {
      this.$store.commit(
        'songModule/SET_CUR_PLAY_SONG_INDEX',
        this.curPlaySongIndex + 1
      )
    },
    tansMediaUrl(url) {
      if (url !== null) {
        url = url.replace(new RegExp('m[1-7]{1}'), 'm8')
      } else {
        url = 'no-found'
      }
      return url
    },
    handleToPlay() {
      if (!this.songMainStatus) {
        this.$router.push({
          name: 'SongMain',
          params: { id: this.songInfo.id },
        })
      }
      this.$store.commit(
        'songModule/SET_SONG_MAIN_STATUS',
        !this.songMainStatus
      )
    },
  },
}
</script>

<style lang="less" scoped>
#MusicFooter {
  width: 100%;
  height: 100%;
  background-color: var(--footerBgColor);
  .play_song {
    width: 266px;
    padding: 10px;
    height: 100%;
    .paly_song_con {
      align-items: flex-start;
      img {
        border-radius: 5px;
        cursor: pointer;
      }
      article {
        width: 175px;
        height: 100%;
        margin-left: 5px;
        color: #333;
        font-size: 16px;
        .songName {
          font-size: 14px;
          color: #333;
          a {
            color: #333;
            &:hover {
              color: #333;
            }
          }
        }
      }
      .like {
        &:hover {
          cursor: pointer;
        }
        .svgnoraml {
          font-size: 16px;
          color: #a8a9aa;
        }
      }
    }
  }
  .play_progress {
    padding-top: 5px;
    width: 470px;
    height: 100%;
    margin-left: 0px;
    /deep/ .audio-player {
      .audio__btn-wrap {
        .audio__play-icon {
          color: #2f2f30;
        }
        .audio__play-prev {
          width: 20px;
          height: 16px;
        }
        .audio__play-next {
          width: 20px;
          height: 16px;
        }
        .audio__play-start {
          width: 30px;
          height: 30px;
        }
        .audio__play-pause {
          width: 30px;
          height: 30px;
        }
        .audio__play-loading {
          width: 30px;
          height: 30px;
          span {
            background: #ff4e4e;
          }
        }
      }
      .audio__progress-wrap {
        margin-top: 8px;
        .audio__progress {
          background: #ff4e4e;
        }
        .audio__progress-point {
          background: #ff4e4e;
          box-shadow: 0 0 10px 1px rgba(255, 78, 78, 0.5);
        }
      }
    }
  }
  .play_history {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 20px;
    .bar {
      width: 200px;
      height: 30px;
      background: no-repeat url('~assets/footer_bar.png');
    }
    .history {
      flex: 1;
      height: 18px;
      background: no-repeat url('~assets/history.png');
      margin-left: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>