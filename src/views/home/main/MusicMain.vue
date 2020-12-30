<template>
  <div id="MusicMain">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
 
};
</script>

<style lang="less" scoped>
#MusicMain {
  width: 100%;
  height: 100%;
  background-color: var(--mainBgColor);
  /deep/ .el-loading-spinner i{
    color: #ec4141;
  }
  /deep/ .el-loading-text{
    color: #ec4141;
  }
}
</style>