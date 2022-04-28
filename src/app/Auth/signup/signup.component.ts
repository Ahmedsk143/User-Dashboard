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
  constructor(
    private router: Router,
    public authService: AuthService,
    private sharedSerivce: SharedService
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
        validators: [Validators.required, Validators.minLength(5)],
      }),
    });
  }
  onSignup() {
    console.log(`name : ${this.signupForm.value.name}`);
    console.log(`email : ${this.signupForm.value.email}`);
    console.log(`phone : ${this.signupForm.value.phone}`);
    console.log(`password : ${this.signupForm.value.password}`);

    this.sharedSerivce.isLoading.next(true);
    if (
      this.signupForm.value.name &&
      this.signupForm.value.email &&
      this.signupForm.value.phone &&
      this.signupForm.value.password
    ) {
      this.authService
        .signup(
          String(this.signupForm.value.name),
          String(this.signupForm.value.email).trim(),
          this.signupForm.value.phone,
          String(this.signupForm.value.password)
        )
        .subscribe({
          /////////////////////////////////////////////mesh byd5ol hena
          next: (res: any) => {
            this.router.navigate(['user//signin']);
            this.sharedSerivce.sentMessage.next({
              message: 'Created Successfully',
              error: false,
            });
          },
          error: (err: any) => {
            console.log(err);
            this.sharedSerivce.sentMessage.next({
              message: 'Failed',
              error: true,
            });
          },
        });
      this.sharedSerivce.isLoading.next(false);
    }
  }
  changeInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordShown = !this.passwordShown;
  }
}
