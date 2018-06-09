<template>
  <div class="messages">
    <h1>Bill Lucy iMessages</h1>
    <paginate
      name="items"
      :list="items"
      :per="50"
    >
      <ul class="message-list">
        <li class="message-listitem" v-for="(item, index) in paginated('items')" v-bind:key='index'>
          <div class="message-box" v-bind:class='item.messager ? "message-me" : "message-other"'>
            <Message v-bind:item="item" />
          </div>
        </li>
      </ul>
    </paginate>

    <div id="pagination-container">
      <div id="pagination">
        <paginate-links
          for="items"
          :limit="4"
          :show-step-links="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
const VuePaginate = require('vue-paginate')
Vue.use(VuePaginate)

import Message from './Message.vue'

export default {
  data() {
    return {
      items: [],
      paginate: ['items']
    }
  },

  components: {
    Message
  },

  mounted() {
    axios.get('http://localhost:5000/imessages')
      .then(res => {
        this.items = res.data
      })
  }
}
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
  width: 80%;
  display: block;
  margin: 0 auto;
}
.message-me {
  background-color: rgb(118, 70, 255);
  color: white;
  float: right;
}
.message-other {
  background-color: #f1f0f0;
}
.message-box {
  max-width: 60%;
  display: inline-block;
  padding: 6px 12px;
  border-radius: 15px;
  margin: 6px;
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
