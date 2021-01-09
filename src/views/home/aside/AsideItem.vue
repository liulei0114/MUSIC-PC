<template>
  <div class="aside_item">
    <div class="item_wrap" :class="checkClass">
      <div class="icon" v-if="itemMenu.icon !== ''">
        <svg-icon :icon-class="itemMenu.icon"></svg-icon>
      </div>
      <div class="text">{{itemMenu.text}}</div>
      <div class="textIcon" v-if="itemMenu.textIcon !== ''">
        <svg-icon :icon-class="itemMenu.textIcon"></svg-icon>
      </div>
      <div class="optionIcon" v-if="itemMenu.optionIcon !== ''">
        <svg-icon :icon-class="itemMenu.optionIcon"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    itemMenu: {
      type: Object,
      default: {},
    },
  },
  computed: {
    checkClass() {
      let temp = {};
      let flag =
        this.$route.path.indexOf(this.itemMenu.path) !== -1 ? true : false;
      if (this.itemMenu.type !== "head") {
        flag ? (temp.check = true) : (temp.check = false);
      } else {
        temp.head = true;
      }
      return temp;
    },
  },
};
</script>

<style lang="less">
.aside_item {
  height: 40px;
  width: 100%;
  padding-left: 5px;
  padding-right: 13px;
  margin: 3px 0;
  .item_wrap {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    font-size: 15px;
    color: #333;
    padding-left: 5px;

    &:hover {
      cursor: pointer;
      background-color: #f6f6f7;
    }

    .icon {
      margin-right: 10px;
      font-size: 16px;
    }
    .text {
      margin-right: 5px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .textIcon {
      font-size: 10px;
    }
    .optionIcon {
      margin-left: auto;
      margin-right: 5px;
    }
  }
  .check {
    background-color: #f6f6f7;
    font-size: 16px;
    font-weight: 600;
    .optionIcon {
      font-size: 15px;
    }
  }
  .head {
    color: #9f9f9f;
    font-size: 14px;
    &:hover {
      cursor: pointer;
      background-color: #fff;
    }
    .optionIcon {
      font-size: 10px;
    }
  }
}
</style>