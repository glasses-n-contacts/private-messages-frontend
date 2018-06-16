const setDisplaySearchResults = (state, display) => {
  state.displaySearchResults = display;
};

const changeSearchText = (state, searchText) => {
  state.searchText = searchText;
};

const setHightlightMessageIndex = (state, messageIndex) => {
  state.highlightedMessageIndex = messageIndex;
};

const setFiltered = (state, filtered) => {
  state.filtered = filtered;
};

const setDisplayBanner = (state, display) => {
  state.displayBanner = display;
};

module.exports = {
  setDisplaySearchResults,
  changeSearchText,
  setHightlightMessageIndex,
  setFiltered,
  setDisplayBanner,
};
