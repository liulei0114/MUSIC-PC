<template>
  <div class="ShareBtn">
    <div class="normal" :style="isForBid">
      <i>
        <svg-icon :icon-class="icon"></svg-icon>
      </i>
      <span>{{textCon}}</span>
    </div>
  </div>
</template>

<script>
import { number2wan } from "@/util/NumberTransfrom";
export default {
  props: {
    groupBy: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    textCon: {
      type: String,
      default: "",
    },
  },
  computed: {
    isForBid() {
      if (this.groupBy === "") return;
      let temp = {};
      if (this.groupBy === "2") {
        // 收藏禁用
        temp.background = "#fff";
        temp.cursor = "default";
        temp.color = "#d8d8d8";
        temp.borderColor = "#d8d8d8";
      }
      return temp;
    },
  },
  filters: {
    filterCount(value) {
      if (typeof value === "undefined") return;
      return number2wan(value);
    },
  },
};
</script>

<style lang="less" scoped>
.ShareBtn {
  height: 35px;
  margin-left: 10px;
  border-radius: 20px;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  overflow: hidden;
  font-size: 14px;
  .forBid {
    color: #b2b2b2;
    &:hover {
      cursor: not-allowed;
    }
  }
  .normal {
    padding: 0 10px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-wrap: nowrap;
    i {
      margin-right: 5px;
      font-size: 18px;
    }
    &:hover {
      background-color: #f2f2f2;
      cursor: pointer;
    }
  }
}
</style>