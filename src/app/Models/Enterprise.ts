import {Associate} from './Associate';
import {EnterpriseBankAccount} from './EnterpriseBankAccount';

export class Enterprise {
  // tslint:disable-next-line:variable-name
  _id!: string;
  name!: string;
  address!: string;
  enterpriseActivity!: string;
  socialObject!: string;
  capital!: number;
  associates!: [Associate];
  bankAccountType!: EnterpriseBankAccount;
  constructor() {
    this.bankAccountType = new EnterpriseBankAccount();
    this.associates =  [new Associate()];
  }
}
