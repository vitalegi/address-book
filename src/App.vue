<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h1 class="d-flex align-center">
        Address Book
      </h1>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <MainAddressBook/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import MainAddressBook from './components/MainAddressBook.vue';

export default Vue.extend({
  name: 'App',

  components: {
    MainAddressBook,
  },

  data: () => ({
    //
  }),
});
</script>
