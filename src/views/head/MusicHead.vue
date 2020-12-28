<template>
  <div id="MusicHead">
    <div class="logo_wrap">
      <img src="~assets/format.png" alt />
      <span></span>
    </div>
    <div class="direc_wrap">
      <direction-nav direction="left"></direction-nav>
      <direction-nav direction="right"></direction-nav>
    </div>
    <div class="search_wrap">
      <span>
        <svg-icon icon-class="search"></svg-icon>
      </span>
      <input type="text" placeholder="搜索" v-model="keyword" />
    </div>
    <div class="mic_wrap">
      <svg-icon icon-class="mic"></svg-icon>
    </div>
    <div class="login_wrap">
      <div class="head_img" @click="openLoginDialog">
        <svg-icon icon-class="user"></svg-icon>
      </div>
      <span class="login_status" @click="openLoginDialog">
        <span>未登录</span>
        <i class="down">
          <svg-icon icon-class="arrow-down-filling"></svg-icon>
        </i>
      </span>
      <span class="vip">开通VIP</span>
      <span class="setting">
        <svg-icon icon-class="setting"></svg-icon>
      </span>
      <span class="clothes">
        <svg-icon icon-class="clothes"></svg-icon>
      </span>
      <span class="letter">
        <svg-icon icon-class="letter"></svg-icon>
      </span>
    </div>
    <div class="close_wrap">
      <i @click="closeWindow">
        <svg-icon icon-class="close"></svg-icon>
      </i>
    </div>
  </div>
</template>

<script>
import DirectionNav from "./childComponents/DirectionNav.vue";
const ipc = require('electron').ipcRenderer;
export default {
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    // 打开登录窗口dialog
    openLoginDialog() {
      console.log("dfdf");
      if (!this.$store.getters.loginDialogStatus) {
        this.$store.commit("loginModule/SET_LOGIN_DIALOG_STATUS", true);
      }
    },
    closeWindow() {
      ipc.send('window-close');
    },
  },
  components: {
    DirectionNav,
  },
};
</script>

<style lang="less" scoped>
#MusicHead {
  width: 100%;
  height: 100%;
  background-color: var(--headBgColor);
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  -webkit-app-region: drag;
  .logo_wrap {
    margin-left: 30px;
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    margin-right: 80px;
    -webkit-app-region: no-drag;
    img {
      width: 25px;
      height: 25px;
      padding: 3px;
      border-radius: 50%;
      background-color: #fff;
      -webkit-app-region: no-drag;
    }
    span {
      width: 118px;
      height: 22px;
      background: no-repeat url("~assets/topbar.png") -40px -25px;
      margin-left: 10px;
    }
  }
  .direc_wrap {
    width: 60px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    -webkit-app-region: no-drag;
  }
  .search_wrap {
    height: 35px;
    margin-left: 20px;
    border-radius: 20px;
    padding: 0 30px;
    background-color: #e13e3e;
    -webkit-app-region: no-drag;
    input {
      height: 100%;
      border: none;
      width: 120px;
      font-size: 14px;
      background-color: #e13e3e;
      color: #fff;
      margin-left: 10px;
      &::placeholder {
        color: #e76464;
      }
    }
    span {
      margin-left: -15px;
      font-size: 15px;
    }
  }
  .mic_wrap {
    margin-left: 15px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #e23e3e;
    text-align: center;
    line-height: 25px;
    font-size: 20px;
    -webkit-app-region: no-drag;
  }
  .login_wrap {
    margin-left: 90px;
    display: flex;
    justify-content: left;
    align-content: center;
    -webkit-app-region: no-drag;
    .head_img {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #e0e0e0;
      text-align: center;
      font-size: 25px;
      line-height: 25px;
      margin-right: 10px;
    }
    .login_status,
    .vip {
      color: #fbd9d9;
      font-size: 12px;
      line-height: 25px;
      &:nth-child(2) {
        margin-right: 10px;
      }
      &:hover {
        cursor: pointer;
        color: #ffffff;
      }
    }
    .setting,
    .clothes,
    .letter {
      font-size: 20px;
      margin-left: 20px;
    }
  }
  .close_wrap {
    color: #fff;
    font-size: 20px;
    margin-left: 60px;
    -webkit-app-region: no-drag;
  }
}
</style>