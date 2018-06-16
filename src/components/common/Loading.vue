<template>
  <div id="loadingCircle">
    <v-progress-circular
      :size="70"
      :width="5"
      indeterminate
      color="purple"
    >
    </v-progress-circular>
  </div>
</template>

<style>
#loadingCircle {
  margin-top: 50px;
  text-align: center;
}
</style>
