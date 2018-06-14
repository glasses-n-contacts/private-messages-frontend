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
          v-model="searchText"
          v-on:input="changeSearch"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <paginate
      name="filteredItems"
      :list="filteredItems"
      :per="50"
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

    <div id="pagination-container">
      <div id="pagination">
        <paginate-links
          for="filteredItems"
          :limit="4"
          :show-step-links="true"
        />
      </div>
    </div>
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
    changeSearch: function(event) {
      if (!this.searchText) {
        this.filteredItems = this.items;
      }

      this.filteredItems = this.items.filter(item => {
        return item.message.includes(this.searchText);
      });
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
  margin: 0 10px;
  clear: both;
}

#pagination-container {
  position: relative;
  left: 50%;
  float: left;
  margin-bottom: 50px;
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
  margin-top: 60px;
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
</style>
