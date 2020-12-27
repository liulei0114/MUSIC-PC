<template>
  <div id="MusicHead">
    <div class="logo">
      <img src="~assets/format.png" alt />
      <span>网易云音乐</span>
    </div>
    <div class="direc_wrap">
      <direction-nav direction="left"></direction-nav>
      <direction-nav direction="right"></direction-nav>
    </div>
  </div>
</template>

<script>
import DirectionNav from "./childComponents/DirectionNav.vue";
export default {
  data() {
    return {};
  },
  components: {
    DirectionNav,
  },
};
</script>

<style lang="less" scoped>
#MusicHead {
  width: 100%;
  height: 100%;
  background-color: var(--headBgColor);
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  .logo {
    margin-left: 30px;
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    margin-right: 80px;
    img {
      width: 25px;
      height: 25px;
      padding: 3px;
      border-radius: 50%;
      background-color: #fff;
    }
    span {
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      margin-left: 10px;
    }
  }
  .direc_wrap {
    width: 60px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
}
</style>