import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-orsignin',
  templateUrl: './signup-orsignin.component.html',
  styleUrls: ['./signup-orsignin.component.scss'],
})
export class SignupOrsigninComponent implements OnInit {
  statusValue: boolean = false;
  loading: boolean = false;
  signupForm: FormGroup;
  signinForm: FormGroup;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.pattern('[0-9]+')],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      }),
    });
    this.signinForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      }),
    });
    // this.authService.statusObs.subscribe((val) => (this.statusValue = val));
    this.statusValue = false;
  }
  onSignup() {
    // this.authService.addNewUser(
    //   this.signupForm.value.name,
    //   this.signupForm.value.email,
    //   this.signupForm.value.phone,
    //   this.signupForm.value.password
    // );
    // this.authService.statusObs.next(false);
    this.statusValue = false;
    this.signupForm.reset();
  }
  onSignin() {
    // if (this.signinForm.value.email && this.signinForm.value.password)
    //   this.authService.login(
    //     this.signinForm.value.email,
    //     this.signinForm.value.password
    //   );
    // this.loading = true;
  }
  changeToSignup() {
    this.statusValue = true;
  }
  changeToSignin() {
    this.statusValue = false;
  }
}
