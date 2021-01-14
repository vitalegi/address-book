<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card class="mx-auto" tile>
          <basic-search @update="updateSearchQuery" />
          <selected-mails
            :mails="selectedMails"
            @remove="removeMail"
            @selectAll="selectAll"
          />
          <address-book :search-query="searchQuery" @selectMail="selectMail" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import AddressBook from "./AddressBook.vue";
import BasicSearch from "./BasicSearch.vue";
import SelectedMails from "./SelectedMails.vue";
import { addressBookService } from "@/services/AddressBookService";

export default Vue.extend({
  components: { AddressBook, BasicSearch, SelectedMails },
  name: "HelloWorld",
  data: () => ({
    searchQuery: "",
    selectedMails: new Array<string>(),
  }),
  methods: {
    updateSearchQuery(value: string) {
      this.searchQuery = value;
    },
    selectMail(mail: string) {
      if (this.selectedMails.indexOf(mail) !== -1) {
        console.log(`Mail ${mail} already selected`);
        return;
      }
      this.selectedMails.push(mail);
    },
    removeMail(mail: string) {
      const index = this.selectedMails.indexOf(mail);
      if (index === -1) {
        return;
      }
      this.selectedMails.splice(index, 1);
    },
    selectAll() {
      console.log("select all");
      const entries = this.addressBook();
      entries
        .flatMap((entry) => entry.mails)
        .forEach((mail) => this.selectMail(mail));
    },
    addressBook() {
      return addressBookService.getEntries(this.searchQuery);
    },
  },
});
</script>
