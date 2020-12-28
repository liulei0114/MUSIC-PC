
const loginModule = {
  namespaced: true,
  state: {
    loginDialogStatus: false
  },
  mutations: {
    SET_LOGIN_DIALOG_STATUS(state, status) {
      state.loginDialogStatus = status
    },


  },
  actions: {

  }


}

export default loginModule