import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  otpForm!: FormGroup;
  passwordShown = false;
  sentOtp = false;
  signinError = false;
  constructor(
    public authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      userName: new FormControl(null, {
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
  onSignin() {
    if (this.signinForm.valid) {
      this.sharedService.isLoading.next(true);
      this.authService
        .signinFF(
          this.signinForm.value.userName,
          this.signinForm.value.password
        )
        .subscribe({
          next: (res) => {
            this.sharedService.isLoading.next(false);
            this.sentOtp = true;
            this.signinError = false;
          },
          error: (res) => {
            this.signinError = true;
            this.sharedService.isLoading.next(false);
          },
        });
    }
  }
  changeInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordShown = !this.passwordShown;
  }
}
