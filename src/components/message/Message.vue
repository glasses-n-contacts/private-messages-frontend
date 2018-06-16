<template>
  <div
    class="tooltip message-box"
    :class='item.is_from_me ? "message-me" : "message-other"'
    :id="item.index"
  >
    <div
      v-if="item.message && item.message !== '\ufffc'"
    >
      <span
        v-for="(component, index) in textComponents"
        :key="item.index + ' ' + index"
        v-html="component"
      />
    </div>
    <div
      class="reaction"
      v-for="(reaction, idx) in reactions"
      :key="'reaction'+idx"
    >
      {{reaction.emoji}}
    </div>
    <div
      v-for="(attachment, index) in item.attachments"
      :key="index">
      <Attachment :item="attachment" />
    </div>
    <span class="tooltiptext">{{item.date_delivered}}</span>
  </div>
</template>

<script>
const emojis = require('../common/emojis');

import Attachment from './Attachment.vue';

export default {
  name: 'message',
  props: ['item'],
  components: {
    Attachment,
  },
  computed: {
    textComponents() {
      const message = this.item.message;
      const search = this.$store.state.searchText;
      if (!this.isHighlighted) {
        return [`<span>${message}</span>`];
      }
      const index = message.toLowerCase().indexOf(search.toLowerCase());
      return [
        `<span>${message.substring(0, index)}</span>`,
        `<span class='highlighted'>${message.substring(index, index + search.length)}</span>`,
        `<span>${message.substring(index + search.length)}</span>`,
      ];
    },
    isHighlighted() {
      return this.$store.state.highlightedMessageIndex === this.item.index;
    },
    reactions() {
      if (!this.item.reactions) {
        return [];
      }
      return this.item.reactions.map(reaction => {
        if (reaction.has_emoji) {
          return reaction;
        }

        const emoji = emojis[reaction.message.split(' ')[0]];
        return {
          ...reaction,
          emoji,
        };
      });
    },
  },
};
</script>

<style>
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.reaction {
  position: absolute;
  top: -5px;
}

.message-me > .reaction {
  left: -5px;
}

.message-other > .reaction {
  right: -5px;
}

img.attachment {
  max-width: 250px;
  height: auto;
  cursor: pointer;
}

.message-box {
  max-width: 60%;
  display: inline-block;
  padding: 6px 12px;
  border-radius: 15px;
  margin: 6px;
}

.message-me {
  background-color: rgb(118, 70, 255);
  color: white;
  float: right;
}

.message-other {
  background-color: #f1f0f0;
}

.highlighted {
  background-color: #fc0;
  border-radius: .3em;
  box-shadow: 2px 0 #ffcc00, -2px 0 #fc0;
  padding: 2px 0;
}
</style>
