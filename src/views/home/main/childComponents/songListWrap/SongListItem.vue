<template>
  <div class="SongListItem" :class="{isOdd:index%2!=0}" :style="{height:height}">
    <div class="index">{{index | filterIndex}}</div>
    <div>
      <div class="flexL" v-if="!isShowALpic">
        <div class="like">
          <i @click.stop="handleLikeMusic">
            <svg-icon :icon-class="headStatus" class="svgnoraml"></svg-icon>
          </i>
        </div>
        <div class="down">
          <i>
            <svg-icon icon-class="xiazai2" class="svgnoraml"></svg-icon>
          </i>
        </div>
      </div>
      <div v-if="isShowALpic" class="alPic">
        <img :src="songItem.picurl + '?param=60y60'" alt width="60px" height="60px" />
        <div class="play">
          <i style="margin-left:5px;line-height:25px">
            <svg-icon icon-class="play1" style="color:#ec4141"></svg-icon>
          </i>
        </div>
      </div>
    </div>

    <div class="name textOverflow flexLeft">
      <span :class="{noCopyright:songItem.noCopyrightRcmd}">{{songItem.name}}</span>
      <span class="other" :class="getTextOverFlow(index)">{{_alias}}</span>
      <div class="icon_con flexLeft">
        <i
          v-if="songItem.fee === 1"
          class="vip_icon"
          :class="{noCopyright:songItem.noCopyrightRcmd}"
        >
          <svg-icon icon-class="song_vip"></svg-icon>
        </i>
        <i v-if="songItem.fee === 1" :class="{noCopyright:songItem.noCopyrightRcmd}">
          <svg-icon icon-class="song_shiting"></svg-icon>
        </i>
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
    <div class="ar textOverflow" v-if="!isAr">
      <span v-for="(item,index) in songItem.ar" :key="item.id">
        <i @click.stop="$router.push({name:'PersonalizedArtist',params:{id:item.id}})">{{item.name}}</i>
        <i v-if="index +1 !== songItem.ar.length">&nbsp;&nbsp;/&nbsp;&nbsp;</i>
      </span>
    </div>
    <div class="al textOverflow" :style="_alWidth" v-if="!isAr">
      <span
        @click.stop="$router.push({name:'PersonalizedAlbum',params:{id:songItem.al.id}})"
      >{{songItem.al.name}}</span>
      <span class="other">{{_al}}</span>
    </div>
    <div class="dt" :class="{maringLeftAuto:isAr}">
      <span>{{songItem.formatDt}}</span>
    </div>
    <div class="pop" v-if="isShowPop">
      <span class="pop_line">
        <i :style="_popPercent"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { fetchLikeMusicAPI } from '@/network/api/musicApi'
export default {
  data() {
    return {
      isLike: false,
    }
  },
  props: {
    index: {
      type: Number,
      default: 0,
    },
    songItem: {
      type: Object,
      default() {
        return {}
      },
    },
    likeListIdsMap: {
      type: Object,
      default: () => {},
    },
    height: {
      type: String,
      default: '30px',
    },
    isShowALpic: {
      type: Boolean,
      default: false,
    },
    isShowPop: {
      type: Boolean,
      default: false,
    },
    isAr: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _alias() {
      let songItem = this.songItem
      if (songItem.tns) {
        return `(${songItem.tns[0]})`
      } else if (songItem.alia && songItem.alia.length >= 1) {
        return `(${songItem.alia[0]})`
      }
      return ''
    },

    _al() {
      let songItem = this.songItem
      if (songItem.al.tns) {
        return songItem.al.tns.length !== 0 ? `(${songItem.al.tns[0]})` : ''
      }
      return ''
    },
    headStatus() {
      if (!this.likeListIdsMap) return
      if (this.likeListIdsMap[this.songItem.id]) {
        this.isLike = true
        return 'headlike'
      }
      return 'headnolike'
    },
    _alWidth() {
      if (this.isShowPop) {
        return { width: '140px' }
      }
      return { width: '180px', 'margin-left': '50px', 'margin-right': '20px' }
    },
    _popPercent() {
      let percent = ((this.songItem.pop / 100) * 80).toFixed(1) + 'px'
      return { width: percent }
    },
  },
  filters: {
    filterIndex(value) {
      value = value + ''
      if (value.length === 1) {
        return '0' + value
      }
      return value
    },
  },
  methods: {
    getTextOverFlow(index) {
      this.$nextTick(() => {
        let itemName = document
          .getElementsByClassName('SongListItem')
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
    // ? 取消喜欢音乐
    async cancelLikeMusic() {
      try {
        await fetchLikeMusicAPI({
          id: this.songItem.id,
          like: false,
        })
        this.isLike = false
        this.$delete(this.likeListIdsMap, this.songItem.id)
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
          id: this.songItem.id,
          like: true,
        })
        this.isLike = true
        this.$set(this.likeListIdsMap, this.songItem.id, true)
        this.$gMessage.show(
          `<span>已添加到我喜欢的音乐</span>`,
          'complate',
          '40px'
        )
        this.$store.commit('songModule/SET_LIKE_MUSIC_MAP', this.likeListIdsMap)
      } catch (error) {
        console.log(error)
        this.$gMessage.show('你TM不是VIP你不知道吗？？？')
      }
    },
    // ? 喜欢音乐
    async handleLikeMusic() {
      // * 在我喜欢的音乐，喜欢/不喜欢会把歌曲移除列表
      let myListSonglistId = this.$store.getters.asideMenu.myPlayList[0]
        .childrens[0].id
      if (this.$route.meta.isCreated) {
        let routeId = this.$route.path.slice(
          this.$route.path.lastIndexOf('/') + 1
        )
        if (routeId == myListSonglistId) {
          // * 在我喜欢的音乐界面
          this.$emit('openDeleteSongDialog')
          return
        }
      }
      // 普通歌单界面
      if (this.isLike) {
        this.cancelLikeMusic()
      } else {
        this.doLikeMusic()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.SongListItem {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 20px;
  font-size: 14px;
  .flexLeft {
    display: flex;
    justify-content: left;
    align-items: center;
  }
  &:hover {
    cursor: pointer;
    background-color: #f0f1f2;
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
  .index {
    width: 35px;
    color: #cfcfcf;
  }
  .like {
    width: 25px;
    i {
      vertical-align: middle;
    }
  }
  .down {
    width: 30px;
  }
  .alPic {
    position: relative;
    margin-right: 10px;
    img {
      border-radius: 5px;
    }
    .play {
      position: absolute;
      overflow: hidden;
      text-align: center;
      border-radius: 50%;
      background-color: #fff;
      width: 25px;
      height: 25px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .name {
    width: 300px;
    color: #333;
    font-size: 14px;
    padding-right: 10px;
    .noCopyright {
      color: #999;
    }
  }
  .ar {
    width: 100px;
    color: #807e7e;
    padding-right: 10px;
    font-size: 13px;
  }
  .al {
    color: #807e7e;
    font-size: 13px;
  }
  .dt {
    color: #9f9f9f;
    font-size: 13px;
    &.maringLeftAuto {
      margin-left: auto;
      margin-right: 5px;
    }
  }
  .pop {
    flex: 1;
    margin-left: 40px;
    line-height: 0px;

    .pop_line {
      width: 80px;
      height: 6px;
      display: inline-block;
      border-radius: 3px;
      background-color: #dfdfdf;
      overflow: hidden;
      i {
        height: 100%;
        background-color: #c9c9c9;
        display: inline-block;
      }
    }
  }
}
.isOdd {
  background-color: #f9f9f9;
}
</style>