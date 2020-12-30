
const countryModule = {
  namespaced: true,
  state: {
    countryList: []
  },
  mutations: {
    SET_COUNTRY_LIST(state, data) {
      state.countryList = data
    },
  },
  actions: {

  }


}

export default countryModule