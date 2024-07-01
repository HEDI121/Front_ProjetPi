import { User } from './user';

export interface Conge {
  congeId?: number;
  dateDebut: string; // Utilisez string pour simplifier la manipulation des dates
  dateFin: string;
  status: string;
  users: User; // Association avec l'utilisateur
}