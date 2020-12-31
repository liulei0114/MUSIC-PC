const getters = {
  loginDialogStatus(state) { return state.loginModule.loginDialogStatus },
  countryList(state) { return state.countryModule.countryList },
  userProfile(state) { return state.loginModule.userProfile },
  asideMenu(state) { return state.loginModule.asideMenu }
}
export default getters
