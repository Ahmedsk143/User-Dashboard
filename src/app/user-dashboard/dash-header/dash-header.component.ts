import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/Auth/auth.service';
import { SharedService } from 'src/app/shared/shared.service';
import { DashboardService } from '../user-dashboard.service';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.scss'],
})
export class DashHeaderComponent implements OnInit {
  UserData: any;
  _name: any;
  currentRoute: string = 'Overview';
  collapsed = false;
  toggleMenu = false;
  dropCollapsed = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private dashboard: DashboardService,
    private sharedService: SharedService
  ) {}

  async ngOnInit(): Promise<void> {
    this.sharedService.isLoading.next(true);
    // this.UserData = this.authService.UserData();
    await this.dashboard.userData().subscribe({
      next: (res) => {
        // console.log(res);
        this.UserData = res;
        this._name = this.UserData.userName;
        this.sharedService.isLoading.next(false);
      },
      error: (err) => {
        console.log(err);
        this.sharedService.isLoading.next(false);
      },
    });

    //to survive a reload
    if (this.router.url == '/user-dashboard/overview') {
      this.currentRoute = 'Overview';
    }
    if (this.router.url == '/user-dashboard/hashrate-plans') {
      this.currentRoute = 'Hashrate plans';
    }
    if (this.router.url == '/user-dashboard/mining-devices') {
      this.currentRoute = 'Mining devices';
    }
    if (this.router.url == '/user-dashboard/withdraw') {
      this.currentRoute = 'Withdraw';
    }
    if (this.router.url == '/user-dashboard/deposit') {
      this.currentRoute = 'Deposit';
    }

    //to update whenever the user navigate to another route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url == '/user-dashboard/overview') {
          this.currentRoute = 'Overview';
        }
        if (event.url == '/user-dashboard/hashrate-plans') {
          this.currentRoute = 'Hashrate plans';
        }
        if (event.url == '/user-dashboard/mining-devices') {
          this.currentRoute = 'Mining devices';
        }
        if (event.url == '/user-dashboard/withdraw') {
          this.currentRoute = 'Withdraw';
        }
        if (event.url == '/user-dashboard/deposit') {
          this.currentRoute = 'Deposit';
        }
      });
  }
  logout() {
    this.authService.logout();
  }
}
