import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootURL: string = 'https://cominer.herokuapp.com/api';
  key: string =
    'c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4';
  authStatusListener$ = new BehaviorSubject<boolean>(false);
  private isAuthenticated = false;
  private token: string;
  private username: string;
  private password: string;
  private refersh: string;
  private email: string;
  private code: string;
  otpError$ = new Subject<boolean>();
  codeError$ = new Subject<boolean>();
  /////
  public accessToken: String | null;
  private refreshToken: String | null;
  saveTimeout: any;

  ///
  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) {}
  getToken() {
    return this.token;
  }
  getRefersh() {
    return this.refersh;
  }
  getAuth() {
    return this.isAuthenticated;
  }
  signup(name: String, email: String, phone: number, password: String) {
    return this.http.post<any>(
      `${this.rootURL}/user/register?key=${this.key}`,
      {
        userName: name,
        email: email,
        phone: phone,
        password: password,
      }
    );
  }
  //Signin
  signinFF(username: string, password: string) {
    this.username = username;
    this.password = password;
    return this.http.post(`${this.rootURL}/user/FFactorAuth?key=${this.key}`, {
      userName: username,
      password: password,
    });
  }
  validateOTP(otp: string) {
    console.log(this.username, otp);
    this.http
      .post(`${this.rootURL}/user/TwoFactorAuth?key=${this.key}`, {
        userName: this.username,
        otp: otp,
      })
      .subscribe({
        next: (res: any) => {
          this.token = res.jwt.accessToken;
          this.refersh = res.jwt.refreshToken;
          this.isAuthenticated = true;
          this.authStatusListener$.next(true);
          sessionStorage.setItem('token', this.token);
          sessionStorage.setItem('refersh', this.refersh);
          this.sharedService.isLoading.next(false);
          this.router.navigate(['/dashboard/overview']);
        },
        error: (err) => {
          this.otpError$.next(true);
          console.log(err);
        },
      });
  }
  resendOTP() {
    this.http
      .post(`${this.rootURL}/user/FFactorAuth?key=${this.key}`, {
        userName: this.username,
        password: this.password,
      })
      .subscribe();
  }
  forgotPassword(email: string) {
    this.email = email;
    sessionStorage.setItem('email', email);
    return this.http.post<any>(
      `${this.rootURL}/user/forgetPassword?key=${this.key}`,
      {
        email: email,
      }
    );
  }
  sendCode(code: string) {
    this.code = code;
    if (!this.email) {
      this.email = sessionStorage.getItem('email')!;
    }
    if (!this.code) {
      this.code = sessionStorage.getItem('code')!;
    }
    this.sharedService.isLoading.next(true);
    console.log(this.email, this.code);
    this.http
      .post<any>(`${this.rootURL}/user/verifyCode?key=${this.key}`, {
        email: this.email,
        code: this.code,
      })
      .subscribe({
        next: (res) => {
          this.sharedService.isLoading.next(false);
          this.token = res.token;
          console.log(res);
          sessionStorage.setItem('token', this.token);
          this.router.navigate(['/user/new-password']);
        },
        error: (err) => {
          this.sharedService.isLoading.next(false);
          this.codeError$.next(true);
          console.log(err);
        },
      });
  }
  resetNewPassword(newPassword: string) {
    return this.http.post<any>(
      `${this.rootURL}/user/resetPassword?key=${this.key}`,
      {
        newPassword: newPassword,
        code: this.code,
      },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }
  autoAuth() {
    const token = sessionStorage.getItem('token');
    const refersh = sessionStorage.getItem('refersh');
    if (token == null || refersh == null) {
      return;
    }
    this.token = token;
    this.refersh = refersh;
    this.isAuthenticated = true;
    this.authStatusListener$.next(true);
  }
  logout() {
    this.http
      .post(
        `${this.rootURL}/user/logout?key=${this.key}`,
        {
          token: this.getRefersh(),
        },
        { responseType: 'text' }
      )
      .subscribe({
        next: () => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('refersh');
          this.token = '';
          this.refersh = '';
          this.isAuthenticated = false;
          this.authStatusListener$.next(false);
          this.sharedService.isLoading.next(false);
          this.router.navigate(['/signin']);
        },
        error: (err) => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('refersh');
          this.token = '';
          this.refersh = '';
          this.isAuthenticated = false;
          this.authStatusListener$.next(false);
          this.sharedService.isLoading.next(false);
          this.router.navigate(['/signin']);
        },
      });
  }
  removeAuthData() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refersh');
    this.token = '';
    this.refersh = '';
    this.isAuthenticated = false;
    this.authStatusListener$.next(false);
    this.sharedService.isLoading.next(false);
    this.router.navigate(['/signin']);
  }

  ///////////////////////////////////////////////////////////////
  // async otpValidator(otp: string) {
  //   await this.http
  //     .post<any>(`${this.rootURL}/user/TwoFactorAuth?key=${this.key}`, {
  //       userName: sessionStorage.getItem('name'),
  //       otp: otp,
  //     })
  //     .subscribe({
  //       next: (res) => {
  //         sessionStorage.clear();
  //         this.accessToken = res.jwt.accessToken;
  //         this.refreshToken = res.jwt.refreshToken;
  //         localStorage.setItem('accessToken', `${this.accessToken}`);
  //         this.authStatusListener$.next(true);
  //         this.router.navigate(['/user/dashboard/overview']);
  //       },
  //       error: (err) => {
  //         this.sharedService.sentMessage.next({
  //           message: 'something went wrong please try again',
  //           error: true,
  //         });
  //         console.log(err);
  //       },
  //     });
  // }
  //////////////////////////////////////////////////////////////
  // resendOtp() {
  //   let n = sessionStorage.getItem('name');
  //   let p = sessionStorage.getItem('password');
  //   this.signinFF(n ? n : 'dummy data', p ? p : 'dummy data');
  // }

  // //////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////

  // private clearAuthData() {
  //   sessionStorage.removeItem('accessToken');
  // }
}
