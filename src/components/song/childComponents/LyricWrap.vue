<template>
  <div id="LyricWrap">
    <happy-scroll color="#e0e0e0" size="8" :resize="true" :hide-horizontal="true">
      <div class="lyric_con">
        <div
          class="lyric_item"
          :class="{cur_play_lyric:curPlayLyricIndex === index}"
          v-for="(item,index) in lyricList"
          :key="index"
        >{{item.lyric}}</div>
      </div>
    </happy-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lyricList: [],
      lyricMap: {},
      scrollTop: 0,
      scrollConHeight: 0,
      curPlayLyricIndex: 0,
      scrollConDOM: null,
    }
  },
  created() {
    // 监听进入变化
    this.$bus.$on('playing', (curPlaySecond) => {
      // * 监听到播放进度变化 计算滚动位置
      let index = this.lyricMap[curPlaySecond]?.curlyricIndex
      if (typeof index !== 'undefined') {
        let lyricOffsetTop = document
          .getElementById('LyricWrap')
          .querySelectorAll('.lyric_item')[index].offsetTop
        if (this.curPlayLyricIndex !== index) {
          this.curPlayLyricIndex = index
          if (lyricOffsetTop - this.scrollConHeight / 2 >= 0) {
            this.scrollConDOM.scrollTo({
              top: lyricOffsetTop - this.scrollConHeight / 2,
              behavior: 'smooth',
            })
          }
        }
      }
    })
  },
  props: {
    lyric: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    lyric: {
      immediate: true,
      handler(newLyricList) {
        if (newLyricList.length === 0) return
        this.lyricList.length = 0
        this.scrollTop = 0
        this.curPlayLyricIndex = 0
        this.lyricMap = {}
        this.resolverLyric(newLyricList)
      },
    },
  },
  methods: {
    resolverLyric(resolveLyricList) {
      // [02:09.51][00:51.88]抱在怀里都是真的
      // [02:11.90][00:54.60]还想我什么都是对的
      // [02:14.41][00:57.32]这是决定新的一刻 ~~~~
      // [02:44.80][02:18.99][01:01.59]什么都对了
      let timeLyricMap = {}
      let reg = /\d{2}:\d{2}.\d{2,3}/g
      resolveLyricList.forEach((item, i) => {
        if (!this.islyricConEmpty(item)) {
          let lyricResolveList = item.match(reg)
          let lyric = item.substring(item.lastIndexOf(']') + 1)
          lyricResolveList.forEach((e, i) => {
            let temp = {
              beginTime: this.formatSecond(e),
              lyric,
            }
            this.lyricList.push(temp)
          })
        }
      })
      // 对歌曲数据排序
      this.lyricList.sort((a, b) => {
        return a.beginTime - b.beginTime
      })
      this.lyricList.forEach((e, i) => {
        timeLyricMap[e.beginTime] = {
          lyric: e.lyric,
          index: i,
        }
      })
      // 歌词数组转换为对象结构，便于索引
      let preIndex = 0
      for (
        let i = 0;
        i <= this.lyricList[this.lyricList.length - 1].beginTime;
        i++
      ) {
        if (timeLyricMap[i]) {
          this.lyricMap[i] = {
            lyric: timeLyricMap[i].lyric,
            curlyricIndex: timeLyricMap[i].index,
          }
          preIndex = timeLyricMap[i].index
        } else {
          this.lyricMap[i] = {
            lyric: '',
            curlyricIndex: preIndex,
          }
        }
      }
      // 滚回开头
      if (this.scrollConDOM) {
        this.scrollConDOM.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
      // 初始化scrollDom
      this.$nextTick(() => {
        this.scrollConDOM = document
          .getElementById('LyricWrap')
          .querySelector('.happy-scroll-container')
        this.scrollConHeight = this.scrollConDOM.offsetHeight
      })
    },
    formatSecond(time) {
      let timeList = time.split(':')
      let min = ~~timeList[0] * 60
      let sec = ~~timeList[1]
      return min + sec
    },
    islyricConEmpty(lyric) {
      let index = lyric.lastIndexOf(']')
      if (index !== -1 && lyric.substring(index + 1)) {
        return false
      }
      return true
    },
  },
  filters: {
    filterLyric(lyric) {
      let index = lyric.lastIndexOf(']')
      if (index !== -1) {
        lyric = lyric.substring(index + 1)
        return lyric
      }
      return lyric
    },
  },
}
</script>

<style lang="less" scoped>
#LyricWrap {
  width: 90%;
  height: 100%;
  position: relative;
  .happy-scroll {
    /deep/ .happy-scroll-container {
      width: 100% !important;
      height: 100% !important;
      .happy-scroll-content {
        width: 100%;
      }
    }
  }
  .lyric_con {
    width: 100%;
    height: 100%;
    div {
      padding: 0 0 15px 0;
      font-size: 14px;
      color: #666666;
      &.cur_play_lyric {
        font-weight: 700;
        font-size: 20px;
        color: #333;
      }
    }
  }
}
</style>