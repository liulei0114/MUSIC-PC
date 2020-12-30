<template>
  <div>
    <transition name="el-fade-in">
      <div id="GlobalMessage" :style="{width:width}" v-show="isShow">
        <div>{{message}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      message: "",
      timeout: null,
      _debouncedCancelShow: null,
    };
  },
  props: {
    // 宽
    width: {
      type: String,
      default: "267px",
    },
  },
  methods: {
    show(message) {
      this.isShow = true;
      this.message = message;
      if (!this._debouncedCancelShow) {
        this._debouncedCancelShow = this._.debounce(this.cancelShow, 500);
      }
      this._debouncedCancelShow();
    },
    cancelShow() {
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, 1500);
    },
  },
};
</script>

<style lang="less">
#GlobalMessage {
  overflow: hidden;
  padding: 18px 15px;
  border-radius: 5px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 14px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3000;
  font-weight: 600;
}
</style>