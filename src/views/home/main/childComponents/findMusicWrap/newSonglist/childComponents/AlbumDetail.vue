<template>
  <div id="AlbumDetail">
    <happy-scroll
      color="#e0e0e0"
      size="8"
      :resize="true"
      :hide-horizontal="true"
      ref="MyHappyScroll"
    >
      <div class="con" id="AnchorPoint">
        <header>
          <div class="cover_img">
            <img v-lazy="albumDetail.picUrl+'?param=185y185'" alt />
            <div class="cipan"></div>
          </div>
          <div class="song_detail">
            <div class="title flexLeft">
              <span>专辑</span>
              <h3>
                {{albumDetail.name}}
                <i
                  style="color:#9f9f9f"
                  v-if="albumDetail.alias !== ''"
                >({{albumDetail.alias}})</i>
              </h3>
            </div>

            <div class="share">
              <div>
                <play-all-btn></play-all-btn>
              </div>
              <div>
                <share-btn
                  :isSubscribed="albumDyamic.isSub"
                  icon="shoucangjia"
                  :textCon="_subscribedCount"
                ></share-btn>
              </div>
              <div>
                <share-btn icon="xiazai" textCon="下载全部"></share-btn>
              </div>
              <div>
                <share-btn icon="fenxiang" :textCon="_shareCount"></share-btn>
              </div>
            </div>
            <div class="introduce">
              <div>
                <span>歌手：</span>
                <span v-for="(item,index) in albumDetail.als" :key="item.id">
                  <router-link to>{{item.name}}</router-link>
                  <span v-show="(index +1) !== albumDetail.als.length">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                </span>
              </div>
              <div>
                <span>时间：</span>
                <span style="color:#676767">{{albumDetail.publishTime}}</span>
              </div>
            </div>
          </div>
        </header>
        <nav>
          <div class="head">
            <div class="left">
              <span @click="toggleType(1)">
                歌曲列表
                <i :class="{bottomRed:typeIndex === 1}"></i>
              </span>
              <span @click="toggleType(2)">
                评论({{albumDyamic.commentCount}})
                <i :class="{bottomRed:typeIndex === 2}"></i>
              </span>
              <span @click="toggleType(3)">
                专辑详情
                <i :class="{bottomRed:typeIndex === 3}"></i>
              </span>
            </div>
          </div>
        </nav>
        <article v-if="typeIndex === 1">
          <song-list-detail :songIds="albumDetail.songIds" :isAlbumTitle="true" :isShowPop="true"></song-list-detail>
        </article>
        <article v-else-if="typeIndex === 2">
          <comment-list-detail @updateCommentCount="updateCommentCount" commentType="album"></comment-list-detail>
        </article>
        <article v-else-if="typeIndex === 3">
          <div class="description" v-html="_description"></div>
        </article>
      </div>
    </happy-scroll>
  </div>
</template>

<script>
import {
  fetchAlbumDetailAPI,
  fetchAlbumDynamicAPI,
} from "@/network/api/musicApi";
import { AlbumDetail } from "@/common/pojo.js";
import PlayAllBtn from "../../../songListWrap/PlayAllBtn.vue";
import ShareBtn from "../../../songListWrap/ShareBtn.vue";
import { number2wan } from "@/util/NumberTransfrom";
import SongListDetail from "../../../songListWrap/SongListDetail.vue";
import CommentListDetail from "../../../commentListWrap/CommentListDetail.vue";
export default {
  data() {
    return {
      albumId: "",
      albumDetail: {},
      albumDyamic: {
        shareCount: 0,
        subCount: 0,
        commentCount: 0,
        isSub: false,
      },
      typeIndex: 1,
    };
  },
  computed: {
    _subscribedCount() {
      let prefix = this.albumDyamic.isSub ? "已收藏" : "收藏";
      return `${prefix}(${number2wan(this.albumDyamic.subCount)})`;
    },
    _shareCount() {
      return `${number2wan(this.albumDyamic.shareCount)}`;
    },
    _albumName() {
      if (Object.keys(this.albumDetail).length === 0) return;
      return this.albumDetail.name;
    },
    _description() {
      // 描述有换行符，和折叠效果，取第一行显示
      let regexp = new RegExp("\n");
      let descList = this.albumDetail.description.split(regexp);
      let str = "";
      descList.forEach((e, i) => {
        str += `<p>${e}</p>`;
      });
      return str;
    },
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler(albumId) {
        this.albumId = albumId;
        this._initAlbumDetail();
      },
    },
  },
  methods: {
    async _initAlbumDetail() {
      let result = await fetchAlbumDetailAPI({ id: this.albumId });
      this.albumDetail = new AlbumDetail(result.album, result.songs);
      this._initAlbumDynamic();
    },
    async _initAlbumDynamic() {
      let result = await fetchAlbumDynamicAPI({ id: this.albumId });
      this.albumDyamic.shareCount = result.shareCount;
      this.albumDyamic.subCount = result.subCount;
      this.albumDyamic.commentCount = result.commentCount;
      this.albumDyamic.isSub = result.isSub;
    },
    toggleType(type) {
      this.typeIndex = type;
    },
    updateCommentCount(newCommentCount) {
      this.albumDyamic.commentCount = newCommentCount;
    },
  },
  components: {
    PlayAllBtn,
    ShareBtn,
    SongListDetail,
    CommentListDetail,
  },
};
</script>

<style lang="less" scoped>
#AlbumDetail {
  width: 100%;
  height: 100%;
  .happy-scroll {
    /deep/ .happy-scroll-container {
      width: 100% !important;
      height: 100% !important;
      .happy-scroll-content {
        width: 100%;
      }
    }
  }
  .flexLeft {
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .con {
    width: 100%;
    height: 100%;
    header {
      padding: 30px;
      width: 100%;
      display: flex;
      justify-content: left;
      align-content: center;
      .cover_img {
        width: 185px;
        height: 185px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
        .cipan {
          position: absolute;
          width: 25px;
          height: 180px;
          right: -25px;
          top: 3px;
          background-repeat: no-repeat;
          background-image: url("~assets/big_aside.png");
        }
      }

      .song_detail {
        flex: 1;
        padding-left: 50px;
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
      }
      .share {
        display: flex;
        justify-content: left;
        align-items: center;
        margin: 10px 0 10px;
      }
      .introduce {
        font-size: 13px;
        color: #373737;
        div:first-child {
          margin-top: 15px;
          margin-bottom: 5px;
          a {
            color: #507daf;
          }
        }
      }
    }
    nav {
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
    }
    article {
      width: 100%;
      .description {
        width: 100%;
        padding: 20px;
        margin-bottom: 30px;
        color: #676767;
        font-size: 14px;
        line-height: 30px;
        /deep/ p {
          text-indent: 2em;
        }
      }
    }
  }
}
</style>