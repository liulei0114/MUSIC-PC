import { getLocalProfile, setLocalProfile, removeLocalProfile, setLocalAsideMenu, getItem } from '../localStorage/logcalStorage'
import { loginPhoneApi, logoutApi, fetchUserPlayListAPi } from "@/network/api/musicApi.js";
import _ from 'lodash'

// 基础菜单列表
const orignMenu = {
  base: [
    {
      type: "classify",
      text: "发现音乐",
      show: true,
      path: "",
      icon: "",
      textIcon: "",
      optionIcon: "",
      groupBy: '0',  // 0：大标题 1；我的音乐 2：我创建的 3：收藏的歌单
      childrens: [],
    },
    {
      type: "classify",
      text: "视频",
      show: true,
      path: "",
      icon: "",
      textIcon: "",
      optionIcon: "",
      groupBy: '0',
      childrens: [],
    },
    {
      type: "classify",
      text: "朋友",
      show: true,
      path: "",
      icon: "",
      textIcon: "",
      optionIcon: "",
      groupBy: '0',
      childrens: [],
    },
    {
      type: "classify",
      text: "直播",
      show: true,
      path: "",
      icon: "",
      textIcon: "",
      optionIcon: "",
      groupBy: '0',
      childrens: [],
    },
    {
      type: "classify",
      text: "私人FM",
      show: true,
      path: "",
      icon: "",
      textIcon: "",
      optionIcon: "",
      groupBy: '0',
      childrens: [],
    }
  ],
  myMusic: [
    {
      type: "head",
      text: "我的音乐",
      show: true,
      path: "",
      icon: "",
      textIcon: "",
      optionIcon: "",
      childrens: [
        {
          type: "classify",
          text: "本地音乐",
          show: true,
          path: "",
          icon: "bendimusic",
          textIcon: "",
          optionIcon: "",
          groupBy: '1',
        },
        {
          type: "classify",
          text: "下载管理",
          show: true,
          path: "",
          icon: "download",
          textIcon: "",
          optionIcon: "",
          groupBy: '1',
        },
        {
          type: "classify",
          text: "我的音乐盘",
          show: false,
          path: "",
          icon: "yunpan",
          textIcon: "",
          optionIcon: "",
          groupBy: '1',
        },
        {
          type: "classify",
          text: "我的电台",
          show: false,
          path: "",
          icon: "diantai",
          textIcon: "",
          optionIcon: "",
          groupBy: '1',
        },
        {
          type: "classify",
          text: "我的收藏",
          show: false,
          path: "",
          icon: "shoucang",
          textIcon: "",
          optionIcon: "",
          groupBy: '1',
        },
      ],
    }
  ],
  myPlayList: [
    {
      type: "head",
      text: "创建的歌单",
      show: true,
      path: "",
      icon: "",
      textIcon: "arrow-down-filling-999",
      optionIcon: "add",
      childrens: [{
        type: "classify",
        text: "我喜欢的音乐",
        show: true,
        path: "",
        icon: "like",
        textIcon: "",
        optionIcon: "xindong",
        groupBy: '2'
      }]
    }
  ],
  myOrderList: [
    {
      type: "head",
      text: "收藏的歌单",
      show: false,
      path: "",
      icon: "",
      textIcon: "arrow-down-filling-999",
      optionIcon: "",
      childrens: [],
    }
  ]
}

const loginModule = {
  namespaced: true,
  state: {
    loginDialogStatus: false,  // 登录窗口状态
    userProfile: getLocalProfile(), // 用户信息
    asideMenu: getItem('asideMenu') ? getItem('asideMenu') : _.cloneDeep(orignMenu) // 菜单列表
  },
  mutations: {
    SET_LOGIN_DIALOG_STATUS(state, status) {
      state.loginDialogStatus = status
    },
    SET_USER_PROFILE(state, status) {
      state.userProfile = status
    },
    SET_ASIDE_MENU(state, status) {
      state.asideMenu = status
    }
  },
  actions: {
    // ? 手机登录
    async LoginByPhone({ state, commit, dispatch }, params) {
      try {
        // * 调用手机登录
        let loginPhoneRes = await loginPhoneApi(params);
        let userProfile = setLocalProfile(loginPhoneRes);
        commit('SET_USER_PROFILE', userProfile)

        // * 调用获取创建菜单
        await dispatch('FetchUserPlayListAPi');
      } catch (error) {
        throw error;
      }

    },
    // ? 退出登录
    LoginOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        logoutApi().then((result) => {
          removeLocalProfile(result);
          commit('SET_USER_PROFILE', null)
          setLocalAsideMenu(orignMenu)
          commit('SET_ASIDE_MENU', orignMenu)
          resolve()
        }).catch((err) => {
          reject(err)
        });
      })
    },
    // ? 获取歌单
    async FetchUserPlayListAPi({ state, commit }) {
      let uid = state.userProfile.userId;
      let playListRes = await fetchUserPlayListAPi({ uid })

      let _asideMenu = _.cloneDeep(orignMenu)
      if (playListRes.code === 200) {
        playListRes.playlist.forEach((e, i) => {
          if (i == 0) {  //我喜欢的
            let mylike = _asideMenu.myPlayList[0].childrens[0];
            mylike.id = e.id;
            mylike.coverImgUrl = e.coverImgUrl;
            mylike.path = 'song/list/' + e.id;
          } else {
            let temp = {};
            temp.type = 'classify'
            temp.text = e.name
            temp.show = true
            temp.path = 'song/list/' + e.id;
            temp.icon = 'qu'
            temp.textIcon = ''
            temp.optionIcon = ''
            temp.id = e.id
            temp.coverImgUrl = e.coverImgUrl
            if (e.ordered) {
              temp.groupBy = '3'
              _asideMenu.myOrderList[0].show = true;
              _asideMenu.myOrderList[0].childrens.push(temp)
            } else {
              temp.groupBy = '2';
              _asideMenu.myPlayList[0].childrens.push(temp)
            }
          }
        })
        // 把我的音乐中后三个改为true
        _asideMenu.myMusic[0].childrens.forEach((e, i) => {
          e.show = true
        })
        commit('SET_ASIDE_MENU', _asideMenu);
        setLocalAsideMenu(_asideMenu)
      } else {
        throw new Error(playListRes.message)
      }


    }

  }


}

export default loginModule