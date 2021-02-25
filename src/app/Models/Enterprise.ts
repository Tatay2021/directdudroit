import {AssociateE} from './AssociateE';
import {EnterpriseBankAccount} from './EnterpriseBankAccount';
import {AnotherDirector} from './AnotherDirector';
import {GeneralDirector} from './GeneralDirector';

export class Enterprise {
  // tslint:disable-next-line:variable-name
  _id!: string;
  name!: string;
  address!: string;
  enterpriseActivity!: string;
  socialObject!: string;
  capital!: number;
  email!: string;
  phoneNumber!: number;
  createTime!: string;
  associates!: [AssociateE];
  bankAccountType!: EnterpriseBankAccount;
  activity!: string;
  RCS!: string;
  anotherPresident!: AnotherDirector;
  generalDirector!: GeneralDirector;
  constructor() {
    this.bankAccountType = new EnterpriseBankAccount();
    // @ts-ignore
    this.associates = [];
    this.anotherPresident = new AnotherDirector();
    this.generalDirector = new GeneralDirector();
  }
}
