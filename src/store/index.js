import Vuex from 'vuex'
import Vue from 'vue'

import loginModule from './modules/login'
import countryModule from './modules/country'
import getters from './getters'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    loginModule,
    countryModule
  },
  getters
})


export default store