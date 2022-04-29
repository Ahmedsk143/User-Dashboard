import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  otpForm!: FormGroup;
  passwordShown = false;
  otpError = false;
  clicked = false;
  constructor(
    public authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
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
  onOTP() {
    if (this.otpForm.value.otp) {
      this.sharedService.isLoading.next(true);
      this.authService.validateOTP(this.otpForm.value.otp);
    }
  }

  onResend() {
    if (!this.clicked) {
      this.authService.resendOTP();
      this.clicked = true;
    }
    setTimeout(() => {
      this.clicked = false;
    }, 30000);
  }
}
