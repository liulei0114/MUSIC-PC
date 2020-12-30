import { Loading } from "element-ui";

export const loadingMixin = {
  data() {
    return {
      loadingOptions: {
        target: "#MusicMain",
        text: "拼命加载中",
        background: "rgba(0, 0, 0, 0.7)",
        spinner: "el-icon-loading",
      },
      loadingInstance: null,
    }
  },
  methods: {
    initLoading() {
      this.loadingInstance = Loading.service(this.loadingOptions);
    },
    endLoading() {
      this.$nextTick(() => {
        this.loadingInstance.close();
      });
    }
  }
}