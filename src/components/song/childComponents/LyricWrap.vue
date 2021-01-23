<template>
  <div id="LyricWrap">
    <happy-scroll color="#e0e0e0" size="8" :resize="true" :hide-horizontal="true">
      <div class="lyric_con">
        <div v-for="(item,index) in lyric" :key="index">{{item.substring(11)}}</div>
      </div>
    </happy-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    lyric: {
      type: Array,
      default: () => [],
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
#LyricWrap {
  width: 100%;
  height: 100%;
  position: relative;
  .happy-scroll {
    /deep/ .happy-scroll-container {
      width: 100% !important;
      height: 100% !important;
      .happy-scroll-content {
        width: 100%;
      }
    }
  }
  .lyric_con {
    width: 100%;
    height: 100%;
    div {
      height: 35px;
      padding: 0 0 15px 0;
      font-size: 14px;
      color: #666666;
    }
  }
}
</style>