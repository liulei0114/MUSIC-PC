<template>
  <div class="TopAlbumDetail">
    <div
      v-for="(itemList,key,index) in albumRecommendMap"
      :key="key"
      class="top_con"
      :class="{changBg:index === scrollIndex }"
    >
      <div class="date_con">
        <div :class="{sticky:index === scrollIndex}">
          <span class="month" :class="{special:key === '本周新碟'}">{{key | filterMonth}}</span>
          <span class="year">{{key | filterYear}}</span>
        </div>
      </div>
      <div class="album_con">
        <album-info v-for="item in itemList" :key="item.id" :albumInfo="item"></album-info>
      </div>
    </div>
  </div>
</template>

<script>
import AlbumInfo from "./AlbumInfo.vue";
export default {
  components: { AlbumInfo },
  data() {
    return {
      contentOffsetHeight: null,
      initLock: false,
      albumHeights: [],
      scrollIndex: 0,
      scrollFlag: true,
      start: 0,
    };
  },
  props: {
    albumRecommendMap: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    albumRecommendMap(newValue) {
      if (Object.keys(newValue).length === 0) {
        this.initLock = false;
        this.albumHeights = [];
        this.scrollIndex = 0;
        this.scrollFlag = true;
        this.start = 0;
      }
      this.$nextTick(() => {
        let contain = document
          .querySelector("#FindMusicWrap")
          .querySelector(".happy-scroll-container");
        let content = contain.children[0];
        this.contentOffsetHeight = content.offsetHeight;
        this.initLock = false;
        this.getAlbumHeightList();
      });
    },
  },
  mounted() {
    let contain = document
      .querySelector("#FindMusicWrap")
      .querySelector(".happy-scroll-container");
    contain.addEventListener("scroll", () => {
      this.handleScroll(contain);
    });
  },
  methods: {
    handleScroll(contain) {
      let scrollTop = contain.scrollTop - 125;
      if (this.contentOffsetHeight - scrollTop <= 485 * 2) {
        if (!this.initLock) {
          // 加锁
          this.initLock = true;
          // 通知父组件，加载上一月份
          this.$emit("initPreMonth");
        }
      }
      // 判断滚动区域
      if (scrollTop >= 0) {
        if (this.scrollFlag) {
          if (
            scrollTop >= this.start &&
            scrollTop <= this.start + this.albumHeights[this.scrollIndex]
          ) {
            this.scrollFlag = false;
            this.start = this.start + this.albumHeights[this.scrollIndex];
          }
        } else {
          if (scrollTop > this.start) {
            this.scrollFlag = true;
            this.scrollIndex++;
          } else {
            // 没有滚出当前进入下一个
            if (scrollTop < this.start - this.albumHeights[this.scrollIndex]) {
              this.start = this.start - this.albumHeights[this.scrollIndex];
              this.scrollIndex--;
            }
          }
        }
      }
    },
    getAlbumHeightList() {
      this.albumHeights = [];
      let topCon = document.querySelector(".TopAlbumDetail").children;
      Array.from(topCon).forEach((e, i) => {
        this.albumHeights.push(e.offsetHeight);
      });
    },
  },
  filters: {
    filterMonth(value) {
      if (value === "本周新碟") {
        return value;
      }
      let month = value.split("-")[0];
      if (month <= 9) {
        return "0" + month;
      } else {
        return month;
      }
    },
    filterYear(value) {
      if (value === "本周新碟") {
        return "";
      }
      return value.split("-")[1];
    },
  },
};
</script>

<style lang="less" scoped>
.TopAlbumDetail {
  width: 100%;
  .top_con {
    padding: 0 20px;

    &.changBg {
      background-color: #f9f9f9;
    }
    width: 100%;
    display: flex;
    justify-content: flex-start;
    .date_con {
      width: 40px;
      margin-right: 10px;
      padding-bottom: 18px;

      .sticky {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 10;
      }
      .month {
        font-size: 30px;
        color: #373737;
        display: block;
        &.special {
          font-size: 16px;
        }
      }
      .year {
        font-size: 14px;
        color: #676767;
      }
    }
    .album_con {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }
}
</style>