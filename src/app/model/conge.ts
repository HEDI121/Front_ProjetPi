import { User } from './user';

export interface Conge {
  congeId?: number;
  dateDebut: Date; // Utilisez string pour simplifier la manipulation des dates
  dateFin: Date;
  status: string;
  users?: User;  // Association avec l'utilisateur
}