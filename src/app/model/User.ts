import { Conge } from './conge';
import { Salaire } from './salaire';

export interface User {
  userId: number;
  username: string;
  password: string;
  email: string;
  conge?: Conge[];
  salaire?: Salaire[];
}