<template>
  <div class="PrivateNewSong">
    <div class="left">
      <img :src="getUrl" alt />
      <div class="play">
        <i style="margin-left:5px">
          <svg-icon icon-class="play1" style="color:#ec4141"></svg-icon>
        </i>
      </div>
    </div>
    <div class="right">
      <div class="song_name" style="margin-bottom:5px">
        <span>{{newSong.name}}</span>
        <span class="name_alias" v-if="newSong.alias.trim()!==''">({{newSong.alias}})</span>
      </div>
      <div class="song_intro">
        <i v-if="newSong.fee === 1" class="redColor" style="color:#fe672e">
          <svg-icon icon-class="song_vip"></svg-icon>
        </i>
        <i v-if="newSong.fee === 1" class="redColor">
          <svg-icon icon-class="song_shiting"></svg-icon>
        </i>
        <i v-if="newSong.isSq" class="redColor">
          <svg-icon icon-class="song_sq"></svg-icon>
        </i>
        <i v-if="newSong.mv !== 0" class="redColor" style="font-size:38px">
          <svg-icon icon-class="song_mv"></svg-icon>
        </i>
        <div class="ar_con">
          <div v-for="(item,index) in newSong.arList" :key="item.id" class="textOverflowElli">
            <span
              class="ar_name"
              @click="$router.push({ name: 'PersonalizedArtist', params: { id:item.id }})"
            >{{item.name}}</span>
            <span v-if="index +1 !== newSong.arList.length">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
          </div>
        </div>
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
    _newSongAr() {
      this.newSong.arList.map((e, i) => {
        return e.name;
      });
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .left {
    width: 47px;
    border: 1px solid #cccccc;
    height: 100%;
    border-radius: 5px;
    position: relative;
    &:hover {
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
    width: calc(100% - 47px);
    padding-left: 10px;
    height: 100%;
    &:hover {
      background-color: #eaeaea;
    }
    .song_name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .song_intro {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      transform: translateY(-5px);
      line-height: 30px;
      .redColor {
        color: #ec4141;
        margin-right: 3px;
        font-size: 30px;
        line-height: 0;
      }
      .ar_con {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #9f9f9f;
        .ar_name {
          &:hover {
            cursor: pointer;
            color: #5f5f5f;
          }
        }
      }
    }
  }
}
</style>