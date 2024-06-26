import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  message: string;
  errorMessage: string;
  token: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: ApiserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      if (this.resetPasswordForm.value.password !== this.resetPasswordForm.value.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      this.authService.resetPassword(this.token, this.resetPasswordForm.value.password).subscribe(
        data => {
          this.message = 'Password reset successfully!';
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate(['/examples/login']);
          }, 3000); // Redirect to login after 3 seconds
        },
        err => {
          this.errorMessage = err.error.message || 'An error occurred. Please try again.';
          this.message = '';
        }
      );
    }
  }
}