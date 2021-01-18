<template>
  <div id="FindMusicWrap">
    <header>
      <span @click="handelTypeCheck(1)" :class="{typeFontBig: curCheckTypeIndex === 1}">
        个性推荐
        <i :class="{typeCheck: curCheckTypeIndex === 1}"></i>
      </span>
      <span @click="handelTypeCheck(2)" :class="{typeFontBig: curCheckTypeIndex === 2}">
        歌单
        <i :class="{typeCheck: curCheckTypeIndex === 2}"></i>
      </span>
      <span @click="handelTypeCheck(3)" :class="{typeFontBig: curCheckTypeIndex === 3}">
        主播电台
        <i :class="{typeCheck: curCheckTypeIndex === 3}"></i>
      </span>
      <span @click="handelTypeCheck(4)" :class="{typeFontBig: curCheckTypeIndex === 4}">
        排行榜
        <i :class="{typeCheck: curCheckTypeIndex === 4}"></i>
      </span>
      <span @click="handelTypeCheck(5)" :class="{typeFontBig: curCheckTypeIndex === 5}">
        歌手
        <i :class="{typeCheck: curCheckTypeIndex === 5}"></i>
      </span>
      <span @click="handelTypeCheck(6)" :class="{typeFontBig: curCheckTypeIndex === 6}">
        最新音乐
        <i :class="{typeCheck: curCheckTypeIndex === 6}"></i>
      </span>
    </header>
    <happy-scroll color="#e0e0e0" size="8" :resize="true" :hide-horizontal="true">
      <div class="con" id="FindMusicPoint">
        <article>
          <router-view></router-view>
        </article>
      </div>
    </happy-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curCheckTypeIndex: 1,
      scrollTop: 0,
    };
  },
  created() {
    this.curCheckTypeIndex = this.$route.meta.index;
  },

  watch: {},
  methods: {
    handelTypeCheck(index) {
      this.curCheckTypeIndex = index;
      switch (index) {
        case 1:
          this.$router.push("/find/music/alization");
          return;
        case 2:
          this.$router.push("/find/music/songlist");
          return;
        case 3:
          this.$router.push("/find/music/dj");
          return;
        case 4:
          this.$router.push("/find/music/rank");
          return;
        case 5:
          this.$router.push("/find/music/artist");
          return;
        case 6:
          this.$router.push("/find/music/new");
          return;
      }
    },
    getTime() {
      return new Date().valueOf();
    },
  },
  components: {},
};
</script>
    

<style lang="less" scoped>
#FindMusicWrap {
  width: 100%;
  height: 100%;
  .happy-scroll {
    height: calc(100% - 55px) !important;
    /deep/ .happy-scroll-container {
      width: 100% !important;
      height: 485px !important;
      .happy-scroll-content {
        width: 100%;
        border-right: 10px !important;
      }
    }
  }
  header {
    padding: 10px 20px 10px;
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: left;
    align-items: center;
    color: #373737;
    position: sticky;
    background-color: #fff;
    z-index: 100;
    top: 0;
    left: 0;
    span {
      height: 100%;
      padding: 0 15px;
      position: relative;
      line-height: 35px;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
      &.typeFontBig {
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }
      .typeCheck {
        position: absolute;
        width: 50%;
        height: 3px;
        background-color: #ec4141;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .con {
    width: 100%;
    height: 100%;
    position: relative;

    article {
      width: 100%;
      height: 100%;
      // padding: 10px 20px 0;
    }
  }
}
</style>