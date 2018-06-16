import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    searchText: '',
    displaySearchResults: false,
    highlightedMessageIndex: -1,
  },
  mutations: {
    setDisplaySearchResults(state, display) {
      state.displaySearchResults = display;
    },
    changeSearchText(state, searchText) {
      state.searchText = searchText;
    },
    hightlightMessageWithIndex(state, messageIndex) {
      state.highlightedMessageIndex = messageIndex;
    },
  },
});

export default store;
