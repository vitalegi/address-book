<template>
  <v-container>
    <v-text-field v-model="searchQuery" label="Search" @input="update" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
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
