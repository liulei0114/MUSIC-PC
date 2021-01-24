<template>
  <div id="HeadDirectNav">
    <div v-if="isLeft" class="nav_contain">
      <svg-icon icon-class="arrow-left" style="color:#fff"></svg-icon>
    </div>
    <div v-else class="nav_contain">
      <svg-icon icon-class="arrow-right" style="color:#fff"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    isLeft() {
      return this.direction === 'left' ? true : false
    },
  },
  props: {
    direction: {
      type: String,
    },
  },
}
</script>

<style lang="less" scoped>
#HeadDirectNav {
  .nav_contain {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.1);
    text-align: center;
    line-height: 25px;
    font-size: 12px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>