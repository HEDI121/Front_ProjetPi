import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SignupRequest } from "src/app/model/SignupRequest ";
import { ApiserviceService } from "src/app/services/apiservice.service";

@Component({
  selector: "app-register",
  templateUrl: "register.component.html"
})
export class RegisterComponent  {
  focus;
  focus1;
  focus2;
  signUpRequest: SignupRequest = {
    username: '',
    email: '',
    password: '',
    role: ['ROLE_PATIENT'] // Default role set to 'ROLE_PATIENT'
  };
  message = '';
  errorMessage = '';

  constructor(private authService: ApiserviceService, private router: Router) { } // Inject Router

  onSubmit() {
    this.authService.register(this.signUpRequest).subscribe(
      data => {
        this.message = 'User registered successfully! Check your email for verification.';
        this.errorMessage = '';
         // Redirect to login page on success
      },
      err => {
        this.errorMessage = err.error.message || 'An error occurred during registration.';
        this.message = '';
      }
    );
  }
}
