import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm!: FormGroup;
  code: string | null;
  newPass = false;
  confirmPass = false;
  matchError = false;
  unknownError = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.newPasswordForm = new FormGroup({
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      confirm: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      }),
    });
  }
  // onSubmit() {
  //   this.code = sessionStorage.getItem('code')
  //     ? sessionStorage.getItem('code')
  //     : null;

  //   ///if it is isnt valid
  //   if (
  //     this.newPasswordForm.value.password !==
  //       this.newPasswordForm.value.confirm ||
  //     this.code == null
  //   ) {
  //     this.sharedService.sentMessage.next({
  //       message: 'something went wrong, make sure the password is the same',
  //       error: false,
  //     });
  //   }
  //   //// if it is valid
  //   else if (
  //     this.newPasswordForm.value.password ===
  //       this.newPasswordForm.value.confirm &&
  //     this.code !== null
  //   ) {
  //     (
  //        this.authService.resetNewPassword(
  //         this.newPasswordForm.value.password
  //       )
  //     ).subscribe({
  //       next: (res) => {
  //         this.router.navigate(['/']);
  //         sessionStorage.removeItem('code');
  //         sessionStorage.removeItem('email');
  //         sessionStorage.removeItem('resetToken');
  //         /////show the notification
  //         this.sharedService.sentMessage.next({
  //           message: 'reset password successfully',
  //           error: false,
  //         });
  //       },
  //       error: (err) => {
  //         this.sharedService.sentMessage.next({
  //           message: 'something went wrong please try again',
  //           error: true,
  //         });
  //         console.log(err);
  //       },
  //     });
  //   } //end of if statement
  // }
  onSubmit() {
    if (this.newPasswordForm.valid) {
      this.sharedService.isLoading.next(true);
      if (
        this.newPasswordForm.value.password !==
        this.newPasswordForm.value.confirm
      ) {
        this.matchError = true;
      } else {
        this.authService
          .resetNewPassword(this.newPasswordForm.value.password)
          .subscribe({
            next: () => {
              this.sharedService.isLoading.next(false);
              sessionStorage.removeItem('code');
              sessionStorage.removeItem('email');
              sessionStorage.removeItem('token');
              this.router.navigate(['/signin']);
            },
            error: () => {
              this.sharedService.isLoading.next(false);
              this.unknownError = true;
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
}
