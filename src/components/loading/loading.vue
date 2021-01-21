<template>
  <div
    :class="fullscreen ? 'dhtMask-FullScreen' : 'dhtMask'"
    :style="{
      fontSize: fontSize + 'px',
    }"
  >
    <i class="dht-loading-icon" :style="{fontSize:iconFontSize + 'px'}">
      <svg-icon :icon-class="iconName"></svg-icon>
    </i>
    <span style="color:#ec4141">{{ text }}</span>
  </div>
</template>
 
<script>
export default {
  name: "dhtMask",
  data() {
    return {
      fullscreen: false,
      text: "拼命加载中…",
      iconName: null,
      fontSize: null,
      iconFontSize: null,
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    if (this.fullscreen) {
      document.body.style.overflow = "hidden";
    }
  },
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {
    document.body.style.overflowX = "hidden";
  },
  errorCaptured() {},
  methods: {},
};
</script>
 
<style lang="less">
.dhtMask {
  position: absolute;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  flex-flow: column;
}
.dhtMask-FullScreen {
  position: absolute;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  flex-flow: column;
  width: 100vw;
  height: 100vh;
  top: 0;
}
.dht-loading-icon {
  width: 25px;
  height: 25px;
  object-fit: cover;
  margin-bottom: 5px;
  animation: dht-rotate 2s linear infinite;
  @keyframes dht-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>