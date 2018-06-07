<template>
  <div class="tooltip">
    <div v-if="item.message && item.message !== '\ufffc'">
      {{item.message}}
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
export default {
  name: 'message',
  props: ['item'],
  computed: {
    attachmentLink() {
      return `http://localhost:5000/attachments/${this.item.attachment}`
    },
    type() {
      if (this.item.attachment) {
        const arr = this.item.attachment.split('.')
        const imageFormats = ['jpeg', 'jpg', 'gif', 'png']
        if (imageFormats.includes(arr[arr.length - 1].toLowerCase())) {
          return 'image'
        }
        return 'file'
      }
    }
  },
  methods: {
    clickImage() {
      const win = window.open(this.attachmentLink, '_blank')
      win.focus()
    }
  }
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

img.attachment {
  max-width: 250px;
  height: auto;
  cursor: pointer;
}
</style>
