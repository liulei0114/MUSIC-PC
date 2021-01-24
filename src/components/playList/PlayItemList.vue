<template>
  <div class="PlayItemWrap">
    <happy-scroll
      v-if="musicList.length !== 0"
      color="#e0e0e0"
      size="4"
      :resize="true"
      :hide-horizontal="true"
    >
      <div class="con">
        <p
          style="fontSize:14px;padding: 5px 20px;height:30px;color:#d7d7d7"
        >共 {{musicList.length}} 首</p>
        <div
          class="PlayItem"
          v-for="(songItem,index) in musicList"
          :key="songItem.id"
          :class="{isOdd:index%2!=0}"
        >
          <div class="status">
            <span>
              <svg-icon icon-class="play1"></svg-icon>
            </span>
          </div>

          <div class="name textOverflow flexLeft">
            <span :class="{noCopyright:songItem.noCopyrightRcmd}">{{songItem.name}}</span>
            <span class="other" :class="getTextOverFlow(index +1)">{{getAlias(songItem)}}</span>
            <div class="icon_con flexLeft">
              <i v-if="songItem.isSq" :class="{noCopyright:songItem.noCopyrightRcmd}">
                <svg-icon icon-class="song_sq"></svg-icon>
              </i>
              <i
                v-if="songItem.mv !== 0"
                :class="{noCopyright:songItem.noCopyrightRcmd}"
                style="font-size:35px"
              >
                <svg-icon icon-class="song_mv"></svg-icon>
              </i>
            </div>
          </div>

          <div class="ar textOverflow">
            <span v-for="(item,i) in songItem.ar" :key="item.id">
              <i @click.stop="handleToArDetail(item)">{{item.name}}</i>
              <i v-if="i +1 !== songItem.ar.length">&nbsp;/&nbsp;</i>
            </span>
          </div>

          <div class="dt">
            <span>{{songItem.formatDt}}</span>
          </div>
        </div>
      </div>
    </happy-scroll>
    <div v-else class="no_music">
      <p>你还没有播放任何歌曲！</p>
      <div>
        去首页
        <span class="goMain" @click="handleToMusicMain">发现音乐</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    musicList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {},
  methods: {
    getAlias(songItem) {
      if (songItem.tns) {
        return `(${songItem.tns[0]})`
      } else if (songItem.alia && songItem.alia.length >= 1) {
        return `(${songItem.alia[0]})`
      }
      return ''
    },
    getTextOverFlow(index) {
      this.$nextTick(() => {
        let itemName = document
          .getElementsByClassName('PlayItem')
          [index - 1].querySelector('.name')
        let songName = itemName.children[0]
        let aliasName = itemName.children[1]
        let iconCon = itemName.children[2]

        let itemNameWidth =
          itemName.clientWidth -
          ~~getComputedStyle(itemName, false)['paddingRight'].replace(
            /\s+|px/gi,
            ''
          )

        let songNameWidth = songName.clientWidth
        let aliasNameWidth = aliasName.clientWidth
        let iconWidth = iconCon.clientWidth
        if (itemNameWidth - songNameWidth <= iconWidth) {
          // songanme添加textOverflow
          songName.classList.add('textOverflow')
        }
        if (itemNameWidth - songNameWidth - iconWidth <= aliasNameWidth) {
          // alias添加textOverflow
          aliasName.classList.add('textOverflow')
        }
      })
    },
    handleToArDetail(item) {
      this.$bus.$emit('handleHistoryDrawer', false)
      this.$router.push({ name: 'PersonalizedArtist', params: { id: item.id } })
    },
    handleToMusicMain() {
      this.$bus.$emit('handleHistoryDrawer', false)
      this.$router.push('/find/music/alization')
    },
  },
}
</script>

<style lang="less" scoped>
.PlayItemWrap {
  width: 100%;
  height: 100%;
  .happy-scroll {
    /deep/ .happy-scroll-container {
      width: 100% !important;
      height: 470px !important;
      .happy-scroll-content {
        width: 100%;
      }
    }
  }
  .con {
    width: 100%;
    height: 100%;
    padding-right: 4px;
    .PlayItem {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: left;
      align-items: center;
      padding-left: 5px;
      font-size: 14px;
      &.isOdd {
        background-color: #f9f9f9;
      }
      .flexLeft {
        display: flex;
        justify-content: left;
        align-items: center;
      }
      &:hover {
        cursor: pointer;
        background-color: #f0f1f2;
        .dt,
        .ar {
          color: #000000;
        }
      }
      .svgnoraml {
        font-size: 16px;
        color: #a8a9aa;
      }
      .textOverflow {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .status {
        color: #ec4141;
        margin: 0 7px;
      }
      .name {
        width: 200px;
        color: #333;
        font-size: 14px;
        padding-right: 10px;
        .noCopyright {
          color: #999;
        }
        .icon_con {
          margin-left: left;
          i {
            color: #ec4141;
            font-size: 26px;
            margin-left: 3px;
            &.vip_icon {
              color: #fe672e;
            }
          }
        }
        .other {
          font-size: 12px;
          color: #969697;
          margin-left: 5px;
        }
      }
      .ar {
        width: 150px;
        color: #807e7e;
        padding-right: 10px;
        font-size: 13px;
      }
      .dt {
        color: #cccccc;
        font-size: 13px;
        margin-left: auto;
        margin-right: 20px;
      }
    }
  }
  .no_music {
    text-align: center;
    margin-top: 50px;
    font-size: 14px;
    color: #999999;
    .goMain {
      color: #000000;
      cursor: pointer;
    }
  }
}
</style>