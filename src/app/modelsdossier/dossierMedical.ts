import { User } from "./user";
export class DossierMedical {
    dm_id !: Number ;
    rapport!: string;
    description !: string;
    dateCreation !: Date;
    pdfFilePath !: string ;
    patientId !: Number;
   users : User [];
 
 
}
