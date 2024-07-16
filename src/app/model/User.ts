import { Role } from "./role";

export class User {
  username: string;
  email: string;
  password: string;
  role: string[]; // Propriété pour le rôle sélectionné
  profileImage : any
}