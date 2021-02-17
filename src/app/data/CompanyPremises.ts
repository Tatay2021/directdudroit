export interface CompanyPremises {
  description: string;
  active: boolean;
}
// @ts-ignore
export const companyPremises: [CompanyPremises] = [
  {description: 'Au domicile du président (le plus courant)', active: false},
  {description: 'Domiciliation via DIRECT DU DROIT (1 mois gratuit, sans engagement)', active: false},
  {description: 'Dans un centre de domiciliation que vous avez déjà choisi', active: false},
  {description: 'Dans des locaux mis à disposition gratuitement', active: false},
  {description: 'Dans les locaux que vous louez', active: false},
  {description: 'Autre (nursery, incubator, etc.)', active: false}
];
