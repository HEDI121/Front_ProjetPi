import { User } from "./user";
export class DossierMedical {
    Dm_id !: Number ;
    rapport!: string;
    description !: string;
    dateCreation !: Date;
    pdfFilePath !: string;
    users : User [];
}



