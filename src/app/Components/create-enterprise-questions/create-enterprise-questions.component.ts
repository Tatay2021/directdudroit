import { Component, OnInit } from '@angular/core';
import {MatStepper} from '@angular/material/stepper';
import {DateAdapter} from '@angular/material/core';
import {CompanyPremises, companyPremises} from '../../data/CompanyPremises';

interface CompanyActivities {
  name: string;
  iconPath: string;
  active: boolean;
}
interface DurationOfCreation {
  name: string;
  active: boolean;
}
class Associate {
  name!: string;
  lastName!: string;
  gender!: string;
  active!: boolean;
  generalDirector!: boolean;
  depositMoney!: number;
  percentage!: string;
  constructor() {
  }
}

interface BankAccount {
  description: string;
  logo: string;
  active: boolean;
}

@Component({
  selector: 'app-create-enterprise-questions',
  templateUrl: './create-enterprise-questions.component.html',
  styleUrls: ['./create-enterprise-questions.component.scss']
})
export class CreateEnterpriseQuestionsComponent implements OnInit {

  // Duration
  // @ts-ignore
  durationsOfCreation: [DurationOfCreation] = [
    {name: 'Le plus rapidement possible', active: false},
    {name: 'Dans la semaine', active: false},
    {name: 'Dans le mois', active: false},
    {name: 'Je ne sais pas', active: false},
  ];
  // Company Activity
  otherActivity = false;
  otherActivityType!: string;
  // @ts-ignore
  companyActivitiesExample: [CompanyActivities] = [
    {name: 'Restauration', iconPath: '', active: false},
    {name: 'BTP', iconPath: '', active: false},
    {name: 'Holding', iconPath: '', active: false},
    {name: 'Site e-commerce', iconPath: '', active: false},
    {name: 'Conseil/Consulatant', iconPath: '', active: false},
    {name: 'Transport', iconPath: '', active: false},
    {name: 'VTC/Chauffeur', iconPath: '', active: false},
    {name: 'Import/export', iconPath: '', active: false},
    {name: 'Autre...', iconPath: '', active: false},
  ];
  // President
  nextButton = true;
  // Associate
  associates: [Associate];
  // General Director
  isGeneralDirector: 'yes' | 'no' = 'no';
  isAnotherGeneralDirector = false;
  nonAssociatePresident = false;
  // BankDetails
  // @ts-ignore
  bankDetails: [BankAccount] = [
    {description: 'Avec Qonto, 100% en ligne (sans engagement) - Plus rapide', logo: '' , active: false},
    {description: 'Avec BNP Paribas (gratuit, sans engagement)', logo: 'bnp' , active: false},
    {description: 'Dans une autre banque de mon choix', logo: '' , active: false},
    {description: 'A la Caisse des Dépôts (peu fréquent)', logo: '' , active: false},
    {description: 'Chez un notaire (peu fréquent)', logo: '' , active: false},
    {description: 'Je ne sais pas encore', logo: '' , active: false},
  ];
  bnpBank!: boolean;
  bnpCustomer!: string;
  // Company Premises
  companyPremise = companyPremises;
  constructor(private adapter: DateAdapter<any>) {
    this.associates = [new Associate()];
    this.associates.push(new Associate());
  }

  ngOnInit(): void {
    this.adapter.setLocale('fr');
  }
  // Card Style Active
  clickDurationCard(cardDuration: DurationOfCreation): void {
    this.durationsOfCreation.forEach(item => item.active = false);
    cardDuration.active = true;
  }
  clickedCard(activity: CompanyActivities): void {
    this.otherActivity = false;
    this.companyActivitiesExample.forEach(item => item.active = false);
    activity.active = true;
    if (this.companyActivitiesExample[this.companyActivitiesExample.length - 1] === activity) {
      this.otherActivity = true;
    }
    console.log(this.otherActivityType);
  }
  presidentCardStyle(president: Associate): void {
    this.nonAssociatePresident = false;
    this.associates.forEach(item => item.active = false);
    president.active = true;
  }
  anotherPresidentStyle(): void {
    this.associates.forEach(item => item.active = false);
    this.nonAssociatePresident = true;
  }
  generalDirector(director: any): void {
    this.isAnotherGeneralDirector = false;
    this.associates.forEach(item => item.generalDirector = false);
    if (director instanceof Associate) {
      director.generalDirector = true;
    } else {
      this.isAnotherGeneralDirector = true;
    }
  }
  chooseBank(bankAccount: BankAccount): void {
    this.bnpBank = false;
    this.bankDetails.forEach(item => item.active = false);
    bankAccount.active = true;
    if (bankAccount === this.bankDetails.find(item => item.logo === 'bnp')) {
      this.bnpBank = true;
    }
  }
  chooseCompanyPremise(premise: CompanyPremises): void {
    this.companyPremise.forEach(item => item.active = false);
    premise.active = true;
  }

  // Add Associate to List
  addAssociate(): void {
    this.associates.push(new Associate());
  }

  // capitalSum
  calcSum(): number {
    let sum = 0;
    this.associates.forEach(item => sum += item.depositMoney);
    return sum;
  }
  calcPercentage(): void {
    this.associates.forEach(item => item.percentage = (((item.depositMoney * 100) / this.calcSum())).toFixed(2));
  }
  // Stepper Movement Config
  goForward(stepper: MatStepper): void {
    stepper.next();
  }
  fillAssociates(): void {
    this.nextButton = !!this.associates.find(item => !item.name || !item.lastName);
  }
}
