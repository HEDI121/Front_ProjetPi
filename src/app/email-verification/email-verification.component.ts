import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  message = '';
  errorMessage = '';
  loading = false;
  verificationCode: string | null = null;

  constructor(
    private authService: ApiserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.verificationCode = this.route.snapshot.queryParamMap.get('code');
  }

  verifyEmail(): void {
    if (this.verificationCode) {
      this.loading = true;
      this.authService.verifyEmail(this.verificationCode).subscribe(
        data => {
          this.message = 'Email verified successfully!';
          this.errorMessage = '';
          this.loading = false;
          // Redirect to login page after a few seconds
          setTimeout(() => {
            this.router.navigate(['/examples/login']);
          }, 3000); // Redirect after 3 seconds
        },
        err => {
          this.errorMessage = err.error.message || 'Invalid verification code';
          this.message = '';
          this.loading = false;
        }
      );
    } else {
      this.errorMessage = 'No verification code provided';
    }
  }
}
