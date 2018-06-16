import Vue from 'vue';
import Vuex from 'vuex';
const mutations = require('./mutations');

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    searchText: '',
    displaySearchResults: false,
    highlightedMessageIndex: -1,
    filtered: [],
    currentResultIndex: 0,
    displayBanner: false,
  },
  mutations,
});

if (module.hot) {
  module.hot.accept([
    './mutations',
  ], () => {
    store.hotUpdate({
      mutations: require('./mutations'),
    });
  });
}

export default store;
