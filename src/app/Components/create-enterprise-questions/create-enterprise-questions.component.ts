import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStep, MatStepper} from '@angular/material/stepper';
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
  active = false;
}
@Component({
  selector: 'app-create-enterprise-questions',
  templateUrl: './create-enterprise-questions.component.html',
  styleUrls: ['./create-enterprise-questions.component.scss']
})
export class CreateEnterpriseQuestionsComponent implements OnInit {
  labelPosition: 'before' | 'after' = 'after';
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
  otherActivityType: string | undefined;
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
  constructor() {
    this.associates = [new Associate()];
    this.associates.push(new Associate());
  }

  ngOnInit(): void {
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
  // Add Associate to List
  addAssociate(): void {
    this.associates.push(new Associate());
    console.log(this.associates);
  }
  // Stepper Movement Config
  goForward(stepper: MatStepper): void {
    stepper.next();
  }
  fillAssociates(): void {
    this.nextButton = !!this.associates.find(item => !item.name || !item.lastName);
  }
}
