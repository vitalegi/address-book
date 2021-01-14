<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-btn @click="toClipboard()" color="primary" icon outlined>
          <v-icon> mdi-clipboard-outline </v-icon>
        </v-btn>
        <v-btn @click="selectAll()" color="primary" icon outlined>
          <v-icon> mdi-book-plus-multiple </v-icon>
        </v-btn>
        <v-btn @click="removeMails()" color="error" icon outlined >
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="10" class="mails">
        <v-chip
          v-for="(mail, index) in mails"
          :key="index"
          @click="removeMail(mail)"
        >
          {{ mail }}
        </v-chip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { addressBookService } from "@/services/AddressBookService";
import ArrayUtil from "@/utils/ArrayUtil";

export default Vue.extend({
  components: {},
  name: "SelectedMails",
  props: ["mails"],
  data: () => ({}),
  methods: {
    update() {
      //this.$emit("update", this.searchQuery);
    },
    toClipboard() {
      navigator.clipboard.writeText(this.mails.join("; "));
    },
    removeMail(mail: string) {
      console.log(`Remove ${mail}`);
      this.$emit("remove", mail);
    },
    removeMails() {
      const mails: string[] = ArrayUtil.copyList(this.mails);
      for (let mail of mails) {
        this.removeMail(mail);
      }
    },
    selectAll() {
      this.$emit("selectAll");
    }
  },
});
</script>

<style lang="scss" scoped>
.v-chip {
  margin-right: 4px;
  margin-bottom: 2px;
}
.mails {
  text-align: left;
}
button + button {
    margin-left: 10px;
}
</style>
