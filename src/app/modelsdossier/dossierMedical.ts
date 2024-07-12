import { User } from "./user";
export class DossierMedical {
    dm_id !: Number ;
    rapport!: string;
    description !: string;
    dateCreation !: Date;
    pdfFilePath : File | null ;
    users : User [];
}
