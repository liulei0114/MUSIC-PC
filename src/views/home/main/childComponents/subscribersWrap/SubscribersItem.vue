<template>
  <div class="SubscribersItem flexL">
    <div class="head_url">
      <img v-lazy="headUrl" alt />
    </div>
    <div class="user_info">
      <div class="info_con">
        <div class="nickname">
          <span class="textOverflowElli">{{subscrbersItem.nickname}}</span>
          <span>
            <i class="gender" style="background-color: #c0f3ff;" v-if="subscrbersItem.gender === 1">
              <svg-icon icon-class="sex_man"></svg-icon>
            </i>
            <i class="gender" style="background-color: #ffcde8;" v-if="subscrbersItem.gender === 2">
              <svg-icon icon-class="sex_male"></svg-icon>
            </i>
          </span>
        </div>
        <p class="textOverflowElli">{{subscrbersItem.signature}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subscrbersItem: {
      type: Object,
      default: {},
    },
  },
  computed: {
    headUrl() {
      return `${this.subscrbersItem.avatarUrl}?param=90y90`;
    },
  },
};
</script>

<style lang="less" scoped>
.SubscribersItem {
  width: 48%;
  height: 90px;
  margin-bottom: 15px;

  .head_url {
    height: 100%;
    img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .user_info {
    flex: 1;
    height: 100%;
    font-size: 14px;
    color: #333;
    margin-left: 10px;
    position: relative;
    .info_con {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      .nickname {
        margin-bottom: 5px;
      }
      .gender {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        font-size: 12px;
        text-align: center;
        line-height: 16px;
        display: inline-block;
      }
    }
  }
}
</style>