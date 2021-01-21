<template>
  <div class="ArtistDetail" v-mask-loading="{loading:loading}">
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
            <img v-lazy="artistDetail.cover+'?param=185y185'" alt width="185px" height="185px" />
          </div>
          <div class="song_detail">
            <h3>{{artistDetail.name}}</h3>
            <div class="alias">
              <span v-show="artistDetail.trans !== ''">{{artistDetail.trans}}</span>
              <span>{{artistDetail.alias}}</span>
            </div>

            <div class="share">
              <div>
                <share-btn
                  :isSubscribed="artistDetail.isSub"
                  icon="shoucangjia"
                  :textCon="artistDetail.isSub?'已收藏':'收藏'"
                ></share-btn>
              </div>
              <div v-if="artistDetail.isUserPage">
                <share-btn icon="person" textCon="个人主页"></share-btn>
              </div>
            </div>
            <div class="introduce">
              <span>单曲数：{{artistDetail.musicSize}}</span>
              <span>专辑数：{{artistDetail.albumSize}}</span>
              <span>MV数：{{artistDetail.mvSize}}</span>
            </div>
          </div>
        </header>
        <nav>
          <div class="left">
            <span @click="toggleType(1)">
              专辑
              <i :class="{bottomRed:typeIndex === 1}"></i>
            </span>
            <span @click="toggleType(2)">
              MV
              <i :class="{bottomRed:typeIndex === 2}"></i>
            </span>
            <span @click="toggleType(3)">
              歌手详情
              <i :class="{bottomRed:typeIndex === 3}"></i>
            </span>
            <span @click="toggleType(4)">
              相似歌手
              <i :class="{bottomRed:typeIndex === 4}"></i>
            </span>
          </div>
        </nav>
        <article v-if="typeIndex === 1">
          <album-item-detail ref="albumItemDetail" :artistId="artistId"></album-item-detail>
        </article>
        <article v-if="typeIndex === 3">
          <artist-desc :artistId="artistId"></artist-desc>
        </article>
        <article v-if="typeIndex === 4">
          <similarity-artist :artistId="artistId"></similarity-artist>
        </article>
      </div>
    </happy-scroll>
  </div>
</template>

<script>
import {
  fetchArtistDetailAPI,
  fetchSubArtistListAPI,
} from "@/network/api/musicApi";
import ShareBtn from "../../../songListWrap/ShareBtn.vue";
import AlbumItemDetail from "./AlbumItemDetail.vue";
import ArtistDesc from "./ArtistDesc.vue";
import SimilarityArtist from "./SimilarityArtist.vue";
export default {
  data() {
    return {
      tnsName: "",
      aliasName: [],
      artistId: "",
      artistDetail: {
        name: "",
        albumSize: 0,
        musicSize: 0,
        mvSize: 0,
        cover: "",
        alias: "",
        trans: "",
        isSub: false,
        isUserPage: true,
      },
      typeIndex: 1,
      musicTop50: [],
      loading: "on",
    };
  },
  created() {
    this.artistId = this.$route.path.slice(
      this.$route.path.lastIndexOf("/") + 1
    );
    this._initArtistDeatil();
  },
  mounted() {
    setTimeout(() => {
      this.artistDetail.trans = this.$refs.albumItemDetail.artist.trans;
      this.artistDetail.alias = this.$refs.albumItemDetail.artist.alias;
      this.loading = "off";

    }, 500);
  },
  methods: {
    async _initArtistDeatil() {
      let result = await fetchArtistDetailAPI({ id: this.artistId });
      let artist = result.data.artist;
      this.artistDetail.name = artist.name;
      this.artistDetail.albumSize = artist.albumSize;
      this.artistDetail.musicSize = artist.musicSize;
      this.artistDetail.mvSize = artist.mvSize;
      this.artistDetail.cover = this.tansIdentityIconUrl(artist.cover);
      this.artistDetail.isUserPage = result.data.user ? true : false;

      let subList = await fetchSubArtistListAPI();
      this.artistDetail.isSub = subList.data.some((e, i) => {
        return e.id == this.artistId;
      });
    },
    tansIdentityIconUrl(imageUrl) {
      imageUrl = imageUrl.replace(new RegExp("p[1-5]{1}"), "p3");
      return imageUrl;
    },
    toggleType(type) {
      this.typeIndex = type;
    },
  },
  components: {
    ShareBtn,
    AlbumItemDetail,
    ArtistDesc,
    SimilarityArtist,
  },
};
</script>

<style lang="less" scoped>
.ArtistDetail {
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
      }

      .song_detail {
        flex: 1;
        padding-left: 30px;
        h3 {
          color: #333;
          font-size: 23px;
        }
        .alias {
          margin-top: 10px;
          font-size: 14px;
          color: #373737;
          span:first-child {
            margin-right: 10px;
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
        span {
          margin-right: 20px;
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
  }
}
</style>