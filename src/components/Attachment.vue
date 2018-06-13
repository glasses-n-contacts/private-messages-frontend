<template>
  <img
    v-if="type==='image'"
    v-on:click="clickFile"
    class="attachment"
    v-bind:src="attachmentLink"
  />
  <a
    v-else
    href="javascript:void(0)"
    v-on:click="clickFile"
  >
    {{attachmentFilename}}
  </a>
</template>

<script>
export default {
  name: 'attachment',
  props: ['item'],
  computed: {
    attachmentLink() {
      return this.item.url;
    },
    attachmentFilename() {
      return this.item.filename ||
        this.attachmentLink.substring(this.attachmentLink.lastIndexOf('/') + 1);
    },
    type() {
      let link = this.attachmentLink;
      if (link.includes('?')) {
        link = link.substring(0, link.indexOf('?'));
      }

      const arr = link.split('.');
      const imageFormats = ['jpeg', 'jpg', 'gif', 'png'];
      if (imageFormats.includes(arr[arr.length - 1].toLowerCase())) {
        return 'image';
      }
      return 'file';
    },
  },
  methods: {
    clickFile() {
      const win = window.open(this.attachmentLink, '_blank');
      win.focus();
    },
  },
};
</script>

<style>
img.attachment {
  max-width: 250px;
  height: auto;
  cursor: pointer;
}
</style>
