<template>
  <div class="messages">
    <h1>Bill Lucy iMessages</h1>
    <ul>
      <li v-for='(item, index) in items' v-bind:key='index'>
        <div class="message-box" v-bind:class='item.messager ? "message-me" : "message-other"'>
          {{ item.message }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      items: []
    }
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
<style scoped>
.messages {
  text-align: left;
}

h1 {
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
  width: 80%;
  display: block;
  margin: 0 auto;
}
.message-me {
  text-align: right;
  background-color: rgb(118, 70, 255);
  color: white;
  float: right;
}
.message-other {
  text-align: left;
  background-color: #f1f0f0;
}
.message-box {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 15px;
  margin: 6px;
}
li {
  display: block;
  margin: 0 10px;
  clear: both;
}
</style>
