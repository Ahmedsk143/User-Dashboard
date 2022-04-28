import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private rootURL = 'https://cominer.herokuapp.com';
  private key =
    'c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4';
  authStatusListener$ = new BehaviorSubject<boolean>(false);
  private isAuthenticated = false;
  private token: string;
  private refersh: string;
  otpError$ = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) {}
  public getToken() {
    return this.token;
  }
  public getRefersh() {
    return this.refersh;
  }
  public getAuth() {
    return this.isAuthenticated;
  }

  public signinFF(password: String) {
    return this.http.post(`${this.rootURL}/admin/FFAuth?key=${this.key}`, {
      password: password,
    });
  }
  public getOTP(otp: String) {
    this.http
      .post(`${this.rootURL}/admin/2FAuth?key=${this.key}`, {
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
          localStorage.setItem('token', this.token);
          localStorage.setItem('refersh', this.refersh);
          this.sharedService.isLoading.next(false);
          this.router.navigate(['admin/dashboard/overview']); //////////////edited
        },
        error: (err) => {
          this.otpError$.next(true);
        },
      });
  }
  public autoAuth() {
    const token = sessionStorage.getItem('token');
    const refersh = sessionStorage.getItem('refersh');
    if (!token || !refersh) {
      return;
    }
    this.token = token;
    this.refersh = refersh;
    this.isAuthenticated = true;
    this.authStatusListener$.next(true);
  }
  public logout() {
    this.http
      .post(
        `${this.rootURL}/admin/logout?key=${this.key}`,
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
          this.router.navigate(['/admin/signin']);
        },
        error: (err) => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('refersh');
          this.token = '';
          this.refersh = '';
          this.isAuthenticated = false;
          this.authStatusListener$.next(false);
          this.sharedService.isLoading.next(false);
          this.router.navigate(['/admin/signin']);
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
    this.router.navigate(['/admin/signin']);
  }
}
