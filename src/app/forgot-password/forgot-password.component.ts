import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  message: string;
  errorMessage: string;

  constructor(private fb: FormBuilder, private authService: ApiserviceService, private router: Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe(
        data => {
          this.message = 'Password reset link sent to your email!';
          this.errorMessage = '';
        },
        err => {
          this.errorMessage = err.error.message || 'An error occurred. Please try again.';
          this.message = '';
        }
      );
    }
  }
}
