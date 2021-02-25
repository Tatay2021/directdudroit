import { Component, OnInit } from '@angular/core';
import {MatStepper} from '@angular/material/stepper';
import {DateAdapter} from '@angular/material/core';
import {CompanyPremises, companyPremises} from '../../data/CompanyPremises';
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Enterprise} from '../../Models/Enterprise';
import {AssociateE} from '../../Models/AssociateE';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
  name: string;
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
  otherActivityDef!: string;
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
  // AssociateE
  associates: [Associate];
  // General Director
  isGeneralDirector: 'yes' | 'no' = 'no';
  isAnotherGeneralDirector = false;
  nonAssociatePresident = false;
  // Address
  companyAllowedAddress!: boolean;
  // BankDetails
  // @ts-ignore
  bankDetails: [BankAccount] = [
    {name: 'Qonto', description: 'Avec Qonto, 100% en ligne (sans engagement) - Plus rapide', logo: '' , active: false},
    {name: 'BNP', description: 'Avec BNP Paribas (gratuit, sans engagement)', logo: 'bnp' , active: false},
    {name: 'Banque de mon choix', description: 'Dans une autre banque de mon choix', logo: '' , active: false},
    {name: 'Caisse des Dépôts', description: 'A la Caisse des Dépôts (peu fréquent)', logo: '' , active: false},
    {name: 'Chez un notaire', description: 'Chez un notaire (peu fréquent)', logo: '' , active: false},
    {name: '', description: 'Je ne sais pas encore', logo: '' , active: false},
  ];
  bnpBank!: boolean;
  bnpCustomer!: string;
  // Company Premises
  companyPremise = companyPremises;
  isDirectDuDroitPremise!: boolean;
  address!: string;
  // Classes Management
  enterprise: Enterprise;
  constructor(private adapter: DateAdapter<any>) {
    this.associates = [new Associate()];
    this.associates.push(new Associate());
    this.enterprise = new Enterprise();
  }

  ngOnInit(): void {
    this.adapter.setLocale('fr');
  }
  // Card Style Active
  clickDurationCard(cardDuration: DurationOfCreation): void {
    this.durationsOfCreation.forEach(item => item.active = false);
    cardDuration.active = true;
    console.log(cardDuration);
    this.enterprise.createTime = cardDuration.name;
  }
  clickedCard(activity: CompanyActivities): void {
    this.otherActivity = false;
    this.companyActivitiesExample.forEach(item => item.active = false);
    activity.active = true;
    if (this.companyActivitiesExample[this.companyActivitiesExample.length - 1] === activity) {
      this.otherActivity = true;
    }
    console.log(activity);
    console.log(this.otherActivityType);
    if (activity.name !== 'Autre...') {
      this.enterprise.activity = activity.name;
    } else {
      this.enterprise.activity = this.otherActivityDef;
    }
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
    this.enterprise.bankAccountType.name = bankAccount.name;
  }
  chooseCompanyPremise(premise: CompanyPremises): void {
    this.companyAllowedAddress = false;
    this.isDirectDuDroitPremise = false;
    this.enterprise.address = '';
    this.companyPremise.forEach(item => item.active = false);
    premise.active = true;
    if (premise.name !== 'ddr'){
      this.companyAllowedAddress = true;
    } else {
      this.isDirectDuDroitPremise = true;
    }
  }

  // controls
  checkIfSelected(): boolean {
    return this.companyActivitiesExample.some(item => item.active);
  }

  // Add AssociateE to List
  addAssociate(): void {
    this.associates.push(new Associate());
    console.log(this.associates.length);
  }

  // capitalSum
  calcSum(): number {
    let sum = 0;
    this.associates.forEach(item => sum += item.depositMoney);
    this.enterprise.capital = sum;
    return sum;
  }
  calcPercentage(): void {
    this.associates.forEach(item => item.percentage = (((item.depositMoney * 100) / this.calcSum())).toFixed(2));
  }
  // Stepper Movement Config
  goForward(stepper: MatStepper): void {
    stepper.next();
  }
  goBackward(stepper: MatStepper): void {
    stepper.previous();
  }
  fillAssociates(): void {
    this.nextButton = !!this.associates.find(item => !item.name || !item.lastName);
  }
  fillEnterprise(): void {
    this.associates.forEach(item => {
      const associateE = new AssociateE();
      associateE.firstName = item.name;
      associateE.lastName = item.lastName;
      associateE.gender = item.gender;
      associateE.depositMoney = item.depositMoney;
      associateE.percentage = item.percentage;
      associateE.isPresident = item.active;
      associateE.isGeneralDirector = item.generalDirector;
      this.enterprise.associates.push(associateE);
    });
    if (!this.enterprise.address || this.enterprise.address === '') {
      this.enterprise.address = this.address;
    }
  }
  // PDF Generator

  getAssociates(step: number): [string] {
    let tab: [string];
    // @ts-ignore
    tab = [];
    if (step === 1) {
      this.associates.forEach(item => {
        tab.push(item.lastName + ' ' + item.name);
      });
    } else if (step === 2) {
      this.associates.forEach(item => {
        tab.push(item.lastName + ' ' + item.name + ' apporte une somme en numéraire de ' + item.depositMoney + ' €.');
      });
    } else {
      this.associates.forEach(item => {
        tab.push(item.lastName + ' ' + item.name + ' détient  ' + item.depositMoney / 10 + ' actions.');
      });
    }
    return tab;
  }
  pdfSignatures(): [{width: string, text: string, color: string}] {
    let tab: [{width: string, text: string, color: string}];
    // @ts-ignore
    tab = [];
    this.associates.forEach(item => tab.push({width: '30%', text: item.lastName + ' ' + item.name, color: 'red'}));
    return tab;
  }
  getPresident(): string {
    let president = '';
    if (this.enterprise.associates.some(item => item.isPresident)) {
      this.enterprise.associates.find(item => {
        if (item.isPresident) {
           president = item.lastName + ' ' + item.firstName;
        }
      });
    } else {
      president = this.enterprise.anotherPresident.lastName + ' ' + this.enterprise.anotherPresident.firstName;
    }
    return president;
  }
  generatePdf(): void{
    const documentDefinition = {
      content: [
        {
          text: 'Statuts de société par actions simplifiée',
          style: ['header', 'centerAlignment']
        },
        {
          text: this.enterprise.name + ' S.A.S.',
          style: ['companyNameAndAddress', 'centerAlignment']
        },
        {
          text: this.enterprise.address,
          style: ['centerAlignment', 'marginTop']
        },
        {
          text: 'STATUS',
          style: ['subheader', 'centerAlignment']
        },
        {
          text: 'Les soussignés :',
          style: 'marginSubtitle'
        },
        {
          ul: this.getAssociates(1)
        },
        {
          text: 'ont établi les statuts d’une société par actions simplifiée (SAS) devant exister entre eux.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article un : Forme',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'Les associés désignés dans les présents statuts ont créé une société par actions simplifiée existant entre eux et les personnes qui deviendraient actionnaires de ladite SAS. Cette SAS est régie par les dispositions légales et réglementaires en vigueur et par les présents statuts.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article deux : Objet',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'L’objet social de la société est le suivant : ' + this.enterprise.socialObject + ', ainsi que toutes opérations commerciales, financières ou juridiques se rattachant à l’objet indiqué ci-dessus (ou à un objet connexe, complémentaire ou similaire) et visant à favoriser l’activité de la société.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article trois : Dénomination',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'L’entreprise a pour dénomination ' + this.enterprise.name,
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article quatre : Siège social',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'Le siège social de la société est établi à l’adresse suivante : ' + this.enterprise.address + '. Il pourra être transféré en un autre lieu sur décision de l’assemblée des actionnaires.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article cinq : Durée',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'La société est créée pour une durée 99 années à partir de son immatriculation au RCS. Elle pourra cependant être prorogée ou dissoute par anticipation sur décision des actionnaires réunis en assemblée générale extraordinaire.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article six : Apports',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          ul: this.getAssociates(2),
          style: 'marginTopAndBottom'
        },
        {
          text: 'Tous les apports ont été versés sur un compte ouvert au nom de la société ' +
            'en formation à la banque ' + this.enterprise.bankAccountType.name + ' ' + this.enterprise.bankAccountType.address + '.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article sept : Capital social',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'Le capital s’élève à ' + this.enterprise.capital + ' €. Il est constitué de ' + (this.enterprise.capital / 10) +
            ' actions ayant chacune une valeur nominale de 10 euros. Il est réparti de la manière suivante :',
          style: 'marginTopAndBottom'
        },
        {
          ul: this.getAssociates(3),
          style: 'marginTopAndBottom'
        },
        {
          text: 'Toutes les actions sont entièrement libérées.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article huit : Caractéristiques et modalités de cession des actions',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Les actions sont nominatives. Elles font l’objet d’une inscription dans un compte ouvert par la société au nom ' +
            'de l’actionnaire, conformément aux dispositions légales et réglementaires applicables. Tout actionnaire peut demander ' +
            'une attestation d’inscription en compte et la société tient à jour la liste de ses actionnaires au moins tous les trois mois.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Elles sont librement négociables dans les conditions prévues par la loi et dans ' +
            'la mesure où elles sont entièrement libérées.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article neuf : Droits et obligations attachés aux actions',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'Chaque actionnaire est tenu d’adhérer aux présents statuts et aux décisions prises lors des assemblées. Il a droit à une fraction des bénéfices et de l’actif de la société proportionnelle au nombre d’actions qu’il détient.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article dix : Désignation et pouvoirs du président - Direction générale',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'Le président est désigné par les actionnaires réunis en assemblée générale extraordinaire.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Le premier président est ' + this.getPresident(),
          style: 'marginTopAndBottom'
        },
        {
          text: 'Il est chargé de représenter la société dans tous ses rapports avec les tiers et il dispose de tous les pouvoirs dans la limite de ceux qui sont réservés aux assemblées d’actionnaires.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Cependant, il devra demander l’autorisation de l’assemblée générale extraordinaire pour acquérir des immeubles, pour souscrire des emprunts bancaires à moyen ou long terme, pour consentir des hypothèques sur les immeubles de la société ou pour accepter d’engager celle-ci en tant que caution simple ou solidaire. Il en est de même pour toute prise de participation dans le capital d’une autre entreprise dépassant 50 000.€.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'En outre, il peut désigner un directeur général qui assure la direction générale de la société et auquel le président peut déléguer tous pouvoirs pour représenter la société envers les tiers. La désignation du directeur général devra toutefois être approuvée par l’assemblée générale extraordinaire.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Il est aussi possible de nommer le directeur général directement dans les statuts.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Si une décision prise par le président ou par le directeur général ne rentre pas dans le cadre de l’objet social, la société est engagée envers les tiers de bonne foi.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article onze : Conventions entre la société et le président',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'Toute convention conclue entre la société et le président ou un actionnaire détenant plus d’un dixième du capital ne pourra être appliquée qu’après avoir été approuvée par l’assemblée générale si elle ne concerne pas une opération courante. Il en est de même pour toute convention conclue entre la société et toute entreprise dirigée, administrée ou détenue à hauteur de plus de 5 % par l’une de ces personnes.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'L’assemblée générale des actionnaires statue sur ces conventions après avoir pris connaissance du rapport spécial des commissaires aux comptes. L’actionnaire concerné n’est pas autorisé à prendre part au vote.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article douze : Tenue des assemblées',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'Les actionnaires devront se réunir en assemblée générale ordinaire au moins une fois par an pour statuer sur les comptes clos à la fin de l’exercice écoulé et pour décider de l’affectation du résultat. Ils pourront aussi se réunir en assemblée générale extraordinaire à tout moment sur convocation du président.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'La convocation est faite au moins deux semaines avant la date prévue pour la réunion. Elle doit indiquer l’ordre du jour et les résolutions proposées aux associés.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Chaque assemblée des actionnaires est présidée par le président. Une feuille de présence est établie et signée par tous les actionnaires présents. À la fin de la séance, un procès-verbal des délibérations est établi. Il est signé par le président et par les actionnaires présents.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'L’assemblée générale ordinaire approuve les comptes de l’exercice clos si elle le juge opportun et elle décide de l’affectation du résultat. Si celui-ci est bénéficiaire, ce bénéfice, après déduction des éventuelles pertes antérieures est réparti ainsi :',
          style: 'marginTopAndBottom'
        },
        {
          ul: [
            'À hauteur de 5 % au minimum pour constituer la réserve légale jusqu’à ce que celle-ci ait atteint au moins 10 % du capital social.',
            'Un supplément doit être également mis en réserve pour répondre aux autres exigences légales (notamment pour maintenir l’actif net à un montant égal au montant minimal exigé pour le capital social).',
            'Le surplus est réparti entre les réserves facultatives et une distribution de dividendes éventuelle',
          ],
          style: 'marginTopAndBottom'
        },
        {
          text: 'L’assemblée générale extraordinaire a compétence exclusive pour prendre toute décision aboutissant à une modification des présents statuts ou pour laquelle le président doit obtenir son accord.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article treize : Quorum et majorité',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'Pour que l’assemblée puisse délibérer valablement, les actionnaires présents ou représentés doivent posséder au moins 25 % du capital social. Si ce quorum n’est pas atteint, une seconde assemblée doit être convoquée et elle peut délibérer valablement si les actionnaires présents ou représentés détiennent au moins 20 % du capital social.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article quatorze : Exercice social',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'L\'exercice social commence le 1er janvier de chaque année et se termine le 31 décembre.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Le premier exercice social comprendra le temps à courir à compter de la date de l\'immatriculation de la Société au Registre du Commerce et des Sociétés jusqu\'au 31/12 ',
          margin: [0, 10, 0, 0]
        },
        {
          text: '2021',
          margin: [0, 0, 0, 10],
          color: 'red',
          bold: true
        },
        {
          text: 'Article quinze : Tenue des comptes et information des actionnaires',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'Le président doit veiller à ce qu’une comptabilité conforme aux lois en vigueur soit tenue.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Il doit établir le bilan, le compte de résultats, les annexes et le rapport de gestion dans le mois qui suit la clôture de chaque exercice. Ces documents ainsi que le rapport de gestion devront être envoyés aux actionnaires en même temps que les convocations aux assemblées générales ordinaires.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article seize : Contribution des actionnaires aux pertes et au passif',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'Chaque actionnaire est tenu du passif social à concurrence de ses apports en capital.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article dix-sept : Prorogation de la société',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'Le président devra convoquer les actionnaires en assemblée générale au moins un an avant la date d’expiration de la durée de la société. Lors de cette assemblée, les actionnaires décideront s’ils prorogent la société et pour quelle durée.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article dix-huit : Dissolution',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'La société pourra être dissoute par anticipation dans l’un des cas suivants :',
          style: 'marginTopAndBottom'
        },
        {
          ul: ['Décision collective des actionnaires.', 'Décision de justice.', 'Décès de tous les actionnaires.'],
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article dix-neuf : Liquidation',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'En cas de dissolution, la société est placée d’office en liquidation. Dans ce cas, sa dénomination sociale doit être suivie des mots « société en liquidation » sur tous les documents destinés aux tiers. Le liquidateur est désigné et ses pouvoirs sont fixés lors de l’assemblée qui décide la dissolution.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Pendant la liquidation, le liquidateur représente la société et il procède à la vente des éléments d’actifs et au paiement des dettes.',
          margin: [0, 0, 0, 10]
        },
        {
          text: 'Article vingt : Contestations',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'Tous litiges pouvant se produire entre les actionnaires relèveront du tribunal de grande instance dont dépend le siège social.',
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article vingt-et-un : Actes effectués pour le compte de la société en formation - Personnalité morale',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: ['Un état des démarches et des actes effectués pour le compte de la société en formation est joint en annexe aux présents statuts. La signature desdits statuts impliquera la reprise de ces actes par la société après l’immatriculation de celle-ci au RCS de ',
            {
              text: this.enterprise.RCS,
              color: 'red'
            },
            {
              text: ' Dès son immatriculation au RCS, la société jouira de la personnalité morale.'
            }
          ],
          style: 'marginTopAndBottom'
        },
        {
          text: 'Article vingt-trois : Frais et formalités de publicité',
          style: ['marginTopAndBottom', 'subtitleStyle']
        },
        {
          text: 'La société prendra en charge les frais d’impression des présents statuts et d’insertion des avis légaux. Le président ou un mandataire habilité accomplira toutes ces formalités.',
          style: 'marginTopAndBottom'
        },
        {
          text: [
            {text: 'Fait le '},
            {text: '. . / . . / . . . . ', color: 'red'},
            {text: 'à '},
            {text: '.............., ...........', color: 'red'},
            {text: ' en '},
            {text: '3', color: 'red'},
            {text: ' exemplaires.'},
          ],
          margin: [0, 40, 0, 40]
        },
        {
          columns: this.pdfSignatures()
        }
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          margin: [0, 20, 0, 0]
        },
        subheader: {
          fontSize: 15,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        companyNameAndAddress: {
          fontSize: 16,
          bold: true,
          margin: [0, 40, 0, 0]
        },
        marginSubtitle: {
          margin: [0, 40, 0, 15]
        },
        marginTop: {
          margin: [0, 5, 0, 0]
        },
        centerAlignment: {
          alignment: 'center'
        },
        subtitleStyle: {
          fontSize: 16,
          bold: true,
        },
        marginTopAndBottom: {
          margin: [0, 10, 0, 10]
        },
        redText: {
          color: 'red',
          fontSize: 12,
          italics: true,
        }
      }
    };
    pdfMake.createPdf(documentDefinition).open();
  }

}
