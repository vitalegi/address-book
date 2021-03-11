<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MainAddressBook msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MainAddressBook from '@/components/MainAddressBook.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'Home',
  components: {
    MainAddressBook,
  },
});
</script>
