<template>
  <div class="CommentListWrap">
    <div>
      <el-form :rules="rules" ref="ruleForm" :model="ruleForm" :show-message="false">
        <el-form-item prop="textarea">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="ruleForm.textarea"
            :show-word-limit="true"
            :maxlength="140"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="do_comment flexL">
      <div class="emoji_con" style="margin-right:10px">
        <el-popover placement="bottom" width="300" trigger="click" v-model="visible">
          <div>
            <div style="overflow: hidden; margin-bottom:5px">
              <i style="float: right; font-size:20px; cursor: pointer;" @click="visible = false">
                <svg-icon icon-class="close"></svg-icon>
              </i>
            </div>
            <div class="emoji_list">
              <i
                :style="emojiItemStyle"
                v-for="(item,index) in emojiJson"
                :key="item.codes"
                @mouseenter="handleMouseEnter(index)"
                @mouseleave="handleMouseLeave(index)"
                @click="handleEmojiClick(item.char)"
              >{{item.char}}</i>
            </div>
          </div>

          <i slot="reference">
            <svg-icon icon-class="emoji" class-name="big"></svg-icon>
          </i>
        </el-popover>
      </div>
      <i style="margin-right:10px">
        <svg-icon class-name="big" icon-class="at"></svg-icon>
      </i>
      <i style="margin-right:10px">
        <svg-icon class-name="big" icon-class="huati"></svg-icon>
      </i>
      <div class="sub_comment" @click="handelSubComment">评论</div>
    </div>
    <div class="hot_comment" v-if="commentListDetail.hotComments">
      <div class="title">精彩评论</div>
      <comment-list-item
        v-for="item in commentListDetail.hotComments"
        :key="item.commentId"
        :commentItem="item"
        @doReplay="doReplay"
      ></comment-list-item>
    </div>
    <div class="comment_list_con" v-if="commentListDetail.comments">
      <div class="title">最新评论({{commentListDetail.total}})</div>
      <comment-list-item
        v-for="item in commentListDetail.comments"
        :key="item.commentId"
        :commentItem="item"
        @doReplay="doReplay"
        @openDeleteCommentDialog="openDeleteCommentDialog"
      ></comment-list-item>
    </div>
    <div class="pageination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="commentListDetail.total"
        :page-size="pageInfo.limit"
        :current-page="pageInfo.currentPage"
        hide-on-single-page
        @current-change="handelChangeCurrentPage"
      ></el-pagination>
    </div>
    <el-dialog
      :visible.sync="dialogTableVisible"
      center
      width="470px"
      :modal-append-to-body="false"
      :modal='false'
    >
      <div style="text-align: center;">确定删除该条评论</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" plain @click="deleteComment">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchSongCommentAPI, doCommentAPI } from "@/network/api/musicApi";
import { CommentDetail } from "@/common/pojo";
import CommentListItem from "./CommentListItem.vue";
import { loadingMixin } from "@/mixin/loadingMixin";
export default {
  mixins: [loadingMixin],
  data() {
    let textareaValid = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入内容"));
      }
      if (value.length > rule.max) {
        return callback(new Error("内容不能超过" + rule.max + "字符"));
      }
      callback();
    };

    return {
      pageInfo: {
        limit: 60,
        offset: 0,
        currentPage: 1,
      },
      songListId: this.$route.params.id,
      emojiJson: [
        {
          codes: "1F600",
          char: "😀",
          name: "grinning face",
        },
        {
          codes: "1F603",
          char: "😃",
          name: "grinning face with big eyes",
        },
        {
          codes: "1F604",
          char: "😄",
          name: "grinning face with smiling eyes",
        },
        {
          codes: "1F601",
          char: "😁",
          name: "beaming face with smiling eyes",
        },
        {
          codes: "1F606",
          char: "😆",
          name: "grinning squinting face",
        },
        {
          codes: "1F605",
          char: "😅",
          name: "grinning face with sweat",
        },
        {
          codes: "1F923",
          char: "🤣",
          name: "rolling on the floor laughing",
        },
        {
          codes: "1F602",
          char: "😂",
          name: "face with tears of joy",
        },
        {
          codes: "1F642",
          char: "🙂",
          name: "slightly smiling face",
        },
        {
          codes: "1F643",
          char: "🙃",
          name: "upside-down face",
        },
        {
          codes: "1F609",
          char: "😉",
          name: "winking face",
        },
        {
          codes: "1F60A",
          char: "😊",
          name: "smiling face with smiling eyes",
        },
        {
          codes: "1F607",
          char: "😇",
          name: "smiling face with halo",
        },
        {
          codes: "1F970",
          char: "🥰",
          name: "smiling face with hearts",
        },
        {
          codes: "1F60D",
          char: "😍",
          name: "smiling face with heart-eyes",
        },
        {
          codes: "1F929",
          char: "🤩",
          name: "star-struck",
        },
        {
          codes: "1F618",
          char: "😘",
          name: "face blowing a kiss",
        },
        {
          codes: "1F617",
          char: "😗",
          name: "kissing face",
        },
        {
          codes: "1F61A",
          char: "😚",
          name: "kissing face with closed eyes",
        },
        {
          codes: "1F619",
          char: "😙",
          name: "kissing face with smiling eyes",
        },
        {
          codes: "1F44B",
          char: "👋",
          name: "waving hand",
        },
        {
          codes: "1F91A",
          char: "🤚",
          name: "raised back of hand",
        },
        {
          codes: "1F590",
          char: "🖐",
          name: "hand with fingers splayed",
        },
        {
          codes: "270B",
          char: "✋",
          name: "raised hand",
        },
        {
          codes: "1F596",
          char: "🖖",
          name: "vulcan salute",
        },
        {
          codes: "1F44C",
          char: "👌",
          name: "OK hand",
        },
        {
          codes: "1F90F",
          char: "🤏",
          name: "pinching hand",
        },
        {
          codes: "270C",
          char: "✌",
          name: "victory hand",
        },
        {
          codes: "1F91E",
          char: "🤞",
          name: "crossed fingers",
        },
        {
          codes: "1F91F",
          char: "🤟",
          name: "love-you gesture",
        },
        {
          codes: "1F918",
          char: "🤘",
          name: "sign of the horns",
        },
        {
          codes: "1F919",
          char: "🤙",
          name: "call me hand",
        },
        {
          codes: "1F448",
          char: "👈",
          name: "backhand index pointing left",
        },
        {
          codes: "1F449",
          char: "👉",
          name: "backhand index pointing right",
        },
        {
          codes: "1F446",
          char: "👆",
          name: "backhand index pointing up",
        },
        {
          codes: "1F595",
          char: "🖕",
          name: "middle finger",
        },
        {
          codes: "1F447",
          char: "👇",
          name: "backhand index pointing down",
        },
        {
          codes: "261D FE0F",
          char: "☝️",
          name: "index pointing up",
        },
        {
          codes: "1F44D",
          char: "👍",
          name: "thumbs up",
        },
        {
          codes: "1F44E",
          char: "👎",
          name: "thumbs down",
        },
        {
          codes: "270A",
          char: "✊",
          name: "raised fist",
        },
        {
          codes: "1F44A",
          char: "👊",
          name: "oncoming fist",
        },
        {
          codes: "1F91B",
          char: "🤛",
          name: "left-facing fist",
        },
        {
          codes: "1F91C",
          char: "🤜",
          name: "right-facing fist",
        },
      ],
      ruleForm: {
        textarea: "",
      },
      rules: {
        textarea: [
          {
            validator: textareaValid,
            trigger: "focus",
            max: 140,
          },
        ],
      },
      visible: false,
      commentListDetail: {},
      replayData: {},
      replayNickName: "",
      dialogTableVisible: false,
      deleteCommentId: "",
    };
  },
  computed: {
    emojiItemStyle() {
      return {
        width: "30px",
        height: "30px",
        "font-size": "20px",
        display: "inline-block",
        cursor: "pointer",
        "text-align": "center",
        border: "1px solid #fff",
        "margin-bottom": "5px",
      };
    },
  },
  created() {
    this._initSongComment();
  },
  methods: {
    // ? 初始化评论数据
    _initSongComment() {
      this.$nextTick(() => {
        this.initLoading();
      });
      let params = Object.assign({ id: this.songListId }, this.pageInfo);
      params.timestamp = new Date().valueOf();
      fetchSongCommentAPI(params).then((result) => {
        this.commentListDetail = new CommentDetail(result);
        this.$emit("updateCommentCount", this.commentListDetail.total);
        this.endLoading();
        this.scrollParentStart("#AnchorPoint");
      });
    },
    onInput(event) {
      console.log(event);
    },
    handleMouseEnter(index) {
      let emoji = document.getElementsByClassName("emoji_list")[0].children[
        index
      ];
      emoji.style.border = "1px solid #3d91ec";
    },
    handleMouseLeave(index) {
      let emoji = document.getElementsByClassName("emoji_list")[0].children[
        index
      ];
      emoji.style.border = "1px solid #fff";
    },
    handleEmojiClick(char) {
      this.ruleForm.textarea += char;
    },
    handelSubComment() {
      this.$refs["ruleForm"].validate((valid, object) => {
        if (valid) {
          this.doComment();
        } else {
          this.$gMessage.show(object.textarea[0].message);
          return false;
        }
      });
    },
    scrollParentStart(name) {
      document.querySelector(name).scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    },
    handelChangeCurrentPage(curPage) {
      this.pageInfo.currentPage = curPage;
      this.pageInfo.offset = (curPage - 1) * this.pageInfo.limit;
      this._initSongComment();
    },
    doReplay(data) {
      this.replayNiceName = `回复${data.user.nickname}: `;
      this.ruleForm.textarea = this.replayNiceName;
      this.replayData = data;
    },
    async doComment() {
      let params = new URLSearchParams();
      if (this.ruleForm.textarea.startsWith(this.replayNiceName)) {
        // 回复
        let content = this.ruleForm.textarea
          .slice(this.replayNiceName.length)
          .trim();
        if (content === "") {
          this.$gMessage.show(
            `<span>写点东西吧，内容不能为空哦！</span>`,
            "msg-err"
          );
          return false;
        }
        params.append("t", 2);
        params.append("content", content);
        params.append("commentId", this.replayData.commentId);
      } else {
        params.append("t", 1);
        params.append("content", this.ruleForm.textarea);
      }
      params.append("id", this.$route.params.id);
      params.append("type", 2);
      let result = await doCommentAPI(params);
      if (result.code === 200) {
        this._initSongComment();
        this.ruleForm.textarea = "";
      }
    },
    openDeleteCommentDialog(commentId) {
      this.dialogTableVisible = true;
      this.deleteCommentId = commentId;
    },
    async deleteComment() {
      let params = new URLSearchParams();
      params.append("t", 0);
      params.append("type", 2);
      params.append("id", this.$route.params.id);
      params.append("commentId", this.deleteCommentId);
      this.dialogTableVisible = false;
      let result = await doCommentAPI(params);
      if (result.code === 200) {
        this._initSongComment();
      }
    },
  },
  components: { CommentListItem },
};
</script>

<style lang="less" scoped>
.CommentListWrap {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  color: #333;
  /deep/ .dialog__headerbtn:hover .el-dialog__close {
    color: #909399;
  }
  /deep/ .el-button--danger.is-plain {
    background-color: #ec4141;
    color: #fff;
  }
  /deep/ .el-button--danger.is-plain:hover{
    background-color: #d73535;
  }
  .do_comment {
    margin-top: -10px;
    .sub_comment {
      padding: 5px 15px;
      border: 1px solid #e5e5e5;
      margin-left: auto;
      border-radius: 20px;
      font-size: 15px;
      &:hover {
        background-color: #f2f2f2;
        cursor: pointer;
      }
    }
    .big {
      font-size: 20px;
    }
  }
  .hot_comment {
    margin-top: 20px;
    font-weight: 700;
    .CommentListItem:last-child {
      border-bottom: none;
    }
  }
  .comment_list_con {
    margin-top: 20px;
    font-weight: 700;
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