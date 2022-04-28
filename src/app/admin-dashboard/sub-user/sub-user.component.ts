import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminDashboardService } from '../admin-dashboard.service';
import { Log } from '../models/log.model';
import { UserPlan } from '../models/user-plan.model';
import { User } from '../models/user.model';
import { UserAsic } from '../models/userAsic.model';

export interface Plan {
  date: Date;
  name: string;
  total: number;
  current: number;
  expire: Date;
}

@Component({
  selector: 'app-sub-user',
  templateUrl: './sub-user.component.html',
  styleUrls: ['./sub-user.component.scss'],
})
export class SubUserComponent implements OnInit {
  userData: User = new User();
  sub: Subscription;
  userID: string;
  userBalances: { cryptoName: string; value: string }[];
  selectedTap = 'tap1';
  selectedTap3 = 'tap3-1';
  userPlans: UserPlan[];
  ////////////////////////The table data//////////////////////////
  activeUserPlans: UserPlan[] = [];
  expiredUserPlans: UserPlan[] = [];
  activePlansLength: number = this.activeUserPlans.length;
  expiredPlansLength: number = this.expiredUserPlans.length;
  totalPlansLength: number = this.activePlansLength + this.expiredPlansLength;
  ////////////////////miners data ////////////////////
  userAsics: UserAsic[];
  userAsicsLength: number;
  //////////////////// Transaction Logs ////////////////////
  depositLogs: Log[];
  withdrawLogs: Log[];
  depositLogsLength: number;
  withdrawLogsLength: number;
  constructor(
    private dashboardService: AdminDashboardService,
    private activatedRoute: ActivatedRoute,
    private sharedSerivce: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedSerivce.isLoading.next(true);
    this.sub = this.activatedRoute.paramMap.subscribe((params) => {
      this.userID = params.get('userID')!;
      this.dashboardService.getUserData(this.userID).subscribe({
        next: (res) => {
          this.userData = res;
          this.userBalances = [
            {
              cryptoName: 'BTC',
              value: res.balance.btc,
            },
            {
              cryptoName: 'ETH',
              value: res.balance.eth,
            },
            {
              cryptoName: 'LTCT',
              value: res.balance.ltct,
            },
            {
              cryptoName: 'RVN',
              value: res.balance.rvn,
            },
          ];
          this.sharedSerivce.isLoading.next(false);
        },
        error: (err) => {
          this.dashboardService.errorHandler(err);
        },
      });
      this.dashboardService.getUserPlans(this.userID).subscribe({
        next: (res) => {
          this.activeUserPlans = res.filter((e) => {
            return e.planStatus === true;
          });
          this.expiredUserPlans = res.filter((e) => {
            return e.planStatus === false;
          });
          this.totalPlansLength = res.length;
          this.activePlansLength = this.activeUserPlans.length;
          this.expiredPlansLength = this.expiredUserPlans.length;
        },
        error: (err) => {
          this.dashboardService.errorHandler(err);
        },
      });
      this.dashboardService.getUserAsics(this.userID).subscribe({
        next: (res) => {
          this.userAsics = res;
          this.userAsicsLength = res.length;
        },
        error: (err) => {
          this.dashboardService.errorHandler(err);
        },
      });
      this.dashboardService.getUserDepositLogs(this.userID).subscribe({
        next: (res) => {
          this.depositLogs = res;
          this.depositLogsLength = res.length;
        },
        error: (err) => {
          this.dashboardService.errorHandler(err);
        },
      });
    });
    this.dashboardService.getUserWithdrawLogs(this.userID).subscribe({
      next: (res) => {
        this.withdrawLogs = res;
        this.withdrawLogsLength = res.length;
      },
      error: (err) => {
        this.dashboardService.errorHandler(err);
      },
    });
  }
  // checkLength(): boolean {
  //   return this.miners.length >= 1;
  // }
}
