import Vuex from 'vuex'
import Vue from 'vue'

import loginModule from './modules/login'
import getters from './getters'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    loginModule
  },
  getters
})


export default store