<template>
  <v-layout v-if="display" row justify-center>
    <v-flex xs10 sm8 md4 id="search-banner">
        <v-icon
          size="20"
          :color="activeUp ? 'purple' : ''"
          class="chevron"
          :class="activeUp ? 'active-chevron' : ''"
          @click="onClickUp"
        >fa-chevron-up
        </v-icon>
        <v-icon
          size="20"
          :color="activeDown ? 'purple' : ''"
          class="chevron"
          :class="activeDown ? 'active-chevron' : ''"
          @click="onClickDown"
        >fa-chevron-down
        </v-icon>
      <span>{{hightlightMessageIndexInFiltered}}</span>
      <span> of </span>
      <span>{{filteredLength}}</span>
      <span> results for </span>
      <span>"{{searchText}}"</span>
      <button
        id="doneButton"
        @click="onClickDone"
      >
        Done
      </button>
    </v-flex>
  </v-layout>
</template>

<script>
const { scrollToMessage } = require('../common/utils');

export default {
  name: 'SearchBanner',
  props: {
    goToPageWithIndex: Function,
    goToFirstPage: Function,
  },
  computed: {
    hightlightMessageIndexInFiltered() {
      const msgIndex = this.$store.state.highlightedMessageIndex;
      return this.filtered.findIndex(message => message.index === msgIndex) + 1;
    },
    filtered() {
      return this.$store.state.filtered;
    },
    filteredLength() {
      return this.$store.state.filtered.length;
    },
    searchText() {
      return this.$store.state.searchText;
    },
    display() {
      return this.$store.state.displayBanner;
    },
    activeUp() {
      return this.hightlightMessageIndexInFiltered > 1;
    },
    activeDown() {
      return this.hightlightMessageIndexInFiltered < this.filteredLength;
    },
  },
  methods: {
    onClickUp() {
      if (!this.activeUp) return;
      const nextIndex =
        this.filtered[this.hightlightMessageIndexInFiltered - 2].index;
      this.goAndScrollToIndex(nextIndex);
    },
    onClickDown() {
      if (!this.activeDown) return;
      const nextIndex =
        this.filtered[this.hightlightMessageIndexInFiltered].index;
      this.goAndScrollToIndex(nextIndex);
    },
    goAndScrollToIndex(index) {
      this.$store.commit('setHightlightMessageIndex', index);
      scrollToMessage(index);
      this.goToPageWithIndex(index);
    },
    onClickDone() {
      this.$store.commit('setDisplayBanner', false);
      this.$store.commit('changeSearchText', '');
      this.goToFirstPage();
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style>
#search-banner {
  font-size: 15px;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px;
  z-index: 10;
  user-select: none;
}

#doneButton {
  float: right;
  font-weight: bold;
  color: #7200ff;
}

.chevron {
  margin-right: 15px;
}

.active-chevron {
  cursor: pointer;
}
</style>
