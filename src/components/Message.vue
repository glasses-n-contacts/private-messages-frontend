<template>
  <div
    class="tooltip message-box"
    v-bind:class='item.messager ? "message-me" : "message-other"'
  >
    <div v-if="item.message && item.message !== '\ufffc'">
      {{item.message}}
    </div>
    <div
      class="reaction"
      v-for="(reaction, idx) in reactions"
      v-bind:key="idx"
    >
      {{reaction.emoji}}
    </div>
    <div v-if="item.attachment">
      <img
        v-on:click="clickImage"
        class="attachment"
        v-if="type==='image'"
        v-bind:src="attachmentLink"
      />
      <a v-else v-bind:href="attachmentLink">{{attachmentLink}}</a>
    </div>
    <span class="tooltiptext">{{item.date_delivered}}</span>
  </div>
</template>

<script>
const emojis = require('../emojis');

export default {
  name: 'message',
  props: ['item'],
  computed: {
    attachmentLink() {
      return `http://localhost:5000/attachments/${this.item.attachment}`;
    },
    type() {
      if (this.item.attachment) {
        const arr = this.item.attachment.split('.');
        const imageFormats = ['jpeg', 'jpg', 'gif', 'png'];
        if (imageFormats.includes(arr[arr.length - 1].toLowerCase())) {
          return 'image';
        }
        return 'file';
      }
    },
    reactions() {
      if (!this.item.reactions) {
        return [];
      }
      return this.item.reactions.map(reaction => {
        const emoji = emojis[reaction.message.split(' ')[0]];
        return {
          ...reaction,
          emoji,
        };
      });
    },
  },
  methods: {
    clickImage() {
      const win = window.open(this.attachmentLink, '_blank');
      win.focus();
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
</style>
