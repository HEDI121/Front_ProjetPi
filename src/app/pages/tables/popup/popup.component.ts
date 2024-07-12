import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DossierMedical } from 'src/app/modelsdossier/dossierMedical';
import { TablesServiceService } from 'src/app/servicedossier/TablesService.service';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  //styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  openPopup() {
    this.isVisible=true;
    
  }
  isVisible = false;
  formData : DossierMedical =  {
    rapport: '',
    description: '',
    dateCreation: new Date(),
    pdfFilePath: null ,
    dm_id: undefined,
    users: []
  };
  name: string;
  
  selectedFile: File | null = null;
  constructor(private ts : TablesServiceService) {}
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.formData.pdfFilePath = event.target.files[0];
    }
  }

  onSubmit() {
    console.log('Submitting dossier with formData:', this.formData);
    console.log('Patient Name:', this.name);
    
    this.ts.getPatientIdByName(this.name).subscribe(
      patientId => {
        console.log('Retrieved Patient ID:', patientId);
        
        this.ts.postDossier(patientId, this.formData).subscribe(
          response => {
            console.log('Dossier added successfully', response);
            this.closePopup();
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
    this.isVisible = false; // Close the popup
  }
}

 
 
