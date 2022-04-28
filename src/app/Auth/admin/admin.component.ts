import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  signinForm!: FormGroup;
  password: string;
  otpForm!: FormGroup;
  passwordShown = false;
  sentOtp = false;
  signupError = false;
  otpError = false;
  constructor(
    public authService: AdminAuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.otpForm = new FormGroup({
      otp: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.authService.otpError$.subscribe((error) => {
      this.otpError = error;
      this.sharedService.isLoading.next(false);
    });
  }
  onSignin() {
    this.sharedService.isLoading.next(true);
    if (this.signinForm.value.password)
      this.authService.signinFF(this.signinForm.value.password).subscribe({
        next: (res) => {
          console.log(res);
          this.sentOtp = true;
          this.password = this.signinForm.value.password;
          this.sharedService.isLoading.next(false);
          this.signupError = false;
        },
        error: (res) => {
          this.signupError = true;
          this.sharedService.isLoading.next(false);
        },
      });
  }
  onOTP() {
    this.sharedService.isLoading.next(true);
    if (this.otpForm.value.otp) {
      this.authService.getOTP(this.otpForm.value.otp);
    }
  }
  changeInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordShown = !this.passwordShown;
  }
}
