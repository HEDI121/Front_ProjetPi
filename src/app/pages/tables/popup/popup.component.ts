import { Component } from '@angular/core';
import { DossierMedical } from 'src/app/modelsdossier/dossierMedical';
import { TablesServiceService } from 'src/app/servicedossier/TablesService.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
})
export class PopupComponent {
  isVisible = false;

  formData: DossierMedical = {
    rapport: '',
    description: '',
    dateCreation: new Date(),
    pdfFilePath: null,
    dm_id: undefined,
    users: [],
    patientId: undefined
  };
  name: string;
  selectedFile: File | null = null;

  constructor(private ts: TablesServiceService) {}

  openPopup() {
    this.isVisible = true;
  }

 

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.formData.pdfFilePath = event.target.files[0];
    }
  }

  onSubmit() {
    console.log('Submitting dossier with data:', this.formData);
    console.log('Patient Name:', this.name);

    this.ts.getPatientIdByName(this.name).subscribe(
      patientId => {
        console.log('Retrieved Patient ID:', patientId);
        
        this.formData.patientId = patientId; // Assigner l'ID du patient au dossier

        this.ts.postDossier(patientId ,this.formData).subscribe(
          response => {
            console.log('Dossier added successfully', response);
            this.closePopup(); // Fermer la popup après l'ajout du dossier

            // Mettre à jour la liste des dossiers après ajout
            this.ts.getDossiers().subscribe(
              dossiers => {
                console.log('Liste des dossiers mise à jour', dossiers);
                // Code pour fermer la popup ici (par exemple, utiliser une variable de contrôle pour l'affichage de la popup)
              },
              error => {
                console.error('Error fetching updated dossier list', error);
              }
            );
          },
          error => {
            console.error('Error adding dossier', error);
          }
        );
      },
      error => {
        console.error('Error fetching patient ID', error);
      }
    );
  } 
  closePopup() {
    this.isVisible = false;
  }
}
