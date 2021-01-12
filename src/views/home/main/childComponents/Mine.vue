<template>
  <div id="Mine">
    <div class="head_wrap">
      <div class="type_count">
        <div>
          <p>{{eventCount}}</p>
          <p>动态</p>
        </div>
        <div>
          <p>{{follows}}</p>
          <p>关注</p>
        </div>
        <div>
          <p>{{followeds}}</p>
          <p>粉丝</p>
        </div>
      </div>
      <div class="sign">
        <i>
          <svg-icon icon-class="sign"></svg-icon>
        </i>
        <span>签到</span>
      </div>
    </div>
    <div class="vip_wrap">
      <div class="item_wrap_normal">
        <p class="item_normal">
          <i>
            <svg-icon icon-class="huiyuan"></svg-icon>
          </i>
          <span>会员中心</span>
        </p>
        <p class="item_normal">
          <i>
            <svg-icon icon-class="dengji"></svg-icon>
          </i>
          <span>等级</span>
        </p>
        <p class="item_normal">
          <i>
            <svg-icon icon-class="shopping"></svg-icon>
          </i>
          <span>商城</span>
        </p>
      </div>
    </div>
    <div class="social_wrap">
      <div class="item_wrap_normal">
        <p class="item_normal">
          <i>
            <svg-icon icon-class="gereninfo"></svg-icon>
          </i>
          <span>个人信息设置</span>
        </p>
        <p class="item_normal">
          <i>
            <svg-icon icon-class="shejiao"></svg-icon>
          </i>
          <span>绑定社交账号</span>
        </p>
      </div>
    </div>
    <div class="logout_wrap">
      <div class="item_wrap_normal">
        <p @click="handelLogOut" class="item_normal">
          <i>
            <svg-icon icon-class="log-out"></svg-icon>
          </i>
          <span>退出登录</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import { loadingMixin } from "@/mixin/loadingMixin";
export default {
  mixins: [loadingMixin],
  data() {
    return {
      loadingInstance: null,
      loadingOptions: {
        target: "#MusicMain",
        text: "拼命加载中",
        background: "rgba(0, 0, 0, 0.7)",
        spinner: "el-icon-loading",
      },
    };
  },
  props: {
    value: Boolean,
  },
  computed: {
    eventCount() {
      return this.$store.getters.userProfile
        ? this.$store.getters.userProfile.eventCount
        : 0;
    },
    follows() {
      return this.$store.getters.userProfile
        ? this.$store.getters.userProfile.follows
        : 0;
    },
    followeds() {
      return this.$store.getters.userProfile
        ? this.$store.getters.userProfile.followeds
        : 0;
    },
  },
  mounted() {
    this.addAppClickEventListener();
  },
  destroyed() {
    this.removeAppClickEventListener();
  },
  methods: {
    // ? 处理退出登录
    handelLogOut() {
      this.$store.dispatch("loginModule/LoginOut").then((result) => {
        this.$emit("input", !this.value);
        this.$router.push("/");
      });
    },
    // ? 添加监听
    addAppClickEventListener() {
      // 组件初始化添加事件监听
      document
        .getElementById("app")
        .addEventListener("click", this.handleClickEvent);
    },
    // ? 移除监听
    removeAppClickEventListener() {
      document
        .getElementById("app")
        .removeEventListener("click", this.handleClickEvent);
    },
    // ? 监听处理函数
    handleClickEvent(e) {
      let refClick = document.getElementById("Mine").contains(e.target); // 包含自身
      if (!refClick) {
        this.$emit("input", !this.value);
      }
    },
  },
};
</script>

<style lang="less">
#Mine {
  width: 285px;
  height: 400px;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  z-index: 40;
  display: flex;
  flex-direction: column;
  color: #333;
  font-size: 15px;
  .item_wrap_normal {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: left;
  }
  .item_normal {
    font-size: 15px;
    width: 100%;
    height: 35px;
    padding: 5px 20px;
    cursor: pointer;
    display: flex;
    justify-content: left;
    align-items: center;
    &:hover {
      background-color: #f0f1f2;
    }
    i {
      font-size: 20px;
    }
    span {
      margin-left: 10px;
    }
  }

  .head_wrap {
    width: 100%;
    height: 125px;
    border-bottom: 1px solid #d8d8d8;
    padding: 20px 0;
    background-color: #fff;
    .type_count {
      display: flex;
      justify-content: left;
      align-items: center;
      div {
        flex: 1;
        text-align: center;
        p:first-child {
          font-size: 18px;
          font-weight: 700;
        }
        p:last-child {
          color: #676767;
          font-size: 14px;
        }
      }
    }
    .sign {
      width: 90px;
      height: 30px;
      border: 1px solid #d8d8d8;
      border-radius: 20px;
      margin: 10px auto 0;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      i {
        margin-right: 5px;
        color: #656565;
      }
      &:hover {
        color: #333;
        background-color: #f2f2f2;
        cursor: pointer;
      }
    }
  }
  .vip_wrap {
    width: 100%;
    height: 130px;
    border-bottom: 1px solid #d8d8d8;
  }
  .social_wrap {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #d8d8d8;
  }
  .logout_wrap {
    flex: 1;
    width: 100%;
  }
}
</style>