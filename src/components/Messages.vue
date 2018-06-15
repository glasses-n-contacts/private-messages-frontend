<template>
  <ul class="message-list">
    <li
      class="message-listitem"
      v-for="(item, index) in items"
      :key='index'
    >
      <Message :item="item" />
    </li>
  </ul>
</template>

<script>
import Message from './Message.vue';

export default {
  props: ['items'],
  components: {
    Message,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.message-list {
  list-style-type: none;
  padding: 0;
}

.message-listitem {
  display: block;
  margin: 0;
  clear: both;
}
</style>
