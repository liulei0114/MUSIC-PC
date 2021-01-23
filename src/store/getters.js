const getters = {
  loginDialogStatus(state) { return state.loginModule.loginDialogStatus },
  countryList(state) { return state.countryModule.countryList },
  userProfile(state) { return state.loginModule.userProfile },
  asideMenu(state) { return state.loginModule.asideMenu },
  songListDetail(state) { return state.songModule.songListDetail },
  menu(state) { return state.loginModule.menu },
  likeMusicList(state) { return state.songModule.likeMusicMap },
  historyMusicList(state) { return state.songModule.historyMusicList },
  playMusicList(state) { return state.songModule.playMusicList }
}
export default getters
