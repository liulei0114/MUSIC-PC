<template>
  <div class="PrivateNewSong">
    <div class="left">
      <img :src="getUrl" alt />
      <div class="play">
        <i style="margin-left:5px">
          <svg-icon icon-class="play" style="color:#ec4141"></svg-icon>
        </i>
      </div>
    </div>
    <div class="right">
      <div class="textOverflowElli" style="margin-bottom:5px">
        <span>{{newSong.name}}</span>
        <span class="name_alias" v-if="newSong.alias.trim()!==''">({{newSong.alias}})</span>
      </div>
      <div class="icon_con flexLeft">
        <i v-if="newSong.fee === 1" class="redColor" style="color:#fe672e">
          <svg-icon icon-class="song_vip"></svg-icon>
        </i>
        <i v-if="newSong.fee === 1" class="redColor">
          <svg-icon icon-class="song_shiting"></svg-icon>
        </i>
        <i v-if="newSong.isSq" class="redColor">
          <svg-icon icon-class="song_sq"></svg-icon>
        </i>
        <i v-if="newSong.mv !== 0" class="redColor" style="font-size:35px">
          <svg-icon icon-class="song_mv"></svg-icon>
        </i>
        <span style="margin-left:3px">{{newSong.ar}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newSong: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    getUrl() {
      return `${this.newSong.picUrl}?param=45y45`;
    },
  },
};
</script>

<style lang="less" scoped>
.PrivateNewSong {
  width: 30%;
  height: 47px;
  font-size: 12px;
  margin-bottom: 5px;
  .left {
    float: left;
    width: 47px;
    border: 1px solid #cccccc;
    height: 100%;
    border-radius: 5px;
    position: relative;
    &:hover{
      cursor: pointer;
    }
    .play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 25px;
      height: 25px;
      text-align: center;
      font-size: 16px;
      line-height: 25px;
      border-radius: 50%;
      background-color: #fff;
    }
  }
  .right {
    padding-left: 10px;
    float: left;
    width: calc(100% - 47px);
    height: 100%;
    position: relative;
    &:hover {
      background-color: #eaeaea;
    }
    .name_alias {
      color: #9f9f9f;
      margin-left: 5px;
    }
    .icon_con {
      position: absolute;
      bottom: -8px;
      left: 6px;
      span {
        color: #9f9f9f;
      }
      .redColor {
        color: #ec4141;
        margin-left: 3px;
        font-size: 30px;
      }
      .icon_size {
        width: 23px;
        height: 11px;
      }
      &.flexLeft {
        display: flex;
        justify-content: left;
        align-items: center;
      }
    }
  }
}
</style>