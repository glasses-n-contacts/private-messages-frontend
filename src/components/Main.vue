<template>
  <v-container fluid class="messages">
    <h1>Bill Lucy Messages</h1>
    <SearchBanner
      :goToPageWithIndex="goToPageWithIndex"
      :goToFirstPage="goToFirstPage"
    />
    <Loading v-if="!this.items.length" />
    <div v-else>
      <v-layout row justify-center>
        <v-flex xs12 sm10 md8>
          <v-text-field
            id="search"
            name="search"
            label="Message Text"
            append-icon="fa-search"
            :hint="numberOfResultsText"
            :value="searchText"
            persistent-hint
            @input="changeSearch"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <paginate
        name="filteredItems"
        :list="filteredItems"
        :per="messagesPerPage"
        ref="paginator"
      >
        <v-layout row justify-center>
          <v-flex xs12 sm10 md8>
            <SearchResults
              v-if="displaySearchResults"
              :items="paginated('filteredItems')"
              :goToPageWithIndex="goToPageWithIndex"
            />
            <Messages
              v-else
              :items="paginated('filteredItems')"
            />
          </v-flex>
        </v-layout>
      </paginate>

      <v-layout row justify-center>
        <v-flex xs12 sm10 md8>
          <div id="pagination-container">
            <div id="pagination">
              <paginate-links
                for="filteredItems"
                :limit="4"
                :show-step-links="true"
                :async="true"
              />
              <input
                type="number"
                id="pageNum"
                @keydown="goToPageWithInput"
                @focus="clearInputPage"
                :placeholder="currentPage"
              />
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex id="result-count" xs12 sm10 md8>
          <span v-if="$refs.paginator">
            Viewing {{$refs.paginator.pageItemsCount}} results
          </span>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
const VuePaginate = require('vue-paginate');
Vue.use(VuePaginate);

import Messages from './list/Messages.vue';
import SearchResults from './list/SearchResults.vue';
import Loading from './common/Loading.vue';
import SearchBanner from './search/SearchBanner.vue';
const { messagesPerPage } = require('../config');

export default {
  data() {
    return {
      items: [],
      paginate: ['filteredItems'],
      messagesPerPage,
    };
  },
  computed: {
    searchText() {
      return this.$store.state.searchText;
    },
    currentPage() {
      return this.$refs.paginator
        ? this.$refs.paginator.currentPage
        : 1;
    },
    numberOfResultsText() {
      return this.searchText
        ? `${this.filteredLength} appearances of "${this.searchText}"`
        : ``;
    },
    filteredItems() {
      if (this.displaySearchResults) {
        const filtered = this.items.filter(item => {
          return item.message.toLowerCase()
            .includes(this.searchText.toLowerCase());
        });
        this.$store.commit('setFiltered', filtered);
        return filtered;
      }

      return this.items;
    },
    filteredLength() {
      return this.$store.state.filtered.length;
    },
    displaySearchResults() {
      return this.$store.state.displaySearchResults;
    },
  },
  components: {
    Messages,
    SearchResults,
    Loading,
    SearchBanner,
  },
  mounted() {
    axios.get('http://localhost:5000/all_detailed')
      .then(res => {
        this.items = res.data;
        this.items.forEach((item, index) => {
          item.index = index;
        });
      });
  },
  methods: {
    changeSearch(input) {
      this.$store.commit('changeSearchText', input);
      this.$store.commit('setDisplayBanner', false);
      if (input) {
        this.$store.commit('setDisplaySearchResults', true);
      } else {
        this.$store.commit('setDisplaySearchResults', false);
      }
      this.goToFirstPage();
    },
    goToPageWithInput(event) {
      if (event.keyCode === 13) {
        if (this.$refs.paginator) {
          this.$refs.paginator.goToPage(event.target.value);
          document.activeElement.blur();
        }
      }
    },
    clearInputPage(event) {
      event.target.value = '';
    },
    goToPageWithIndex(messageIndex) {
      const pageIndex = Math.ceil((messageIndex + 0.1) / messagesPerPage);
      this.waitAndGoToPage(pageIndex);
    },
    waitAndGoToPage(pageIndex) {
      if (this.$refs.paginator.list.length !== this.items.length) {
        // wait 50 millisecnds then recheck
        // the best solution I found, albeit a hack
        setTimeout(this.waitAndGoToPage, 50, pageIndex);
        return;
      }
      this.$refs.paginator.goToPage(pageIndex);
    },
    goToFirstPage() {
      this.$refs.paginator.goToPage(1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.messages {
  text-align: left;
}

h1 {
  text-align: center;
}

.message-list {
  list-style-type: none;
  padding: 0;
}

.message-listitem {
  display: block;
  margin: 0;
  clear: both;
}

#pagination-container {
  position: relative;
  left: 50%;
  float: left;
  clear: both;
}

#pagination {
  position: relative;
  left: -50%;
  float: left;
}

ul {
  -webkit-padding-start: 0;
}

ul.paginate-links {
  margin-top: 40px;
  display: inline-block;
}

ul.paginate-links > li {
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;
  width: 15px;
  user-select: none;
}

ul.paginate-links > li.active {
  font-weight: bold
}

#result-count {
  text-align: center;
  margin-bottom: 50px;
}

#pageNum {
  border-style: inset;
  border-color: #00000038;
  border-width: 1px;
  border-radius: 5px;
  width: 50px;
  text-align: center;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  opacity: 0.3; /* Firefox */
}
</style>
