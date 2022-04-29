import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  loading = false;
  signupForm!: FormGroup;
  passwordShown = false;
  errors = {
    email: false,
    username: false,
    phone: false,
  };
  constructor(
    private router: Router,
    public authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(/^01[0125][0-9]{8}$/),
        ],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8)],
      }),
    });
  }
  onSignup() {
    if (this.signupForm.valid) {
      this.sharedService.isLoading.next(true);
      this.authService
        .signup(
          this.signupForm.value.name,
          this.signupForm.value.email,
          this.signupForm.value.phone,
          this.signupForm.value.password
        )
        .subscribe({
          next: (res: any) => {
            this.router.navigate(['user/signin']);
            this.sharedService.isLoading.next(false);
          },
          error: (err: any) => {
            this.sharedService.isLoading.next(false);
            if (err.error.errors) {
              if (err.error?.errors[0]?.param == 'userName') {
                this.errors.username = true;
              } else {
                this.errors.username = false;
              }
            } else if (err.error == 'Phone is used') {
              this.errors.phone = true;
              this.errors.email = false;
            } else if (err.error == 'Email is used') {
              this.errors.email = true;
              this.errors.phone = false;
            }
            console.log(err);
          },
        });
    }
  }
  changeInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordShown = !this.passwordShown;
  }
}
