import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  email: any;
  opend: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.authStatusListner.subscribe((authenticated) => {
    //   this.isAuthenticated = authenticated;
    //   this.email = this.authService.getCurrentUserEmail()?.split('@')[0];
    // });
  }
  onLogout() {}
  ngOnDestroy() {}
}
