<template>
  <v-app id="app">
    <v-content>
      <div>
        <img src="./assets/logo.png" height='200px' width='auto' />
      </div>
      <Main />
    </v-content>
  </v-app>
</template>

<script>
import Main from './components/Main.vue';
import store from './store';

export default {
  name: 'app',
  store,
  components: {
    Main,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
  padding-top: 40px;
}

@media screen and (max-width: 500px) {
  #app {
    font-size: 14px;
  }
}

html {
  background-color: white;
}
</style>
