<template>
  <div class="RankSonglistMain">
    <article class="official">
      <h2>官方榜</h2>
      <div class="con">
        <rank-songlist-detail v-for="item in rankSonglist.slice(0,4)" :key="item.id" :rankSonglistItem="item"></rank-songlist-detail>
      </div>
    </article>
    <article class="global">
      <h2>全球榜</h2>
      <div class="con">
        <music-introduce-module
          v-for="(item,index) in rankSonglist.slice(4)"
          :key="index"
          :musicItem="item"
          width="140"
          height="140"
          :isCenterPlay="true"
          @click.native="handlePersonalizedSongList(item.id)"
        ></music-introduce-module>
      </div>
    </article>
  </div>
</template>

<script>
import {
  fetchRankSonglistAPI,
  fetchSongListDetailApi,
  fetchRankArtistAPI,
} from "@/network/api/musicApi";
import { RankSonglist, SongListDeatil, RankArtists } from "@/common/pojo";
import { loadingMixin } from "@/mixin/loadingMixin";
import MusicIntroduceModule from "../personalization/childComponents/MusicIntroduceModule.vue";
import RankSonglistDetail from "./childComponents/RankSonglistDetail.vue";
export default {
  mixins: [loadingMixin],
  data() {
    return {
      rankSonglist: [],
      singer: {
        picUrl: "",
        trackUpdateTime: "",
        list: [],
      },
    };
  },
  created() {
    this.$nextTick(() => {
      this.initLoading();
    });
    this._initRankType();
    this.endLoading();
  },
  methods: {
    async _initRankType() {
      let result = await fetchRankSonglistAPI();
      result.list.forEach((e, i) => {
        e.trackUpdateTime = this.$moment(e.trackUpdateTime).format(
          "MM月DD日更新"
        );
        this.rankSonglist.push(new RankSonglist(e));
      });

      // 前四个排行榜请求歌曲列表数据
      this.rankSonglist = this.rankSonglist.map((e, i) => {
        if (i <= 3) {
          this._initRankSonglist(e.id).then((result) => {
            e.list = result;
          });
        }
        return e;
      });
      //歌手排行榜
      this.singer.picUrl = this.tansIdentityIconUrl(
        result.artistToplist.coverUrl
      );
      this.singer.trackUpdateTime = result.artistToplist.upateFrequency;
      this._initRankArtistslist(1);
    },
    // ? 歌单中歌曲列表
    async _initRankSonglist(id) {
      let params = new URLSearchParams();
      params.append("id", id);
      let songListDetailData = await fetchSongListDetailApi(params);
      let topTrackList = songListDetailData.playlist.tracks.slice(0, 5);
      let trackItemList = [];
      topTrackList.forEach((e, i) => {
        let item = {
          id: e.id,
          name: e.name,
          ar: e.ar,
        };
        trackItemList.push(item);
      });
      return trackItemList;
    },
    // ? 获取歌手列表
    async _initRankArtistslist(type) {
      let params = new URLSearchParams();
      params.append("type", type);
      let result = await fetchRankArtistAPI(params);
      result.list.artists.forEach((e, i) => {
        if (i < 5) {
          this.singer.list.push(new RankArtists(e));
        }
      });
    },
    // ? 跳转歌单详情
    handlePersonalizedSongList(id) {
      this.$router.push({ name: "PersonalizedSongList", params: { id } });
    },
    tansIdentityIconUrl(picUrl) {
      picUrl = picUrl.replace(new RegExp("p[1-5]{1}"), "p3");
      return picUrl;
    },
  },
  components: { MusicIntroduceModule, RankSonglistDetail },
};
</script>

<style lang="less" scoped>
.RankSonglistMain {
  width: 100%;
  color: #333;
  h2 {
    margin-bottom: 20px;
  }
  .official {
    width: 100%;
  }
  .global {
    width: 100%;
    .con {
      display: flex;
      justify-content: space-between;
      align-self: flex-start;
      flex-wrap: wrap;
    }
  }
}
</style>