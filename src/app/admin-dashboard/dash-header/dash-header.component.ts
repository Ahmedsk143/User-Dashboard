import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AdminAuthService } from 'src/app/Auth/admin-auth.service';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.scss'],
})
export class DashHeaderComponent implements OnInit {
  currentRoute: string = 'Overview';
  dropdownCollapsed = false;
  collapsed = false;
  toggleMenu = false;
  constructor(private router: Router, private authService: AdminAuthService) {}

  ngOnInit(): void {
    //to survive a reload
    if (this.router.url == '/admin/dashboard/overview') {
      this.currentRoute = 'Overview';
    }
    if (this.router.url == '/admin/dashboard/hashrate-plans') {
      this.currentRoute = 'Hashrate plans';
    }
    if (this.router.url == '/admin/dashboard/subscribed-users') {
      this.currentRoute = 'Subscribed users';
    }
    if (this.router.url == '/admin/dashboard/miners') {
      this.currentRoute = 'Mining devices';
    }
    if (this.router.url == '/admin/dashboard/request') {
      this.currentRoute = 'Mining devices';
    }

    //to update whenever the admin navigate to another route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url == '/admin/dashboard/overview') {
          this.currentRoute = 'Overview';
        }
        if (event.url == '/admin/dashboard/hashrate-plans') {
          this.currentRoute = 'Hashrate plans';
        }
        if (event.url == '/admin/dashboard/subscribed-users') {
          this.currentRoute = 'Subscribed users';
        }
        if (event.url == '/admin/dashboard/miners') {
          this.currentRoute = 'Mining devices';
        }
        if (event.url == '/admin/dashboard/request') {
          this.currentRoute = 'Mining devices';
        }
      });
  }
  logout() {
    this.authService.logout();
  }
}
