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
  codeForm: FormGroup;
  email: string;
  codeError = false;
  constructor(
    public authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation()!;
    const state = navigation?.extras?.state as {
      email: string;
    };
    this.email = state?.email!;
  }

  ngOnInit(): void {
    this.codeForm = new FormGroup({
      code: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(7),
        ],
      }),
    });
    this.authService.codeError$.subscribe((err) => {
      this.codeError = err;
    });
    if (!this.email) {
      this.email = sessionStorage.getItem('email')!;
    }
  }
  onProcess() {
    if (this.codeForm.valid) {
      this.sharedService.isLoading.next(true);
      this.authService.sendCode(this.codeForm.value.code);
    }
  }
}
