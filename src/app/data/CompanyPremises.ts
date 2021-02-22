export interface CompanyPremises {
  name: string;
  description: string;
  active: boolean;
}
// @ts-ignore
export const companyPremises: [CompanyPremises] = [
  {name: 'pr', description: 'Au domicile du président (le plus courant)', active: false},
  {name: 'ddr', description: 'Domiciliation via DIRECT DU DROIT (1 mois gratuit, sans engagement)', active: false},
  {name: 'anotherDom', description: 'Dans un centre de domiciliation que vous avez déjà choisi', active: false},
  {name: 'free', description: 'Dans des locaux mis à disposition gratuitement', active: false},
  {name: 'rentedLocal', description: 'Dans les locaux que vous louez', active: false},
  {name: 'another', description: 'Autre (nursery, incubator, etc.)', active: false}
];
