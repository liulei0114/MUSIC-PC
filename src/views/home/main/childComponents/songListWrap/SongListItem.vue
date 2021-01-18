<template>
  <div class="SongListItem" :class="{isOdd:index%2!=0}" :style="{height:height}">
    <div class="index">{{index | filterIndex}}</div>
    <div>
      <div class="flexL" v-if="!isShowALpic">
        <div class="like">
          <i>
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
            <svg-icon icon-class="play" style="color:#ec4141"></svg-icon>
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
    <div class="ar textOverflow">
      <span>{{_ar}}</span>
    </div>
    <div class="al textOverflow" :style="_alWidth">
      <span>{{songItem.al.name}}</span>
      <span class="other">{{_al}}</span>
    </div>
    <div class="dt">
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
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    songItem: {
      type: Object,
      default() {
        return {};
      },
    },
    likeListIdsMap: {
      type: Map,
      default() {
        return new Map();
      },
    },
    height: {
      type: String,
      default: "30px",
    },
    isShowALpic: {
      type: Boolean,
      default: false,
    },
    isShowPop: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _alias() {
      let songItem = this.songItem;
      if (songItem.tns) {
        return `(${songItem.tns[0]})`;
      } else if (songItem.alia && songItem.alia.length >= 1) {
        return `(${songItem.alia[0]})`;
      }
      return "";
    },
    _ar() {
      let songItem = this.songItem;
      let nameStr = "";
      songItem.ar.forEach((e, i) => {
        nameStr += e.name + " / ";
      });
      return nameStr != "" ? nameStr.substring(0, nameStr.length - 2) : nameStr;
    },
    _al() {
      let songItem = this.songItem;
      if (songItem.al.tns) {
        return songItem.al.tns.length !== 0 ? `(${songItem.al.tns[0]})` : "";
      }
      return "";
    },
    headStatus() {
      if (this.likeListIdsMap.get(this.songItem.id)) {
        return "headlike";
      }
      return "headnolike";
    },
    _alWidth() {
      if (this.isShowPop) {
        return { width: "150px" };
      }
      return { width: "180px", "margin-left": "50px", "margin-right": "20px" };
    },
    _popPercent() {
      let percent = ((this.songItem.pop / 100) * 80).toFixed(1) + "px";
      return { width: percent };
    },
  },
  filters: {
    filterIndex(value) {
      value = value + "";
      if (value.length === 1) {
        return "0" + value;
      }
      return value;
    },
  },
  methods: {
    getTextOverFlow(index) {
      this.$nextTick(() => {
        let itemName = document
          .getElementsByClassName("SongListItem")
          [index - 1].querySelector(".name");
        let songName = itemName.children[0];
        let aliasName = itemName.children[1];
        let iconCon = itemName.children[2];

        let itemNameWidth =
          itemName.clientWidth -
          ~~getComputedStyle(itemName, false)["paddingRight"].replace(
            /\s+|px/gi,
            ""
          );

        let songNameWidth = songName.clientWidth;
        let aliasNameWidth = aliasName.clientWidth;
        let iconWidth = iconCon.clientWidth;
        if (itemNameWidth - songNameWidth <= iconWidth) {
          // songanme添加textOverflow
          songName.classList.add("textOverflow");
        }
        if (itemNameWidth - songNameWidth - iconWidth <= aliasNameWidth) {
          // alias添加textOverflow
          aliasName.classList.add("textOverflow");
        }
      });
    },
  },
};
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
  }
  .pop {
    flex: 1;
    margin-left: 20px;
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