import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit  {
  
  userId = 11; // ID de l'utilisateur dont vous voulez afficher l'image
  profileImageUrl: any;
  defaultImageUrl = '/assets/img/brand/favicon.png'; // Chemin vers l'image par défaut
  thumbNail : any
  constructor(private apiService: ApiserviceService , private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadProfileImage();
  }

  loadProfileImage(): void {
    this.apiService.getProfileImage(this.userId).subscribe(
      (user: any) => {
        console.log(user)     
          let objectUrl = 'data:image/jpeg;base64,'+ user.profileImage;
          this.thumbNail = this.sanitizer.bypassSecurityTrustUrl(objectUrl)
          user.profileImage = this.thumbNail
          this.profileImageUrl = user.profileImage

    
      },
      error => {
        console.error('Failed to load profile image:', error);
        this.profileImageUrl = this.defaultImageUrl; // Charger l'image par défaut en cas d'erreur
      }
    );
  

  }

  logout(){
    
    localStorage.clear();
        

        this.router.navigate(['/examples/login'])
  }
  

}
