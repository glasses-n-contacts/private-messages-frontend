export const setDisplaySearchResults = (state, display) => {
  state.displaySearchResults = display;
};

export const changeSearchText = (state, searchText) => {
  state.searchText = searchText;
};

export const hightlightMessageWithIndex = (state, messageIndex) => {
  state.highlightedMessageIndex = messageIndex;
};

export const setFiltered = (state, filtered) => {
  state.filtered = filtered;
};
