import { Conge } from './conge';

export interface User {
  userId?: number;
  username: string;
  password: string;
  email: string;
  conge?: Conge[]; // Liste des congés associés
}