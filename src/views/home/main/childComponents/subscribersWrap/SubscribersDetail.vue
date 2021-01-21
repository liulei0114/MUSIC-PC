<template>
  <div class="SubscribersDetail" v-mask-loading="{loading:loading}">
    <div class="subscribers_wrap">
      <subscribers-item v-for="item in subscribersList" :key="item.userId" :subscrbersItem="item"></subscribers-item>
    </div>

    <div class="pageination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="subscribersListTotal"
        :page-size="pageInfo.limit"
        :current-page="pageInfo.currentPage"
        hide-on-single-page
        @current-change="handelChangeCurrentPage"
      ></el-pagination>
    </div>
  </div>
</template>



<script>
import { playListSubscribersInfoAPI } from "@/network/api/musicApi";
import { Subscribers } from "@/common/pojo.js";
import SubscribersItem from "./SubscribersItem.vue";
export default {
  components: { SubscribersItem },
  data() {
    return {
      pageInfo: {
        limit: 60,
        offset: 0,
        currentPage: 1,
      },
      subscribersList: [],
      subscribersListTotal: 0,
      songListId: "",
      loading: "on",
    };
  },
  created() {
    this.songListId = this.$route.path.slice(
      this.$route.path.lastIndexOf("/") + 1
    );
    this._initSubscribersInfo();
  },
  watch: {
    subscribersList() {
      this.$nextTick(() => {
        this.loading = "off";
      });
    },
  },
  methods: {
    async _initSubscribersInfo() {
      this.loading = 'on'
      let params = new URLSearchParams();
      params.append("id", this.songListId);
      params.append("limit", this.pageInfo.limit);
      params.append("offset", this.pageInfo.offset);
      let reuslt = await playListSubscribersInfoAPI(params);
      this.subscribersListTotal = reuslt.total;
      this.subscribersList.length = 0;
      reuslt.subscribers.forEach((e, i) => {
        this.subscribersList.push(new Subscribers(e));
      });
      this.scrollParentStart("#AnchorPoint");
    },
    handelChangeCurrentPage(curPage) {
      this.pageInfo.currentPage = curPage;
      this.pageInfo.offset = (curPage - 1) * this.pageInfo.limit;
      this._initSubscribersInfo();
    },
    scrollParentStart(name) {
      document.querySelector(name).scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.SubscribersDetail {
  width: 100%;
  padding: 0 20px;
  .subscribers_wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-self: center;
  }
  .pageination {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 50px;
    /deep/ .active {
      background-color: #ec4141 !important;
    }
    /deep/ li:not(.disabled):hover {
      color: #606266 !important;
    }
  }
}
</style>