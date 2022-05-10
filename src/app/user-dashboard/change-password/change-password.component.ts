import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { DashboardService } from '../user-dashboard.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  userData: any;
  changePasswordForm!: FormGroup;
  newPass = false;
  confirmPass = false;
  oldPass = false;
  matchError = false;
  wrongPasswordError = false;
  changeFormOpened = false;
  constructor(
    private dashboardService: DashboardService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getUserData().subscribe({
      next: (res: any) => {
        this.userData = res;
      },
    });
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      confirm: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      }),
    });
  }
  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.sharedService.isLoading.next(true);
      if (
        this.changePasswordForm.value.password !==
        this.changePasswordForm.value.confirm
      ) {
        this.matchError = true;
        this.wrongPasswordError = false;
        this.sharedService.isLoading.next(false);
      } else {
        console.log(
          this.changePasswordForm.value.oldPassword,
          this.changePasswordForm.value.password
        );
        this.dashboardService
          .updatePassword(
            this.changePasswordForm.value.oldPassword,
            this.changePasswordForm.value.password
          )
          .subscribe({
            next: (res) => {
              this.sharedService.isLoading.next(false);
              this.sharedService.sentMessage.next({
                message: 'Password has been changed',
                error: false,
              });
            },
            error: () => {
              this.matchError = false;
              this.wrongPasswordError = true;
              this.sharedService.isLoading.next(false);
            },
          });
      }
    }
  }
  changeInput1(input: any): any {
    this.newPass = !this.newPass;
    input.type = input.type === 'password' ? 'text' : 'password';
  }
  changeInput2(input: any): any {
    this.confirmPass = !this.confirmPass;
    input.type = input.type === 'password' ? 'text' : 'password';
  }
  changeInput3(input: any): any {
    this.oldPass = !this.oldPass;
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
