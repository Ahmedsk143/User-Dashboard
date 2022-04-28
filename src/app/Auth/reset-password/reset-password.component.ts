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
  restForm: FormGroup;
  constructor(
    public authService: AuthService,
    private sharedSerivce: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.restForm = new FormGroup({
      email: new FormControl(null, Validators.required),
    });
  }
  resetPassword = () => {
    if (this.restForm.value.email == null) {
      this.sharedSerivce.sentMessage.next({
        message: 'enter valid email',
        error: true,
      });
    } else if (this.restForm.value.email != null) {
      this.authService.resetPassword(this.restForm.value.email);
    }
  };
}
