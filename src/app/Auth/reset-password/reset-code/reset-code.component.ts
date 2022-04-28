import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-reset-code',
  templateUrl: './reset-code.component.html',
  styleUrls: ['./reset-code.component.scss'],
})
export class ResetCodeComponent implements OnInit {
  verifyCodeForm: FormGroup;
  constructor(
    public authService: AuthService,
    private sharedSerivce: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verifyCodeForm = new FormGroup({
      code: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
  onProcess() {
    this.sharedSerivce.isLoading.next(true);
    if (this.verifyCodeForm.value.code)
      this.authService.resetPasswordVerificationCode(
        this.verifyCodeForm.value.code.trim()
      );
    sessionStorage.setItem('code', this.verifyCodeForm.value.code.trim());
    this.sharedSerivce.isLoading.next(false);
    this.router.navigate(['user/new-password']);
  }
}
