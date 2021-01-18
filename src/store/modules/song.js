import { fetchSongListDetailApi } from "@/network/api/musicApi.js";
import { SongListDeatil } from '@/common/pojo.js'
import _ from 'lodash'



const songModule = {
  namespaced: true,
  state: {
    songListDetail: []
  },
  mutations: {
    SET_SONG_LIST_DETAIL(state, data) {
      state.songListDetail = data
    },

  },
  actions: {
    // 本地保存歌曲列表信息
    async SaveSongListDetail({ state, commit, dispatch, getters }, data) {
      let params = new URLSearchParams();
      params.append("id", data.id)
      params.append('timestamp', (new Date()).valueOf())
      let songListDetailData = await fetchSongListDetailApi(params);
      let songListDetail = new SongListDeatil(songListDetailData.playlist);
      return songListDetail;
    }

  }


}

export default songModule