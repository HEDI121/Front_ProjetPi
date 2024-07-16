import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  
})
export class LoginComponent {
  focus;
  focus1;
  signinForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  message = '';
  errorMessage = '';

  constructor(private authService: ApiserviceService, private router: Router) {}

  signinNow() {
    const username = this.signinForm.value.username;
    const password = this.signinForm.value.password;
    this.authService.login(username, password).subscribe(
      (data: any) => {
        this.message = 'Login successful!';
        this.errorMessage = '';

        // Store the JWT token and other user details in local storage or a service
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.accessToken);

        const roles = data.roles; // This is an array of roles
        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin_dash']);
        } else if (roles.includes('Medecin')) {
          this.router.navigate(['/dashboards/dashboard']);
        } else if (roles.includes('Patient')) {
          this.router.navigate(['/dashboards/dashboard']);
        } else {
          this.router.navigate(['/signin']);
        }
      },
      err => {
        this.errorMessage = err.error.message || 'Login failed. Please try again.';
        this.message = '';
      }
    );
  }
}
