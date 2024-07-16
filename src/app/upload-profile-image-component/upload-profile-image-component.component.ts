import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-profile-image-component',
  templateUrl: './upload-profile-image-component.component.html',
  styleUrls: ['./upload-profile-image-component.component.scss']
})
export class UploadProfileImageComponent implements OnInit {
  selectedFile: File;
  message: string;
  id: number;
  base64String : any
  constructor(
    private profileService: ApiserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id'); // Récupérer l'ID de l'utilisateur connecté
  }

  onFileSelected(event): void {
    console.log(event)
    this.selectedFile = event.target.files[0];
    const reader = new FileReader()
    reader.onload = (e:any)=>{
      this.base64String = e.target.result.split(',')[1]
    }
    reader.readAsDataURL(this.selectedFile)
  }

  onUpload(event : Event): void {

    this.profileService.uploadProfileImage(11, this.base64String).subscribe(
      response => {
        this.message = 'Image uploaded successfully.';
      },
      error => {
        this.message = 'Image uploaded successfully.';
      }
    );
  }
}
