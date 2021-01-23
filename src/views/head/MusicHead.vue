<template>
  <div id="MusicHead">
    <div class="head_left">
      <div class="logo_wrap" @click="$router.push('/')">
        <img src="~assets/format.png" alt />
        <span></span>
      </div>
      <div class="direc_wrap">
        <direction-nav direction="left" @click.native="$router.go(-1)"></direction-nav>
        <direction-nav direction="right"></direction-nav>
      </div>
      <div class="search_wrap">
        <span>
          <svg-icon icon-class="search" style="color:#fff"></svg-icon>
        </span>
        <input type="text" placeholder="搜索" v-model="keyword" />
      </div>
      <div class="mic_wrap">
        <svg-icon icon-class="mic"></svg-icon>
      </div>
    </div>
    <div class="head_right">
      <div class="login_wrap">
        <div class="head_img">
          <img :src="headUrl" alt />
        </div>
        <div class="login_status">
          <span @click="openLoginDialog" v-if="nickName === ''" class="ls">
            <span>未登录</span>
          </span>
          <span v-else class="nickName ls" @click.stop="mineDown">{{nickName}}</span>
          <i class="down" @click.stop="mineDown">
            <svg-icon icon-class="arrow-down-filling"></svg-icon>
          </i>
          <transition name="el-zoom-in-top">
            <mine ref="mineWrap" class="mine" v-if="mineShow" v-model="mineShow"></mine>
          </transition>
        </div>
        <span class="login_status open_vip">开通VIP</span>
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
  </div>
</template>

<script>
import Mine from "../home/main/childComponents/Mine.vue";
import DirectionNav from "./childComponents/DirectionNav.vue";
const modifHeadUrl =
  "https://p3.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg";

export default {
  data() {
    return {
      keyword: "",
      userProfile: this.$store.state.userProfile,
      mineShow: false,
    };
  },
  computed: {
    headUrl() {
      return this._.isEmpty(this.$store.getters.userProfile)
        ? modifHeadUrl
        : this.$store.getters.userProfile.avatarUrl;
    },
    nickName() {
      return this._.isEmpty(this.$store.getters.userProfile)
        ? ""
        : this.$store.getters.userProfile.nickname;
    },
  },

  methods: {
    // ? 打开登录窗口dialog
    openLoginDialog() {
      if (!this.$store.getters.loginDialogStatus) {
        this.$store.commit("loginModule/SET_LOGIN_DIALOG_STATUS", true);
      }
    },
    // ? 关闭登录窗口dialog
    closeWindow() {
      window.electron.ipcRenderer.send("window-close");
    },
    // ? 从local中拿用户信息
    getLocalStorage() {
      return JSON.parse(localStorage.getItem("profile"));
    },
    // ? 下拉
    mineDown() {
      if (this.nickName !== "" && !this.mineShow) {
        this.mineShow = true;
      } else {
        this.mineShow = false;
      }
    },

  },
  components: {
    DirectionNav,
    Mine,
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
  -webkit-app-region: drag;
  .head_left {
    display: flex;
    justify-content: left;
    align-items: center;
    .logo_wrap {
      margin-left: 30px;
      height: 100%;
      display: flex;
      justify-content: left;
      align-items: center;
      margin-right: 80px;
      -webkit-app-region: no-drag;
      &:hover{
        cursor: pointer;
      }
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
  }
  .head_right {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-left: auto;
    .login_wrap {
      margin-left: auto;
      display: flex;
      justify-content: right;
      align-content: center;
      -webkit-app-region: no-drag;
      .head_img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        text-align: center;
        font-size: 25px;
        line-height: 25px;
        margin-right: 10px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          vertical-align: unset;
        }
      }
      .login_status {
        color: #fbd9d9;
        font-size: 12px;
        line-height: 25px;
        position: relative;
        &:nth-child(2) {
          margin-right: 10px;
        }
        .ls:hover {
          cursor: pointer;
          color: #ffffff;
        }
        .mine {
          position: absolute;
          top: 50px;
          left: -100px;
        }
      }
      .open_vip:hover {
        cursor: pointer;
        color: #ffffff;
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
      margin-right: 20px;
      -webkit-app-region: no-drag;
      cursor: pointer;
    }
  }
}
</style>