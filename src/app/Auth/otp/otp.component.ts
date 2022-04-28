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
  loading = false;
  otpForm!: FormGroup;
  passwordShown = false;
  constructor(
    public authService: AuthService,
    private sharedSerivce: SharedService
  ) {}

  ngOnInit(): void {
    this.otpForm = new FormGroup({
      otp: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
  onProcess() {
    this.sharedSerivce.isLoading.next(true);
    if (this.otpForm.value.otp)
      this.authService.otpValidator(this.otpForm.value.otp);

    this.sharedSerivce.isLoading.next(false);
  }

  resendOtp() {
    this.sharedSerivce.isLoading.next(true);
    this.authService.resendOtp();
    this.sharedSerivce.sentMessage.next({
      message: 'New OTP has been sent',
      error: false,
    });
    this.sharedSerivce.isLoading.next(false);
  }
}
