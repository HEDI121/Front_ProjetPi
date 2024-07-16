import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { Router } from '@angular/router';
import { _ } from 'ajv';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent {
  totalUsers: number;
  totalDoctors: number;
  totalPatients: number;
  totalAdmins: number;
  users: any[];

  constructor(private userService: ApiserviceService, private router: Router) {}

  ngOnInit() {
    this.getTotalUsers();
    this.getTotalDoctors();
    this.getTotalPatients();
    this.getTotalAdmins();
    this.getUsers();
  }

  getTotalUsers() {
    this.userService.countAllUsers().subscribe((count: number) => {
      this.totalUsers = count;
    });
  }

  getTotalDoctors() {
    this.userService.countUsersByRole('ROLE_MEDECIN').subscribe((count: number) => {
      this.totalDoctors = count;
    });
  }

  getTotalPatients() {
    this.userService.countUsersByRole('ROLE_PATIENT').subscribe((count: number) => {
      this.totalPatients = count;
    });
  }

  getTotalAdmins() {
    this.userService.countUsersByRole('ROLE_ADMIN').subscribe((count: number) => {
      this.totalAdmins = count;
    });
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((users: any[]) => {
      console.log('Fetched users:', users); // Ajoutez cette ligne pour vérifier les utilisateurs reçus
      this.users = users;
    });
  }
  

  exportUsers() {
    this.userService.exportUsers().subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'users.xlsx';
      link.click();
    });
  }

  updateUser(user) {
    this.router.navigate(['/update-user', user.id]);
  }



  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(res=>{
        // Actualisez la liste des utilisateurs après la suppression réussie
        console.log('User deleted successfully.');
      }
    );
    this.users=  this.users.filter(user=>user.userId != userId)
       this.users = JSON.parse(JSON.stringify(this.users));
    
  }

}
