<template>
  <div id="FindMusicWrap">
    <happy-scroll color="#e0e0e0" size="8" :resize="true" :hide-horizontal="true">
      <div class="con">
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
            音乐
            <i :class="{typeCheck: curCheckTypeIndex === 6}"></i>
          </span>
        </header>

        <article>
          <div v-show="curCheckTypeIndex === 1">
            <person-alization-wrap></person-alization-wrap>
          </div>
        </article>
      </div>
    </happy-scroll>
  </div>
</template>

<script>
import PersonAlizationWrap from "./personalization/PersonAlizationWrap.vue";
export default {
  data() {
    return {
      curCheckTypeIndex: 1,
    };
  },
  created() {},
  methods: {
    handelTypeCheck(index) {
      this.curCheckTypeIndex = index;
    },
  },
  components: {
    PersonAlizationWrap,
  },
};
</script>

<style lang="less" scoped>
#FindMusicWrap {
  width: 100%;
  height: 100%;
  .happy-scroll {
    /deep/ .happy-scroll-container {
      width: 100% !important;
      height: 100% !important;
      .happy-scroll-content {
        width: 100%;
      }
    }
  }
  .con {
    width: 100%;
    height: 100%;
    header {
      padding: 10px 20px 0;
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: left;
      align-items: center;
      color: #373737;
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
    article {
      width: 100%;
      height: 100%;
      padding: 10px 20px 0;
    }
  }
}
</style>