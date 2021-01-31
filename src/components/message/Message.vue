<template>
  <div>
    <transition name="el-fade-in">
      <div id="GlobalMessage" :style="{width:width}" v-show="isShow">
        <div class="message">
          <i v-if="iconName" style="margin-right:10px" :style="{fontSize:fontSize}">
            <svg-icon :icon-class="iconName"></svg-icon>
          </i>
          <span v-html="message"></span>
        </div>
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
      iconName: "",
      fontSize:''
    };
  },
  props: {
    // 宽
    width: {
      type: String,
      default: "",
    },

  },
  created(){
  },
  methods: {
    show(message, iconName,fontSize='16px') {
      this.isShow = true;
      this.message = message;
      this.iconName = iconName;
      this.fontSize = fontSize;
      if (!this._debouncedCancelShow) {
        this._debouncedCancelShow = this._.debounce(this.cancelShow, 1500);
      }
      this._debouncedCancelShow();
    },
    cancelShow() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="less">
#GlobalMessage {
  overflow: hidden;
  padding: 15px 20px;
  border-radius: 5px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3000;
  font-weight: 600;
  font-size: 16px;
  .message {
    text-align: center;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>