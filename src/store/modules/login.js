import { getLocalProfile, setLocalStorage, removeLocalProfile } from '../localStorage/logcalStorage'
import { loginPhoneApi, logoutApi } from "@/network/api/musicApi.js";
const loginModule = {
  namespaced: true,
  state: {
    loginDialogStatus: false,  // 登录窗口状态
    userProfile: getLocalProfile()
  },
  mutations: {
    SET_LOGIN_DIALOG_STATUS(state, status) {
      state.loginDialogStatus = status
    },
    SET_USER_PROFILE(state, status) {
      state.userProfile = status
    }
  },
  actions: {
    // * 手机登录
    LoginByPhone({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        loginPhoneApi(params).then((result) => {
          let userProfile = setLocalStorage(result);
          commit('SET_USER_PROFILE', userProfile)
          resolve(userProfile)
        }).catch((err) => {
          reject(err)
        });
      })
    },
    // * 退出登录
    LoginOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        logoutApi().then((result) => {
          removeLocalProfile(result);
          commit('SET_USER_PROFILE', null)
          resolve()
        }).catch((err) => {
          reject(err)
        });
      })
    }
  }


}

export default loginModule