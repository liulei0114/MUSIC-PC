<template>
  <div id="MusicAside">
    <!-- 这里的标签名称要和main.js文件中定义的组件名称保持一致 -->
    <happy-scroll color="#e0e0e0" size="8" :resize="true" :hide-horizontal="true">
      <!-- 内层盒子——内容区 -->
      <div class="con">
        <aside-item
          v-for="(item,index) in showAsideMenu"
          :key="index"
          :itemMenu="item"
          @click.native="handelAsideItemClick(item)"
        ></aside-item>
      </div>
    </happy-scroll>
  </div>
</template>

<script>
import AsideItem from "./AsideItem.vue";

export default {
  data() {
    return {
      conScrollHeight: 0,
      conHeight: 0,
      asideDom: null,
      scrollBarDom: null,
      checkMenuIndex: 0,
      activedMenuId: "",
    };
  },
  mounted() {
    this.asideDom = document.getElementById("MusicAside");
    this.scrollBarDom = this.asideDom.querySelector(".happy-scroll-bar");
    // 隐藏掉滚动条
    this.hiddenScrollBar();
    this.addMouseEnterBarShowEventListener();
    this.addMouseLeaveBarHiddenEventListener();
  },
  watch: {},
  computed: {
    showAsideMenu() {
      this.$nextTick(() => {
        this.conScrollHeight = document
          .getElementById("MusicAside")
          .querySelector(".con").scrollHeight;
        this.conHeight = document
          .getElementById("MusicAside")
          .querySelector(".con").clientHeight;
      });

      let storeAsideMenu = this.$store.getters.asideMenu;
      let _asideMenu = [
        ...storeAsideMenu.base,
        storeAsideMenu.myMusic[0],
        storeAsideMenu.myPlayList[0],
        storeAsideMenu.myOrderList[0],
      ];
      let showmenu = [];
      _asideMenu.forEach((e, i) => {
        if (e.show) {
          let { childrens, ...temp } = e;
          showmenu.push(temp);
          childrens.forEach((v, i) => {
            if (v.show) {
              showmenu.push(v);
            }
          });
        }
      });

      return showmenu;
    },
  },
  methods: {
    handelAsideItemClick(item) {
      this.$router.push(item.path);
    },
    addMouseEnterBarShowEventListener() {
      this.asideDom.onmouseenter = () => {
        // 移入时判断容器高度是否超出盒子高度，没超出不显示滚动条
        if (this.conScrollHeight <= this.conHeight) {
          //修改.happy-scroll-bar opacity:1
          this.scrollBarDom.style.opacity = 0;
        } else {
          this.scrollBarDom.style.opacity = 1;
        }
      };
    },
    addMouseLeaveBarHiddenEventListener() {
      this.asideDom.onmouseleave = (e) => {
        this.hiddenScrollBar();
      };
    },
    hiddenScrollBar() {
      this.scrollBarDom.style.opacity = 0;
    },
  },
  components: { AsideItem },
};
</script>

<style lang="less" scoped>
#MusicAside {
  width: 100%;
  height: 100%;
  background-color: var(--asideBgColor);
  border-right: 1px solid #d8d8d8;
  .con {
    width: 100%;
    height: 100%;
    .aside_item:first-child {
      margin-top: 0;
    }
  }
  /deep/ .happy-scroll-container {
    width: 100% !important;
    height: 100% !important;
    .happy-scroll-content {
      border-right: 0 !important;
      border-bottom: 0 !important;
      width: calc(100% - 8px);
      height: 100%;
    }
  }
}
</style>