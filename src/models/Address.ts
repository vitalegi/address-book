export class Address {
  public name = "";
  public mails: string[] = [];
  public tags: string[] = [];

  public toString(): string {
    return `Name: ${this.name}, Mails: ${this.mails.join(
      ","
    )}, Tags: ${this.tags.join(",")}`;
  }
}

export class AddressBuilder {
  private _address: Address;

  public constructor() {
    this._address = new Address();
  }
  public name(name: string): AddressBuilder {
    this._address.name = name;
    return this;
  }
  public mails(mails: string[]): AddressBuilder {
    this._address.mails = mails;
    return this;
  }
  public tags(tags: string[]): AddressBuilder {
    this._address.tags = tags;
    return this;
  }
  public build(): Address {
    return this._address;
  }
}
