import { Address, AddressBuilder } from "@/models/Address";
import yaml from "js-yaml";

const entries: Address[] = [];

const tags = ["WAS", "LoadBalancer", "Portal", "Oracle", "PM", "Devs", "Run"];

for (let i = 0; i < 30; i++) {
  const entry = new AddressBuilder()
    .name("Ajeje Brazorf")
    .mails([`ajeje.brazorf@gmail.com${Math.round(i / 2)}`])
    .tags([])
    .build();
  for (let j = 0; j < i; j++) {
    const r = (n: number) => Math.round(n * Math.random());
    const str = tags[r(tags.length - 1)];
    if (entry.tags.indexOf(str) == -1) {
      entry.tags.push(str);
    }
  }
  entries.push(entry);
}

export default class AddressBookService {
  addEntry = (name: string, mails: string[], tags: string[]) => {
    entries.push(
      new AddressBuilder()
        .name(name)
        .mails(mails)
        .tags(tags)
        .build()
    );
  };
  getEntries = (searchQuery: string): Address[] => {
    return this.applySearchTerms(entries, searchQuery);
  };
  exportEntries = (): string => {
    const entries = this.getEntries("");
    return yaml.dump(entries);
  };
  importEntries = (raw: string): void => {
    const entries = yaml.load(raw) as Address[];
    entries.forEach((entry) =>
      this.addEntry(entry.name, entry.mails, entry.tags)
    );
  };
  protected applySearchTerms = (
    entries: Address[],
    searchQuery: string
  ): Address[] => {
    return entries.filter((entry) =>
      this.applySearchTermsToEntry(entry, searchQuery)
    );
  };
  protected applySearchTermsToEntry = (
    entry: Address,
    searchQuery: string
  ): boolean => {
    if (searchQuery == "") {
      return true;
    }
    const terms = searchQuery.toLowerCase().split(/(\s+)/);
    const raw = (
      entry.name +
      " " +
      entry.mails.join(" ") +
      entry.tags.join(" ")
    ).toLowerCase();
    const found = terms.filter((term) => raw.indexOf(term) !== -1);
    return found.length == terms.length;
  };
}

export const addressBookService = new AddressBookService();
