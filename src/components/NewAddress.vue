<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-text-field
          label="Raw mail"
          v-model="raw"
          placeholder="Foo Bar <foo.bar@gmail.com>"
          @input="importRaw()"
        />
        <v-text-field
          label="Name"
          v-model="name"
          placeholder="Name (Foo Bar)"
        />
        <v-text-field
          label="Email"
          v-model="mails"
          placeholder="Email addresses (foo@gmail.com bar@me.com)"
        />
        <v-combobox
          v-model="tags"
          :items="availableTags"
          chips
          clearable
          label="Tags"
          multiple
          prepend-icon="mdi-filter-variant"
          solo
        >
          <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              close
              @click="select"
              @click:close="remove(item)"
            >
              <strong>{{ item }}</strong>
            </v-chip>
          </template>
        </v-combobox>
      </v-card-text>
      <v-divider class="mt-12"></v-divider>
      <v-card-actions>
        <v-btn text> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="submit"> Submit </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { addressBookService } from "@/services/AddressBookService";

export default Vue.extend({
  name: "NewAddress",
  computed: {},
  data: () => ({
    raw: "",
    name: "",
    mails: "",
    tags: new Array<string>(),
    availableTags: ["aaa", "bbb", "abc", "bcd", "EEee"],
  }),
  methods: {
    importRaw() {
      const raw = this.raw.trim();
      const nameEmailMatcher = /^([^<]+)<([^>]+)>$/;
      const matches = nameEmailMatcher.exec(raw);
      if (matches !== null) {
        const cleanName = matches ? matches[1].trim() : raw;
        const cleanMail = matches ? matches[2].trim() : "";
        console.log(
          `Update name and email. Raw ${raw} contains an email: ${cleanName} / ${cleanMail}`
        );
        this.name = cleanName;
        this.mails = cleanMail;
      }
    },
    submit() {
      let mails = this.mails.replaceAll(";", " ");
      mails = mails.replaceAll(",", " ");
      while (mails.indexOf("  ") !== -1) {
        mails = mails.replaceAll("  ", " ");
      }
      addressBookService.addEntry(this.name, mails.split(" "), this.tags);
    },
    remove(item: any) {
      console.log(`Remove`, item);
    },
  },
});
</script>

<style lang="scss" scoped>
.v-chip {
  margin-right: 4px;
  margin-bottom: 2px;
}
</style>
