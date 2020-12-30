const getters = {
  loginDialogStatus(state) { return state.loginModule.loginDialogStatus },
  countryList(state) { return state.countryModule.countryList },
  userProfile(state) { return state.loginModule.userProfile }
}
export default getters
