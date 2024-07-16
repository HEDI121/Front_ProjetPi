import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  user: User = new User();
  availableRoles: string[] = ['ROLE_ADMIN', 'ROLE_PATIENT', 'ROLE_MEDECIN']; // Available roles
  selectedRole: string; // Track selected role
  message: string;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private userService: ApiserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.userService.getUserById(id).subscribe(
      data => {
        this.user = data;
        console.log(this.user); // Vérifier les données de l'utilisateur
        // Set the selected role if user already has a role
        if (this.user.role.length > 0) {
          this.selectedRole = this.user.role[0];
        }
      },
      error => {
        console.error('Error fetching user:', error);
      }
    );
  }

  updateUser() {
    // Clear existing roles and set the selected role
    this.user.role = [];
    if (this.selectedRole) {
      this.user.role.push(this.selectedRole);
    }
    console.log("HERE",this.user)
    //this.user['userId'] = this.user['id']
    delete this.user['roles']
    this.userService.updateUser(this.user).subscribe(
      response => {
        this.message = 'User updated successfully.';
        this.errorMessage = '';
        this.router.navigate(['/admin_dash']); // Redirect to user list or another page
      },
      error => {
        this.errorMessage = 'Failed to update user.';
        this.message = '';
        console.error('Failed to update user:', error);
      }
    );
  }
}