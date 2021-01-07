import Vuex from 'vuex'
import Vue from 'vue'

import loginModule from './modules/login'
import countryModule from './modules/country'
import songModule from './modules/song'
import getters from './getters'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    loginModule,
    countryModule,
    songModule
  },
  getters
})


export default store