<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="searchQuery" label="Search" @input="update" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { addressBookService } from "@/services/AddressBookService";
import About from "@/views/About.vue";

export default Vue.extend({
  components: { About },
  name: "BasicSearch",
  data: () => ({
    searchQuery: "",
  }),
  methods: {
    update() {
      this.$emit("update", this.searchQuery);
    },
  },
});
</script>
