<template>
  <div class="SongListDetail">
    <div class="body">
      <div class="title flexTable">
        <span>音乐标题</span>
        <span>歌手</span>
        <span>专辑</span>
        <span>时长</span>
      </div>
      <!-- 不是会员 -->
      <div v-if="userProfile.vipType === 0" class="vip_buy_info">
        <i></i>
        <span>含{{vipCount}}首vip专享歌曲</span>
        <span>首开VIP仅5元</span>
      </div>
      <div class="list_con">
        <song-list-item
          v-for="(item,index) in songList"
          :key="item.id"
          :index="index+1"
          :songItem="item"
        ></song-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import SongListItem from "./SongListItem.vue";
import { mapGetters } from "vuex";
export default {
  components: { SongListItem },
  data() {
    return {
      typeIndex: 1,
    };
  },
  props: {
    songList: {
      type: Array,
      default() {
        return [];
      },
    },
    subscribedCount: {
      type: Number,
      default: 0,
    },
    vipCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({ userProfile: "userProfile" }),
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.SongListDetail {
  width: 100%;
  height: 100%;

  .body {
    .title {
      font-size: 13px;
      color: #807e7e;
      margin: 20px 0 10px;
      span:nth-child(1) {
        margin-left: 120px;
      }
      span:nth-child(2) {
        margin-left: 248px;
      }
      span:nth-child(3) {
        margin-left: 112px;
      }
      span:nth-child(4) {
        margin-left: 175px;
      }
    }
    .flexTable {
      display: flex;
      justify-content: left;
      align-items: center;
    }
    .vip_buy_info {
      display: flex;
      justify-content: left;
      align-items: center;
      background-color: #f2f2f2;
      height: 30px;
      font-size: 14px;
      color: #333;
      i {
        width: 18px;
        height: 15px;
        background: no-repeat url("~assets/vipmusic.png");
        margin-left: 20px;
      }
      span:nth-child(2) {
        margin-left: 10px;
      }
      span:nth-child(3) {
        margin-left: 50px;
        color: #807e7e;
        font-size: 12px;
      }
    }
  }
}
</style>