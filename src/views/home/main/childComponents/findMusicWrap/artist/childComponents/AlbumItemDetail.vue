<template>
  <div class="AlbumItemDetail">
    <article v-for="album in allAlbum" :key="album.id">
      <aside>
        <img v-lazy="album.picUrl + '?param?150y150'" alt width="150px" height="150px" />
        <div class="cipan"></div>
        <p>{{album.dt}}</p>
      </aside>
      <section>
        <div class="title flexL">
          <h4>{{album.name}}</h4>
          <span style="margin:0 30px">
            <svg-icon icon-class="play_cir"></svg-icon>
          </span>
          <span v-if="!album.isSub">
            <svg-icon icon-class="shoucangjia"></svg-icon>
          </span>
        </div>
        <div class="con">
          <song-list-item
            v-for="(item,i) in album.songlist"
            :key="item.id"
            :index="i+1"
            :songItem="item"
            :likeListIdsMap="likeListIdsMap"
            :isAr="true"
            v-show="isShowItem(album,i)"
          ></song-list-item>
          <div class="look_all" v-show="isShwoAllBtn(album)">
            <span @click="lookAll(album)">
              查看全部
              <i>
                <svg-icon icon-class="arrow-right"></svg-icon>
              </i>
            </span>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
import {
  fetchArtistAlbumListAPI,
  fetchAlbumDetailAPI,
  fetchLikeListAPI,
  fetchSongDetailApi,
  fetchArtistTop50API,
} from "@/network/api/musicApi";
import { Album, Track } from "@/common/pojo.js";
import SongListDetail from "../../../songListWrap/SongListDetail.vue";
import { mapGetters } from "vuex";
import SongListItem from "../../../songListWrap/SongListItem.vue";
export default {
  data() {
    return {
      albumTop50: {},
      hotAlbums: [],

      pageInfo: {
        limit: 5,
        curPage: 1,
        more: true,
      },
      artist: {},
      likeListIdsMap: {},
      contentOffsetHeight: null,
      initLock: false,
    };
  },
  props: {
    artistId: {
      type: String,
      default: "",
    },
  },
  watch: {
    hotAlbums() {
      if (this.hotAlbums.length === 0) {
        return;
      }
      // this.$nextTick(() => {});
      setTimeout(() => {
        let contain = document
          .querySelector(".ArtistDetail")
          .querySelector(".happy-scroll-container");
        let content = contain.children[0];
        this.contentOffsetHeight = content.scrollHeight;
        this.initLock = false;
      }, 500);
    },
  },
  computed: {
    ...mapGetters({ userProfile: "userProfile" }),
    allAlbum() {
      if (Object.keys(this.albumTop50).length === 0) return;
      let arr = [];
      arr.push(this.albumTop50);
      arr.push(...this.hotAlbums);
      return arr;
    },
  },
  created() {
    this._initLikeList();
    this._initAllAlbum();
  },
  mounted() {
    let contain = document
      .querySelector(".ArtistDetail")
      .querySelector(".happy-scroll-container");
    contain.addEventListener("scroll", () => {
      this.handleScroll(contain);
    });
  },
  methods: {
    async _initAllAlbum() {
      Promise.all([this._initAlbumTop50(), this._initAlbumList()]).then(
        (result) => {
          this.albumTop50 = result[0];
          this.hotAlbums = result[1];
        }
      );
    },
    async _initAlbumList() {
      if (this.pageInfo.more) {
        let param = new URLSearchParams();
        param.append("id", this.artistId);
        param.append("limit", this.pageInfo.limit);
        param.append(
          "offset",
          (this.pageInfo.curPage - 1) * this.pageInfo.limit
        );
        let result = await fetchArtistAlbumListAPI(param);
        this.pageInfo.more = result.more;
        this.artist.alias = result.artist.alias.join("  /  ");
        this.artist.trans = result.artist.trans;
        result.hotAlbums.forEach((e, i) => {
          let temp = new Album(e);
          temp.threshold = true;
          this.hotAlbums.push(temp);
        });

        // 加载每个专辑的私有歌曲
        this.hotAlbums.forEach((e, i) => {
          this.getAlbumSonglist(e);
        });
        return this.hotAlbums;
      }
    },
    async _initAlbumTop50() {
      let temp = {
        name: "热门50首",
        picUrl: require("@/assets/top50.png"),
        id: "1",
        songlist: [],
        threshold: true,
      };
      let result = await fetchArtistTop50API({ id: this.artistId });
      result.songs.forEach((e, i) => {
        temp.songlist.push(new Track(e, e.privilege));
      });
      return temp;
    },
    async getAlbumSonglist(e) {
      let result = await fetchAlbumDetailAPI({ id: e.id });
      let songIds = this.getSongIds(result.songs);
      await this._initSongDetail(e, songIds.join(","));
    },
    async _initLikeList() {
      let result = await fetchLikeListAPI({ uid: this.userProfile.userId });
      let map = new Map();
      result.ids.forEach((e, i) => {
        map.set(e, true);
      });
      this.likeListIdsMap = map;
    },
    async _initSongDetail(e, ids) {
      let result = await fetchSongDetailApi({ ids });
      let songlist = [];
      result.songs.forEach((k, i) => {
        songlist.push(new Track(k, result.privileges[i]));
      });
      this.$set(e, "songlist", songlist);
    },
    handleScroll(contain) {
      let scrollTop = contain.scrollTop;
      if (this.contentOffsetHeight - scrollTop <= 550) {
        if (!this.initLock) {
          this.pageInfo.curPage++;
          this.initLock = true;
          this._initAlbumList();
        }
      }
    },
    lookAll(album) {
      album.threshold = false;
      let contain = document
        .querySelector(".ArtistDetail")
        .querySelector(".happy-scroll-container");
      let content = contain.children[0];
      this.contentOffsetHeight = content.scrollHeight;
    },
    isShowItem(album, i) {
      let threshold = album.threshold;
      if (threshold) {
        if (i < 10) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    isShwoAllBtn(album) {
      let size = album.songlist.length;
      let threshold = album.threshold;
      if (threshold) {
        if (size <= 10) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    getSongIds(songs) {
      let result = [];
      songs.forEach((e, i) => {
        result.push(e.id);
      });
      return result;
    },
  },
  components: { SongListDetail, SongListItem },
};
</script>

<style lang="less" scoped>
.AlbumItemDetail {
  width: 100%;
  padding: 30px;
  article {
    width: 100%;
    display: flex;
    justify-self: flex-start;
    margin-bottom: 40px;
    aside {
      width: 150px;
      position: relative;
      margin-right: 50px;
      img {
        border-radius: 5px;
      }
      .cipan {
        position: absolute;
        width: 25px;
        height: 180px;
        right: -25px;
        top: 3px;
        background-repeat: no-repeat;
        background-image: url("~assets/aside.png");
      }
      p {
        font-size: 12px;
        margin-top: 5px;
      }
    }
    section {
      flex: 1;
      .title {
        width: 100%;
        margin-bottom: 10px;
        color: #373737;
        span {
          font-size: 16px;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .con {
        width: 100%;
        .look_all {
          text-align: right;
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          color: #9b9b9b;
          background-color: #f9f9f9;
          padding-right: 10px;
          span:hover {
            color: #656565;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>