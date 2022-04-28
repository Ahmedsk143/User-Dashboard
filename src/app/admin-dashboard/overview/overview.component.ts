import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminDashboardService } from '../admin-dashboard.service';
import { MinerSubscrption } from '../models/miner-sub.model';
import { PlanSubscription } from '../models/plan-sub.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  totalUsers: number;
  totalPlans: number;
  totalAsics: number;
  totalPlanContarcts: number;
  totalActiveAsicContarcts: number;
  totalAsicContarctsOnDemand: number;
  totalWithdrawals: number;
  totalDeposits: number;
  btc: string;
  eth: string;
  ltct: string;
  rvn: string;
  plansSubs: PlanSubscription[];
  minersSubs: MinerSubscrption[];
  constructor(
    private dashboardService: AdminDashboardService,
    private sharedSerive: SharedService,
    private http: HttpClient
  ) {}

  accessToken = localStorage.getItem('token');
  ngOnInit() {
    this.dashboardService.getOverviewData().subscribe({
      next: (res) => {
        console.log(res);
        this.totalUsers = res.totalUsers;
        this.totalAsics = res.totalAsics;
        this.totalPlans = res.totalPlans;
        this.totalPlanContarcts = res.totalPlanContarcts;
        this.totalActiveAsicContarcts = res.totalActiveAsicContarcts;
        this.totalAsicContarctsOnDemand = res.totalAsicContarctsOnDemand;
        this.totalWithdrawals = res.totalWithdrawals;
        this.totalDeposits = res.totalDeposits;
        // if (res.balances.BTC?.balancef ) {
        //   this.btc = res.balances.BTC.balancef;
        // }
        this.btc = res.balances.BTC?.balancef ?? '0.00000000';
        this.eth = res.balances.ETH?.balancef ?? '0.00000000';
        this.ltct = res.balances.LTCT?.balancef ?? '0.00000000';
        this.rvn = res.balances.RVN?.balancef ?? '0.00000000';
        this.plansSubs = res.planSubscribtion;
        this.minersSubs = res.asicSubscribtion;
      },
      error: (err) => {
        this.dashboardService.errorHandler(err);
      },
    });
  }
}
