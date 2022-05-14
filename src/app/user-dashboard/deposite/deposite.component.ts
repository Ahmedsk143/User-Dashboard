import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { SharedService } from 'src/app/shared/shared.service';
import { TransLog } from '../models/trans-log.model';
import { UserData } from '../models/user-data.model';
import { DashboardService } from '../user-dashboard.service';

@Component({
  selector: 'app-deposite',
  templateUrl: './deposite.component.html',
  styleUrls: ['./deposite.component.scss'],
})
export class DepositeComponent implements OnInit {
  userData: UserData;
  depositLogs: TransLog[];
  crypto = true;
  cryptoTapOpend = 'tap1';
  btcAddress: string;
  ethAddress: string;
  rvnAddress: string;
  ltctAddress: string;
  btcSrc: string;
  ethSrc: string;
  rvnSrc: string;
  ltctSrc: string;
  depositLogsLength = 0;
  constructor(
    private sharedService: SharedService,
    private dashboardService: DashboardService,
    private clipboard: Clipboard
  ) {}

  ngOnInit() {
    this.sharedService.isLoading.next(true);
    this.dashboardService.getUserData().subscribe({
      next: (res) => {
        this.userData = res;
        this.sharedService.isLoading.next(false);
      },
    });
    this.getBTCAddress();
    this.getETHAddress();
    this.getRVNAddress();
    this.getLTCTAddress();
    this.dashboardService.getDepositLogs().subscribe({
      next: (res) => {
        this.depositLogs = res;
      },
    });
  }
  copyText(address: string) {
    this.clipboard.copy(address);
  }
  getBTCAddress() {
    this.dashboardService.getDepositAddress('BTC').subscribe((res) => {
      this.btcAddress = res.address;
      this.btcSrc = `https://api.qrserver.com/v1/create-qr-code/?data=${res.address}&size=[120]x[120]`;
    });
  }
  getETHAddress() {
    this.dashboardService.getDepositAddress('ETH').subscribe((res) => {
      this.ethAddress = res.address;
      this.ethSrc = `https://api.qrserver.com/v1/create-qr-code/?data=${res.address}&size=[120]x[120]`;
    });
  }
  getRVNAddress() {
    this.dashboardService.getDepositAddress('RVN').subscribe((res) => {
      this.rvnAddress = res.address;
      this.rvnSrc = `https://api.qrserver.com/v1/create-qr-code/?data=${res.address}&size=[120]x[120]`;
    });
  }
  getLTCTAddress() {
    this.dashboardService.getDepositAddress('LTCT').subscribe((res) => {
      this.ltctAddress = res.address;
      this.ltctSrc = `https://api.qrserver.com/v1/create-qr-code/?data=${res.address}&size=[120]x[120]`;
    });
  }

  cryptoPlansTap1() {
    this.cryptoTapOpend = 'tap1';
    // this.getBTCAddress();
  }
  cryptoPlansTap2() {
    this.cryptoTapOpend = 'tap2';
    // this.getRVNAddress();
  }
  cryptoPlansTap3() {
    this.cryptoTapOpend = 'tap3';
    // this.getETHAddress();
  }
  cryptoPlansTap4() {
    this.cryptoTapOpend = 'tap4';
    // this.getLTCTAddress();
  }
}
