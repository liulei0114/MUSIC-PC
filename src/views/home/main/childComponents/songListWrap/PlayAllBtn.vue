<template>
  <div id="PlayAllBtn">
    <div class="left">
      <i class="play">
        <svg-icon icon-class="play"></svg-icon>
      </i>
      <span>播放全部</span>
    </div>
    <div class="right">
      <i class="add">
        <svg-icon icon-class="add-fff"></svg-icon>
      </i>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#PlayAllBtn {
  width: 150px;
  height: 35px;
  background-color: #ec4141;
  border-radius: 20px;
  color: #fff;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  margin-right: 10px;
  .left {
    width: 105px;
    height: 100%;
    border-right: 1px solid #f6a9a9;
    .play {
      margin: 0 10px;
    }
    span {
      height: 100%;
      line-height: 35px;
      font-size: 14px;
    }
    &:hover {
      background-color: #cc3232;
      cursor: pointer;
    }
  }
  .right {
    height: 100%;
    flex: 1;
    line-height: 35px;
    text-align: center;
    padding-right: 5px;
    &:hover {
      background-color: #cc3232;
      cursor: pointer;
    }
  }
}
</style>