<template>
  <div id="SongListWrap">
    <happy-scroll
      color="#e0e0e0"
      size="8"
      :resize="true"
      :hide-horizontal="true"
      ref="MyHappyScroll"
    >
      <div class="con" id="AnchorPoint">
        <div class="head_wrap">
          <div class="cover_img">
            <img v-lazy="songListDetail.coverImgUrl+'?param=185y185'" alt />
          </div>
          <div class="song_detail">
            <div class="title flexLeft">
              <span>歌单</span>
              <h3>{{_songlistName}}</h3>
            </div>
            <div class="create_time flex">
              <div class="userImg">
                <img :src="_songCreatorUrl" alt width="25px" height="25px" />
                <img :src="_songCreatorVipUrl" alt class="iconUrl" />
              </div>
              <span>{{_songCreatorNickname}}</span>
              <span>{{songListDetail.createTime | filterCreateTIme}}</span>
            </div>
            <div class="share">
              <div>
                <play-all-btn></play-all-btn>
              </div>
              <div>
                <share-btn
                  :isSubscribed="isSubscribed"
                  :isCreated="isCreated"
                  icon="shoucangjia"
                  :textCon="_subscribedCount"
                ></share-btn>
              </div>
              <div>
                <share-btn icon="fenxiang" :textCon="_shareCount"></share-btn>
              </div>
              <div>
                <share-btn icon="xiazai" textCon="下载全部"></share-btn>
              </div>
            </div>
            <div class="play_statistic">
              <p v-if="isShow">
                <span v-html="tagCon"></span>
              </p>
              <p>
                <span>歌曲：{{_songListLength}}</span>
                <span style="margin-left:10px">播放：{{songListDetail.playCount | filterCount}}</span>
              </p>
              <div v-if="isShow" class="desc">
                <div v-html="descCon"></div>
                <div>
                  <i
                    class="fold_icon"
                    @click="descIsFold = !descIsFold"
                    :class="{rotate:descIsFold}"
                    v-if="foldDesc.length >1"
                  >
                    <svg-icon icon-class="arrow-down-filling"></svg-icon>
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="song_list_wrap">
          <div class="head">
            <div class="left">
              <span @click="toggleType(1)">
                歌曲列表
                <i :class="{bottomRed:typeIndex === 1}"></i>
              </span>
              <span @click="toggleType(2)">
                评论({{commentCount}})
                <i :class="{bottomRed:typeIndex === 2}"></i>
              </span>
              <span @click="toggleType(3)">
                收藏者
                <i :class="{bottomRed:typeIndex === 3}"></i>
              </span>
            </div>
            <div class="right" v-show="typeIndex === 1">
              <input type="text" placeholder="搜索歌单音乐" v-model="keywords" />
              <i @click="clearKeywords">
                <svg-icon
                  class="blackColor"
                  :icon-class="keywords.trim().length === 0?'search':'close'"
                ></svg-icon>
              </i>
            </div>
          </div>
          <div class="song_list_detail" v-if="typeIndex === 1">
            <song-list-detail
              :songIds="songListDetail.trackIds"
              :vipCount="songListDetail.vipCount"
              :keywords="keywords"
            ></song-list-detail>
          </div>
          <div class="commend_list_detail" v-else-if="typeIndex === 2">
            <comment-list-detail @updateCommentCount="updateCommentCount" commentType="playlist"></comment-list-detail>
          </div>
          <div class="subscribers_detail" v-else-if="typeIndex === 3">
            <subscribers-detail></subscribers-detail>
          </div>
        </div>
      </div>
    </happy-scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayAllBtn from "./PlayAllBtn.vue";
import ShareBtn from "./ShareBtn.vue";
import SongListDetail from "./SongListDetail.vue";
import { loadingMixin } from "@/mixin/loadingMixin";
import { number2wan } from "@/util/NumberTransfrom";
import CommentListDetail from "../commentListWrap/CommentListDetail";
import SubscribersDetail from "../subscribersWrap/SubscribersDetail.vue";
import { seachMusicAPI, fetchPlayListDynamicAPI } from "@/network/api/musicApi";
import { Container } from "element-ui";
export default {
  mixins: [loadingMixin],
  components: {
    PlayAllBtn,
    ShareBtn,
    SongListDetail,
    CommentListDetail,
    SubscribersDetail,
  },
  data() {
    return {
      songId: "",
      songListDetail: {},
      isSubscribed: false,
      typeIndex: 1,
      commentCount: 0,
      keywords: "",
      loading: true,
      descIsFold: false,
      foldDesc: [],
      isCreated: this.$route.meta.isCreated,
    };
  },
  computed: {
    ...mapGetters({ userProfile: "userProfile" }),
    _songlistName() {
      if (Object.keys(this.songListDetail).length === 0) return;
      if (this.userProfile) {
        if (
          this.songListDetail.name.indexOf(this.userProfile.nickname) !== -1
        ) {
          return "我喜欢的音乐";
        }
      }

      return this.songListDetail.name;
    },
    _songListLength() {
      if (Object.keys(this.songListDetail).length === 0) return;
      return this.songListDetail.trackIds.length;
    },
    _subscribedCount() {
      if (Object.keys(this.songListDetail).length === 0) return;
      let prefix = this.isSubscribed ? "已收藏" : "收藏";
      return `${prefix}(${number2wan(this.songListDetail.subscribedCount)})`;
    },
    _shareCount() {
      if (Object.keys(this.songListDetail).length === 0) return;
      return `分享(${number2wan(this.songListDetail.shareCount)})`;
    },
    _songCreatorUrl() {
      if (Object.keys(this.songListDetail).length === 0) return;
      return this.songListDetail.creator.avatarUrl + "?param=25y25";
    },
    _songCreatorNickname() {
      if (Object.keys(this.songListDetail).length === 0) return;
      return this.songListDetail.creator.nickname;
    },
    _songCreatorVipUrl() {
      if (Object.keys(this.songListDetail).length === 0) return;
      return this.songListDetail.creator.identityIconUrl + "?param=12y12";
    },

    isShow() {
      if (Object.keys(this.songListDetail).length === 0) return;
      if (this.userProfile) {
        if (
          this.songListDetail.name.indexOf(this.userProfile.nickname) === -1
        ) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    tagCon() {
      if (Object.keys(this.songListDetail).length === 0) return;

      // 自创建没有标签，显示添加标签，不是自创建，如果没有标签不显示，
      if (this.isCreated && this.songListDetail.tags.length === 0) {
        return "标签：<span class='tag'>添加标签</span>";
      }

      if (this.songListDetail.tags.length !== 0) {
        let str = "标签：";
        this.songListDetail.tags.forEach((e, i) => {
          str += `<span class='tag'>${e}</span> / `;
        });
        return str.substring(0, str.length - 2);
      }
      return "";
    },
    descCon() {
      if (Object.keys(this.songListDetail).length === 0) return;

      if (this.isCreated && !this.songListDetail.description) {
        return "简介：<span class='tag'>添加简介</span>";
      }

      if (this.songListDetail.description) {
        // 描述有换行符，和折叠效果，取第一行显示
        let regexp = new RegExp("\n");
        let descList = this.songListDetail.description.split(regexp);
        this.foldDesc = descList;
        let str = "";
        if (this.descIsFold) {
          // 展开
          descList.forEach((e, i) => {
            str += `<span>${descList[i]}</span> <br>`;
          });
        } else {
          str = descList.length === 1 ? descList[0] : descList[0] + "...";
        }
        return `简介：${str}</span>`;
      }
      return "";
    },
  },
  watch: {},
  created() {
    // 从router获取songid和meta中的isSubscribe
    this.songId = this.$route.path.slice(this.$route.path.lastIndexOf("/") + 1);
    this._initSongListDetail(this.songId);
  },
  mounted() {},
  methods: {
    async _initSongListDetail(id) {
      this.initLoading();
      this.songListDetail = await this.$store.dispatch(
        "songModule/SaveSongListDetail",
        {
          id,
        }
      );
      this.commentCount = this.songListDetail.commentCount;

      this.getPlayListDynamic();
      this.endLoading();
    },
    toggleType(type) {
      this.typeIndex = type;
    },
    updateCommentCount(newCommentCount) {
      this.commentCount = newCommentCount;
    },

    clearKeywords() {
      this.keywords = "";
    },
    async getPlayListDynamic() {
      let params = new URLSearchParams();
      params.append("id", this.songId);
      let reuslt = await fetchPlayListDynamicAPI(params);
      this.isSubscribed = reuslt.subscribed;
    },
  },
  filters: {
    filterCreateTIme(value) {
      if (!value) return;
      if (value.length >= 10) {
        return value.substring(0, 10) + " 创建";
      }
      return value + " 创建";
    },
    filterCount(value) {
      if (typeof value === "undefined") return;
      return number2wan(value);
    },
  },
};
</script>

<style lang="less" scoped>
#SongListWrap {
  width: 100%;
  height: 100%;
  .flexLeft {
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .happy-scroll {
    /deep/ .happy-scroll-container {
      width: 100% !important;
      height: 100% !important;
      .happy-scroll-content {
        width: 100%;
      }
    }
  }
  .con {
    width: 100%;
    height: 100%;
    .head_wrap {
      padding: 30px;
      width: 100%;
      display: flex;
      justify-content: left;
      align-content: center;
      .cover_img {
        width: 185px;
        height: 185px;
        border-radius: 5px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .song_detail {
        flex: 1;
        padding-left: 20px;
        // height: 185px;
        .title {
          span {
            color: #ec4141;
            border: 1px solid #ec4141;
            border-radius: 3px;
            margin-right: 10px;
            font-size: 15px;
            padding: 0 5px;
          }
          h3 {
            color: #333;
            font-size: 23px;
          }
        }
        .create_time {
          margin-top: 10px;
          font-size: 12px;
          .userImg {
            position: relative;
            display: inline-block;
            .iconUrl {
              position: absolute;
              width: 12px;
              height: 12px;
              bottom: 0;
              right: -5px;
            }
            img {
              border-radius: 50%;
            }
          }
          span:nth-child(2) {
            color: #507daf;
            margin: 0 7px;
          }
        }
        .share {
          display: flex;
          justify-content: left;
          align-items: center;
          margin: 10px 0 10px;
        }
        .play_statistic {
          font-size: 14px;
          p,
          .desc {
            margin-bottom: 5px;
            /deep/ .tag {
              color: #0b58b0;
              &:hover {
                cursor: pointer;
              }
            }
          }
          .desc {
            display: flex;
            justify-content: left;
            align-self: center;
            div:last-child {
              margin-left: auto;
              .fold_icon {
                display: block;
                color: #999999;
                &.rotate {
                  transform: rotate(180deg);
                }
              }
            }
          }
        }
      }
    }
    .song_list_wrap {
      .head {
        width: 100%;
        height: 25px;
        margin-bottom: 15px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          justify-content: left;
          align-items: center;
          span {
            margin-right: 20px;
            font-size: 14px;
            color: #000000;
            text-align: center;
            position: relative;

            &:hover {
              cursor: pointer;
            }

            .bottomRed {
              position: absolute;
              bottom: -5px;
              left: 50%;
              transform: translateX(-50%);
              width: 80%;
              height: 3px;
              background-color: #ec4141;
            }
          }
        }
        .right {
          width: 240px;
          height: 100%;
          background-color: #f7f7f7;
          border-radius: 15px;
          display: flex;
          justify-content: left;
          align-items: center;
          input {
            width: 200px;
            border: none;
            background-color: #f7f7f7;
            margin-left: 10px;
            font-size: 14px;
          }
          i {
            width: 20px;
            margin-left: auto;
            margin-right: 3px;
            .blackColor {
              color: #000000;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>