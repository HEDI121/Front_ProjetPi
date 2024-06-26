import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginRequest } from "src/app/model/loginRequest";
import { ApiserviceService } from "src/app/services/apiservice.service";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html"
})
export class LoginComponent  {
  focus;
  focus1;
  signinForm = new FormGroup({
    username : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
  });
  message = '';
  errorMessage = '';
  

  constructor(private authService: ApiserviceService, private router: Router) { }

  signinNow() {
    const username = this.signinForm.value.username;
    const password = this.signinForm.value.password;
    this.authService.login(username,password).subscribe(
      data => {
        this.message = 'Login successful!';
        this.errorMessage = '';
        
        // Store the JWT token and other user details in local storage or a service
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', JSON.stringify(data['accessToken']));
        this.router.navigate(['/dashboards/dashboard']); // Redirect to a protected route
      },
      err => {
        this.errorMessage = err.error.message || 'Login failed. Please try again.';
        this.message = '';
        
      }
    );
  }
}
