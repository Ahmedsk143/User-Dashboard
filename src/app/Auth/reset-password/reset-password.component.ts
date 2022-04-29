import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  phase = 0;
  forgotForm: FormGroup;
  emailError = false;
  constructor(
    public authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.forgotForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
    });
  }
  forgotPassword() {
    if (this.forgotForm.valid) {
      this.sharedService.isLoading.next(true);
      const email = this.forgotForm.value.email;
      this.authService.forgotPassword(email).subscribe({
        next: () => {
          this.sharedService.isLoading.next(false);
          this.router.navigate(['/user/verification'], {
            state: { email: email },
          });
        },
        error: () => {
          this.sharedService.isLoading.next(false);
          this.emailError = true;
        },
      });
    }
  }
}
