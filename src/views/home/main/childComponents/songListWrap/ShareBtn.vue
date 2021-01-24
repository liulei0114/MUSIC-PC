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
import { number2wan } from '@/util/NumberTransfrom'
export default {
  props: {
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    isCreated: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    textCon: {
      type: String,
      default: '',
    },
  },
  computed: {
    isForBid() {
      let temp = {
        'border-color': '#d8d8d8',
      }
      // 自创建的
      if (this.isCreated) {
        temp.cursor = 'default'
        temp.color = '#d8d8d8'
        temp.backgroundColor = '#fff'
        return temp
      }
      if (this.isSubscribed) {
        // 收藏
        temp.cursor = 'pointer'
        temp.color = '#373737'
        return temp
      }
      return temp
    },
  },
  filters: {
    filterCount(value) {
      if (typeof value === 'undefined') return
      return number2wan(value)
    },
  },
}
</script>

<style lang="less" scoped>
.ShareBtn {
  height: 35px;
  margin-right: 10px;
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
    color: #373737;
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