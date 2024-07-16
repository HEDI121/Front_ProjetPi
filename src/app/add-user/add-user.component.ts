import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  focus;
  focus1;
  focus2;
  user: any = { roles: '' }; // Initialize roles as an empty string for single selection
  availableRoles: string[] = ['ROLE_ADMIN', 'ROLE_PATIENT', 'ROLE_MEDECIN']; // Available roles
  message: string;
  errorMessage: string;

  constructor(private userService: ApiserviceService) {}

  addUser() {
    this.user.roles = [this.user.roles]; // Convert to array for backend

    this.userService.addUser(this.user).subscribe(
      (response) => {
        this.message = 'User added successfully.';
        this.errorMessage = '';
        this.user = { roles: '' }; // Reset form fields
      },
      (error) => {
        this.errorMessage = 'Failed to add user.';
        this.message = '';
        console.error('Failed to add user:', error);
      }
    );
  }
}
