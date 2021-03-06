import { fetchSongListDetailApi, fetchLikeListAPI, fetchHistoryMusicListAPI, fetchSongDetailApi } from "@/network/api/musicApi.js";
import { SongListDeatil, Track } from '@/common/pojo.js'
import _ from 'lodash'



const songModule = {
  namespaced: true,
  state: {
    songListDetail: [],
    likeMusicMap: null,
    historyMusicList: null,
    playMusicList: [],
    playListDrawerStatus: false,
    curPlaySongIndex: 0,
    curPlaySongId: '',
    songMainStatus: false,
    songPlayStatus: false
  },
  mutations: {
    SET_SONG_LIST_DETAIL(state, data) {
      state.songListDetail = data
    },
    SET_LIKE_MUSIC_MAP(state, data) {
      state.likeMusicMap = data
    },
    SET_HISTORY_MUSIC_LIST(state, data) {
      state.historyMusicList = data
    },
    SET_PLAY_MUSIC_LIST(state, data) {
      state.playMusicList = data
    },
    SET_PLAY_LIST_DRAWER_STATUS(state, data) {
      state.playListDrawerStatus = data
    },
    SET_CUR_PLAY_SONG_INDEX(state, data) {
      state.curPlaySongIndex = data
    },
    SET_CUR_PLAY_SONG_ID(state, data) {
      state.curPlaySongId = data
    },
    SET_SONG_MAIN_STATUS(state, data) {
      state.songMainStatus = data
    },
    SET_SONG_PLAY_STATUS(state, data) {
      state.songPlayStatus = data
    }
  },
  actions: {
    // ? 本地保存歌曲列表信息
    async SaveSongListDetail({ state, commit, dispatch, rootGetters }, data) {
      let params = new URLSearchParams();
      params.append("id", data.id)
      params.append('timestamp', (new Date()).valueOf())
      let songListDetailData = await fetchSongListDetailApi(params);
      let songListDetail = new SongListDeatil(songListDetailData.playlist);
      return songListDetail;
    },
    // ? 保存所有我喜欢的音乐 
    async SaveLikeMusicList({ state, commit, dispatch, rootGetters }) {
      let uid = rootGetters.userProfile.userId;
      let result = await fetchLikeListAPI({
        uid,
        timestamp: new Date().valueOf(),
      });
      let likeMap = {}
      result.ids.forEach((e, i) => {
        likeMap[e] = true;
      });
      commit('SET_LIKE_MUSIC_MAP', likeMap)
    },
    // ? 保存用户历史播放记录
    async SaveHistoryMusicList({ rootGetters, commit }) {
      let uid = rootGetters.userProfile.userId;
      let result = await fetchHistoryMusicListAPI({
        uid,
        timestamp: new Date().valueOf(),
        type: 1
      });
      let hisMusicIds = []

      result.weekData.forEach((e, i) => {
        hisMusicIds.push(e.song.id)
      });
      let hisMusicList = []
      if (hisMusicIds.length !== 0) {
        let songDetail = await fetchSongDetailApi({ ids: hisMusicIds.join(',') })
        songDetail.songs.forEach((e, i) => {
          hisMusicList.push(new Track(e, songDetail.privileges[i]));
        })
      }
      commit('SET_HISTORY_MUSIC_LIST', hisMusicList)

    }
  }


}

export default songModule