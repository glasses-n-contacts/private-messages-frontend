<template>
  <v-container fluid class="messages">
    <h1>Bill Lucy Messages</h1>
    <v-layout row justify-center>
      <v-flex xs12 sm10 md8>
        <v-text-field
          id="search"
          name="search"
          label="Message Text"
          append-icon="fa-search"
          :hint="numberOfResultsText"
          v-model="searchText"
          @input="changeSearch"
          persistent-hint
        ></v-text-field>
      </v-flex>
    </v-layout>
    <paginate
      name="filteredItems"
      :list="filteredItems"
      :per="50"
      ref="paginator"
    >
      <v-layout row justify-center>
        <v-flex xs12 sm10 md8>
        <ul class="message-list">
          <li
            class="message-listitem"
            v-for="(item, index) in paginated('filteredItems')"
            v-bind:key='index'
          >
            <Message v-bind:item="item" />
          </li>
        </ul>
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
            />
            <input
              type="number"
              id="pageNum"
              @keydown="goToPage"
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
  </v-container>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
const VuePaginate = require('vue-paginate');
Vue.use(VuePaginate);

import Message from './Message.vue';

export default {
  data() {
    return {
      searchText: '',
      items: [],
      filteredItems: [],
      paginate: ['filteredItems'],
    };
  },
  computed: {
    currentPage() {
      return this.$refs.paginator
        ? this.$refs.paginator.currentPage
        : 1;
    },
    numberOfResultsText() {
      return this.searchText
        ? `${this.filteredItems.length} appearances of "${this.searchText}"`
        : ``;
    },
  },
  components: {
    Message,
  },
  mounted() {
    axios.get('http://localhost:5000/all_detailed')
      .then(res => {
        this.items = res.data;
        this.filteredItems = res.data;
      });
  },
  methods: {
    changeSearch(event) {
      if (!this.searchText) {
        this.filteredItems = this.items;
      }

      this.filteredItems = this.items.filter(item => {
        return item.message.toLowerCase()
          .includes(this.searchText.toLowerCase());
      });
    },
    goToPage(event) {
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
