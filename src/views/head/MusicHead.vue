<template>
  <div id="MusicHead">
    <div class="logo">
      <!-- <img src="assets/format.png" alt /> -->
      <div></div>
      <svg-icon icon-class="add"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // logoImg: require('@/assets/format.png')
    };
  },
};
</script>

<style lang="less" scoped>
#MusicHead {
  width: 100%;
  height: 100%;
  background-color: var(--headBgColor);
  display: flex;
  justify-content: left;
  align-items: center;
  .logo{
    // background: url('~assets/iconall.png');
  }
}

</style>