<template>
  <div class="CommentListItem" @mouseenter="commentMouseEnter" @mouseleave="commentMouseLeave">
    <div class="left">
      <img v-lazy="getUserUrl" alt />
      <img :src="_songCreatorVipUrl" alt class="iconUrl" />
    </div>
    <div class="right">
      <div>
        <span class="nick_name">{{commentItem.user.nickname}}：</span>
        <span class="comment_con">{{commentItem.content}}</span>
      </div>
      <div class="be_replied" v-if="commentItem.beReplied">
        <div v-if="commentItem.beReplied.status !== -5">
          <span class="nick_name">@{{commentItem.beReplied.user.nickname}}：</span>
          <span class="comment_con">{{commentItem.beReplied.content}}</span>
        </div>
        <div v-else style="text-align: center;">
          <span class="comment_con">该评论已删除</span>
        </div>
      </div>
      <div class="time_options flexL">
        <span class="time">{{handleTime(commentItem.time)}}</span>
        <span class="options flexL">
          <span v-if="isDelete" @click="deleteComment">删除</span>
          <span class="dianzan" @click="doZan(commentItem.commentId,commentItem.liked,commentItem)">
            <svg-icon :icon-class="commentItem.liked ? 'zan-red':'zan'"></svg-icon>
            <i
              v-show="commentItem.likedCount > 0"
              style="margin-left:3px"
            >{{commentItem.likedCount}}</i>
          </span>
          <i class="line">|</i>
          <span>
            <svg-icon icon-class="share"></svg-icon>
          </span>
          <i class="line">|</i>
          <span @click="doReply">
            <svg-icon icon-class="huifu"></svg-icon>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { doCommentLikedAPI } from "@/network/api/musicApi";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isDelete: false,
      songListId: "",
    };
  },
  props: {
    commentItem: {
      type: Object,
      default: {},
    },
  },
  computed: {
    getUserUrl() {
      return `${this.commentItem.user.avatarUrl}?param=35y35`;
    },
    ...mapGetters({ userProfile: "userProfile" }),
    _songCreatorVipUrl() {
      return this.commentItem.user.identityIconUrl + "?param=12y12";
    },
  },
  created() {
    this.songListId = this.$route.path.slice(
      this.$route.path.lastIndexOf("/") + 1
    );
  },
  methods: {
    handleTime(time) {
      let today = this.$moment().startOf("day");
      let yesterday = this.$moment().subtract(1, "days").startOf("day");
      if (this.$moment(time).isSame(today, "d")) {
        // 小于一个小时，显示多少分钟之前，超过，显示时间
        let diffMiun = this.$moment().diff(this.$moment(time), "minutes");
        if (diffMiun === 0) {
          return "刚刚";
        }
        if (diffMiun < 60) {
          return diffMiun + "分钟前";
        }
        return this.$moment(time).format("HH:mm");
      }
      if (this.$moment(time).isSame(yesterday, "d")) {
        return `昨天 ${this.$moment(time).format("HH:mm:ss")}`;
      }
      return this.$moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
    doZan(commentId, liked, commentItem) {
      let params = new URLSearchParams();
      params.append("id", this.songListId);
      params.append("cid", commentId);
      params.append("type", 2);
      params.append("t", ~~!liked);
      doCommentLikedAPI(params).then((result) => {
        // 点赞成功
        commentItem.liked = !liked;
        liked ? commentItem.likedCount-- : commentItem.likedCount++;
      });
    },
    doReply() {
      this.$emit("doReplay", {
        user: this.commentItem.user,
        commentId: this.commentItem.commentId,
      });
      this.scrollParentStart("#AnchorPoint");
    },
    scrollParentStart(name) {
      document.querySelector(name).scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    },
    commentMouseEnter() {
      if (this.commentItem.user.userId === this.userProfile.userId) {
        this.isDelete = true;
      }
    },
    commentMouseLeave() {
      this.isDelete = false;
    },
    deleteComment() {
      this.$emit("openDeleteCommentDialog", this.commentItem.commentId);
    },
  },
};
</script>

<style lang="less" scoped>
.CommentListItem {
  padding: 20px 0;
  border-bottom: 1px solid #e5e5e5;
  font-size: 12px;
  font-weight: 400;
  display: flex;
  justify-content: left;
  align-items: flex-start;
  color: #333;
  .left {
    width: 40px;
    position: relative;
    .iconUrl {
      position: absolute;
      width: 12px;
      height: 12px;
      bottom: 0;
      right: 0;
    }
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }
  .right {
    flex: 1;
    margin-left: 10px;
    .nick_name {
      color: #507daf;
      cursor: pointer;
      line-height: 20px;
    }
    .comment_con {
      line-height: 20px;
    }
    .be_replied {
      margin: 10px 0;
      padding: 5px;
      background-color: #f4f4f4;
      color: #636363;
    }
    .time_options {
      margin-top: 10px;
      color: #9f9f9f;
      .options {
        margin-left: auto;
        .dianzan {
          display: flex;
          justify-content: left;
          align-items: center;
        }
        span {
          color: #666;
          margin: 0 10px;
          font-size: 13px;
          cursor: pointer;
        }
        .line {
          color: #b89fb8;
        }
      }
    }
  }
}
</style>