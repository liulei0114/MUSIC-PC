<template>
  <div class="RankSonglistDetail">
    <div class="left" @click="goMore()">
      <img v-lazy="rankSonglistItem.picUrl" alt width="170" height="170" />
      <div class="play">
        <i style="margin-left:5px">
          <svg-icon icon-class="play" style="color:#ec4141"></svg-icon>
        </i>
      </div>
      <div class="update_time">{{rankSonglistItem.updateTime}}</div>
    </div>
    <div class="right">
      <div v-for="(item,index) in rankSonglistItem.list" :key="item.id" class="item_con" @click="handleDetail(item)">
        <span class="normalIndex" :class="{index:index+1<=3?true:false}">{{index + 1}}</span>
        <span class="name">{{item.name}}</span>
        <div class="ar_con" v-if="item.ar">
          <div class="ar" v-for="(songer,i) in item.ar" :key="songer.id">
            <span class="ar_name">{{songer.name}}</span>
            <span v-if="i+1 !== item.ar.length">&nbsp;&nbsp;/</span>
          </div>
        </div>
      </div>
      <div class="more" @click="goMore()">
        <span>查看全部</span>
        <i>
          <svg-icon icon-class="arrow-right"></svg-icon>
        </i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rankSonglistItem: {
      type: Object,
      default: () => {},
    },
    isSonger: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goMore() {
      if (this.isSonger) {
        this.$router.push('/find/music/artist')
      } else {
        this.$router.push({
          name: "PersonalizedSongList",
          params: { id: this.rankSonglistItem.id },
        });
      }
    },
    handleDetail(item){
      if (this.isSonger) {
        this.$router.push({name:'PersonalizedArtist',params:{id:item.id}})
      } else {
        
      }
    }
  },
};
</script>
<style lang="less" scoped>
.RankSonglistDetail {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 12px;
  margin-bottom: 30px;
  &:hover {
    cursor: default;
  }
  .left {
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    &:hover {
      cursor: pointer;
      .play {
        opacity: 1;
      }
    }
    .play {
      position: absolute;
      overflow: hidden;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      text-align: center;
      font-size: 25px;
      line-height: 50px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.5);
      opacity: 0;
      transition: opacity 0.7s;
    }
    .update_time {
      position: absolute;
      left: 50%;
      top: 70%;
      transform: translate(-50%,-50%);
      color: #fff;
      font-size: 12px;
    }
  }
  .right {
    flex: 1;
    margin-left: 40px;
    .item_con {
      padding-left: 10px;
      display: flex;
      height: 35px;
      justify-content: flex-start;
      align-items: center;
      border-radius: 5px;
      .normalIndex {
        color: #9b9b9b;
        font-size: 14px;
      }
      .index {
        color: #ec6741;
      }
      .name {
        margin-left: 15px;
      }
      .ar_con {
        margin-left: auto;
        margin-right: 10px;
        color: #9b9b9b;
        .ar {
          display: inline-block;
          .ar_name {
            cursor: pointer;
            &:hover {
              color: #333;
            }
          }
        }
      }

      &:nth-child(odd) {
        background-color: #f9f9f9;
      }
      &:hover {
        cursor: pointer;
        background-color: #f4f4f4;
      }
    }
    .more {
      margin: 10px;
      color: #9b9b9b;
      display: inline-block;
      &:hover {
        color: #333;
        cursor: pointer;
      }
    }
  }
}
</style>