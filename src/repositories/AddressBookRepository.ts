import { Address, AddressBuilder } from "@/models/Address";
import yaml from "js-yaml";
import { WebService } from "@/utils/WebService";
import { factory } from "@/utils/ConfigLog4j";
const logger = factory.getLogger("Repositories.AddressBookRepository");

export const addresses: Address[] = [];

const toAddress = (name: string, mails: string[], tags: string[]) => {
  logger.info("toAddress");
  return new AddressBuilder()
    .name(name)
    .mails(mails)
    .tags(tags)
    .build();
};

const load = async () => {
  try {
    const response = await new WebService("/addresses.yaml")
      .get()
      .responseType("text")
      .call();
    logger.info("Loading file");
    const entries = yaml.load(response.data) as Address[];
    entries
      .map((entry) => toAddress(entry.name, entry.mails, entry.tags))
      .forEach((entry) => addresses.push(entry));
  } catch (error) {
    logger.error("Error loading addresses", error);
    throw error;
  }
};
load();