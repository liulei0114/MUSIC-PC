<template>
  <div id="MusicMain">
    <router-view :key="getTime()"></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    getTime(){
      return (new Date()).valueOf()
    }
  },
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