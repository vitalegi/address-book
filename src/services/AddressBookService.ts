import { Address, AddressBuilder } from "@/models/Address";
import yaml from "js-yaml";
import { WebService } from "@/utils/WebService";
import { factory } from "@/utils/ConfigLog4j";
const logger = factory.getLogger("Services.AddressBookService");

const entries: Address[] = [];

class AddressBookService {
  init() {
    new WebService("/addresses.yaml")
      .get()
      .responseType("text")
      .call()
      .then(
        (response) => {
          logger.info("Loading file");
          const entries = yaml.load(response.data) as Address[];
          entries.forEach((entry) =>
            this.addEntry(entry.name, entry.mails, entry.tags)
          );
        },
        (error) => {
          logger.error("Error loading addresses", error);
        }
      );
  }

  addEntry = (name: string, mails: string[], tags: string[]) => {
    logger.info("addEntry");
    entries.push(
      new AddressBuilder()
        .name(name)
        .mails(mails)
        .tags(tags)
        .build()
    );
  };
  getEntries = (searchQuery: string): Address[] => {
    logger.info("getEntries");
    return this.applySearchTerms(entries, searchQuery);
  };
  exportEntries = (): string => {
    logger.info("exportEntries");
    const entries = this.getEntries("");
    return yaml.dump(entries);
  };
  importEntries = (raw: string): void => {
    logger.info("importEntries");
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
addressBookService.init();
