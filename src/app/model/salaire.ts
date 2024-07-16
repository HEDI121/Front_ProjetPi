import { User } from './User';

export class Salaire {
  Salaire_id?: number;
  montant: number;
  date_paiement: Date;
  users: User;
}