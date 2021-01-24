<template>
  <div
    class="MusicIntroduceMoudle"
    :style="{width:width+'px'}"
    @mouseenter="handelMouseEnter"
    @mouseleave="handleMouserLeave"
  >
    <div class="head" :style="setWHB()">
      <img v-lazy="getImgUrl" ref="picImg" :width="width+'px'" :height="height+'px'" />
      <div class="play" v-if="isPlay" :style="setPosition()">
        <i style="margin-left:5px">
          <svg-icon icon-class="play1" style="color:#ec4141"></svg-icon>
        </i>
      </div>
      <div class="playCount" v-if="musicItem.playCount">
        <div v-show="playCountShow">
          <i>
            <svg-icon icon-class="bofang"></svg-icon>
          </i>
          <span style="margin-left:5px">{{musicItem.playCount}}</span>
        </div>
      </div>
      <div class="copywriter" v-if="isCopyWriter">
        <span>{{musicItem.copywriter}}</span>
      </div>
      <div class="imgBottom" v-if="isImgBottom">
        <slot name="imgBottom"></slot>
      </div>
    </div>
    <div class="floot">
      <span class="flexL">
        {{musicItem.name}}
        <i class="person" v-if="isPerson">
          <svg-icon icon-class="person"></svg-icon>
        </i>
      </span>
      <div class="artist" v-if="musicItem.artistName">{{musicItem.artistName}}</div>
    </div>
  </div>
</template>

<script>
import { MenuItem } from 'element-ui'
export default {
  data() {
    return {
      playCountShow: true,
    }
  },
  props: {
    musicItem: {
      type: Object,
      default: () => {},
    },
    width: {
      type: String,
      default: '140',
    },
    height: {
      type: String,
      default: '140',
    },
    isRadius: {
      type: Boolean,
      default: true,
    },
    isScale: {
      type: Boolean,
      default: false,
    },
    isPlay: {
      type: Boolean,
      default: true,
    },
    isCenterPlay: {
      type: Boolean,
      default: false,
    },
    isCopyWriter: {
      type: Boolean,
      default: false,
    },
    isImgBottom: {
      type: Boolean,
      default: false,
    },
    isPerson: {
      type: Boolean,
      default: false,
    },
    playSize: {
      type: Object,
      default() {
        return {
          width: '30px',
          height: '30px',
          'font-size': '18px',
          'line-height': '30px',
        }
      },
    },
  },
  computed: {
    getImgUrl() {
      return `${this.musicItem.picUrl}?param=${this.width}y${this.height}`
    },
  },
  methods: {
    setWHB() {
      let temp = {
        width: this.width + 'px',
        height: this.height + 'px',
      }
      if (this.isRadius) {
        temp['border-radius'] = '5px'
      }
      return temp
    },
    setPosition() {
      let temp = {
        ...this.playSize,
      }
      if (this.isCenterPlay) {
        temp.left = '50%'
        temp.top = '50%'
        temp.transform = 'translate(-50%,-50%)'
      } else {
        temp.right = '10px'
        temp.bottom = '10px'
      }
      return temp
    },
    handelMouseEnter() {
      // 隐藏条件 没有copywriter
      if (this.isCopyWriter) {
        this.playCountShow = false
      }
      if (this.isScale) {
        this.$refs.picImg.classList.add('blowUp')
      }
    },
    handleMouserLeave() {
      this.playCountShow = true
      if (this.isScale) {
        this.$refs.picImg.classList.remove('blowUp')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.MusicIntroduceMoudle {
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
  .head {
    position: relative;
    overflow: hidden;
    img {
      transition: transform 0.5s;
    }
    .play {
      position: absolute;
      overflow: hidden;
      text-align: center;
      border-radius: 50%;
      background-color: #fff;
      opacity: 0;
      transition: opacity 0.7s;
    }
    .playCount {
      position: absolute;
      top: 5px;
      right: 10px;
      font-size: 12px;
      color: #fff;
    }
    .copywriter {
      width: 100%;
      height: 0;
      line-height: 30px;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      opacity: 0;
      transition: all 1s;
      border-radius: 3px;
      text-indent: 1em;
    }
    .imgBottom {
      position: absolute;
      bottom: 0;
      left: 0;
      padding-left: 5px;
      color: #fff;
      height: 30px;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      flex-wrap: nowrap;
      line-height: 30px;
    }
    .blowUp {
      transform: scale(1.1);
    }
    &:hover {
      cursor: pointer;
      .play {
        opacity: 1;
      }
      .copywriter {
        opacity: 1;
        height: 30px;
      }
    }
  }
  .floot {
    width: 100%;
    height: 40px;
    line-height: 20px;
    margin-top: 5px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #373737;
    .artist {
      color: #676767;
    }
    span,
    div {
      &:hover {
        color: #000000;
        cursor: pointer;
      }
    }
    .person {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #ef4441;
      color: #fff;
      margin-left: auto;
      line-height: 20px;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>