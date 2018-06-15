<template>
  <v-list two-line>
    <template v-for="(entry, index) in entries">
      <v-subheader v-if="entry.header" :key="entry.header">{{ entry.header }}</v-subheader>
      <v-divider v-else-if="entry.divider" :inset="entry.inset" :key="index"></v-divider>
      <v-list-tile v-else :key="entry.title" avatar @click="">
        <v-list-tile-avatar>
          <img :src="entry.src">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="entry.title"></v-list-tile-title>
          <v-list-tile-sub-title v-html="entry.subtitle"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
import AvatarMe from '../assets/bill.png';
import AvatarOther from '../assets/lucy.jpg';

export default {
  props: ['items'], // message items
  computed: {
    entries() {
      return this.items.map(item => {
        return {
          title: item.message,
          subtitle: item.date_delivered,
          src: item.is_from_me ? AvatarMe : AvatarOther,
        };
      });
    },
  },
};
</script>

<style>

</style>

