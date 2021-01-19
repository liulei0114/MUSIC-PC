<template>
  <div class="SimilarityArtist">
    <music-introduce-module
      v-for="item in simArtistList"
      :key="item.id"
      :musicItem="item"
      width="140"
      height="140"
      :isPlay="false"
      @click.native="handleArtistDetail(item)"
    ></music-introduce-module>
  </div>
</template>

<script>
import { fetchSimArtistAPI } from "@/network/api/musicApi";
import { RankArtists } from "@/common/pojo.js";
import MusicIntroduceModule from "../../personalization/childComponents/MusicIntroduceModule.vue";
export default {
  components: { MusicIntroduceModule },
  data() {
    return {
      simArtistList: [],
    };
  },
  props: {
    artistId: {
      type: String,
      default: "",
    },
  },
  created() {
    this._initSimArtist();
  },
  methods: {
    async _initSimArtist() {
      let result = await fetchSimArtistAPI({ id: this.artistId });
      result.artists.forEach((e, i) => {
        this.simArtistList.push(new RankArtists(e));
      });
    },
    handleArtistDetail(item) {
      let id = item.id;
      this.$router.push({
        name: "PersonalizedArtist",
        params: { id },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.SimilarityArtist {
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
  flex-wrap: wrap;
}
</style>