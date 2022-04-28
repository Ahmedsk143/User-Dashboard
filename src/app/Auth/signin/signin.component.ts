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
  loading = false;
  signinForm!: FormGroup;
  passwordShown = false;
  constructor(
    public authService: AuthService,
    private sharedSerivce: SharedService
  ) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      userName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      }),
    });
  }
  onSignin() {
    this.sharedSerivce.isLoading.next(true);
    if (this.signinForm.value.userName && this.signinForm.value.password)
      this.authService.signin(
        this.signinForm.value.userName,
        this.signinForm.value.password
      );
    this.sharedSerivce.isLoading.next(false);
  }
  changeInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordShown = !this.passwordShown;
  }
}
