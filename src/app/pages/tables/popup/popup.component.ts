import { Component } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  //styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  isVisible = false;
  formData = {
    name: '',
    description: ''
  };
  selectedFile: File | null = null;

  openPopup() {
    this.isVisible = true;
  }

  closePopup() {
    this.isVisible = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.formData.name && this.formData.description && this.selectedFile) {
      console.log('Form Data:', this.formData);
      console.log('Selected File:', this.selectedFile);

      // Perform further processing here (e.g., send data to a server)
      
      this.closePopup();
    } else {
      alert('Please fill all the fields and upload a PDF file.');
    }
  }
}
