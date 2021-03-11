import { Address, AddressBuilder } from "@/models/Address";
import yaml from "js-yaml";
import { WebService } from "@/utils/WebService";
import { addresses } from "@/repositories/AddressBookRepository";
import { factory } from "@/utils/ConfigLog4j";
const logger = factory.getLogger("Services.AddressBookService");

class AddressBookService {
  getEntries = (searchQuery: string): Address[] => {
    logger.info("getEntries");
    return this.applySearchTerms(addresses, searchQuery);
  };
  exportEntries = (): string => {
    logger.info("exportEntries");
    const entries = this.getEntries("");
    return yaml.dump(entries);
  };
  importEntries = (raw: string): void => {
    logger.info("importEntries");
    const entries = yaml.load(raw) as Address[];
    entries.forEach(
      (entry) => logger.info("tmp")
      //this.addEntry(entry.name, entry.mails, entry.tags)
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
