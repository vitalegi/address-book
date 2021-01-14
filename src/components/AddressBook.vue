<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="name">Name</th>
            <th class="mails">Mail</th>
            <th class="tags">Tag</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(address, index) in addressBook" :key="index">
            <td class="name">{{ address.name }}</td>
            <td class="mails">
              <v-chip
                v-for="mail in address.mails"
                :key="mail.value"
                @click="selectMail(mail)"
              >
                {{ mail }}
              </v-chip>
            </td>
            <td class="tags">
              <v-chip
                :disabled="false"
                v-for="tag in address.tags"
                :key="tag.value"
              >
                {{ tag }}
              </v-chip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { addressBookService } from "@/services/AddressBookService";

export default Vue.extend({
  name: "AddressBook",
  props: ["searchQuery"],
  computed: {
    addressBook: function () {
      return addressBookService.getEntries(this.searchQuery);
    },
  },
  data: () => ({}),
  methods: {
    selectMail(mail: string) {
      console.log("select " + mail);
      this.$emit("selectMail", mail);
    },
  },
});
</script>

<style lang="scss" scoped>
.v-chip {
  margin-right: 4px;
  margin-bottom: 2px;
}
.name {
  width: 25%;
  text-align: left;
}
.mails {
  width: 30%;
  text-align: left;
}
.tags {
  width: 45%;
  text-align: left;
}
</style>
