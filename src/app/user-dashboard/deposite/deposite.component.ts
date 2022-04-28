import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { DashboardService } from '../user-dashboard.service';

@Component({
  selector: 'app-deposite',
  templateUrl: './deposite.component.html',
  styleUrls: ['./deposite.component.scss'],
})
export class DepositeComponent implements OnInit {
  crypto = true;
  cryptoTapOpend = 'tap1';
  depositeForm: FormGroup;

  addresses: { address: string };
  BTC_address: any;
  ETH_address: any;
  RVN_address: any;
  LTCT_address: any;

  BTC_img_src: string;
  ETH_img_src: string;
  RVN_img_src: string;
  LTCT_img_src: string;

  waitingTime = 1200;

  depositLogsLength = 0;
  depositLogs: any = [
    // {
    //   _id: 'hi',
    //   address: 'hi',
    //   amount: 'hi',
    //   currency: 'hi',
    //   transactionStatus: 'hi',
    //   userID: 'hi',
    //   createdAt: 'hi',
    //   updatedAt: 'hi',
    //   txn_id: 'hi',
    // },
  ];

  _balance_btc: any;
  _balance_eth: any;
  _balance_rvn: any;
  _balance_ltct: any;
  UserData: any;
  balances: any;

  constructor(
    private sharedSerivce: SharedService,
    private dashboardd: DashboardService
  ) {}

  async ngOnInit() {
    this.reload();
    this.sharedSerivce.isLoading.next(true);
    //this.sharedSerivce.showQR.next(true);

    // this.UserData = this.authServics.UserData();
    this.dashboardd.userData().subscribe({
      next: (res) => {
        // console.log(res);
        this.UserData = res;
        this._balance_btc = this.UserData.balance.btc;
        this._balance_eth = this.UserData.balance.eth;
        this._balance_ltct = this.UserData.balance.ltct;
        this._balance_rvn = this.UserData.balance.rvn;
        // this.sharedSerivce.isLoading.next(false);
      },
      error: (err) => {
        console.log(err);
        //  this.sharedSerivce.isLoading.next(false);
      },
    });
    setTimeout(() => {
      this.balances = [
        {
          name: 'BTC',
          value: this._balance_btc ? this._balance_btc.toFixed(8) : '0',
        },
        {
          name: 'ETH',
          value: this._balance_eth ? this._balance_eth.toFixed(8) : '0',
        },
        {
          name: 'RVN',
          value: this._balance_rvn ? this._balance_rvn.toFixed(8) : '0',
        },
        {
          name: 'LTCT',
          value: this._balance_ltct ? this._balance_ltct.toFixed(8) : '0',
        },
      ];
    }, 1200);

    ////////////////////////////////////////////////////////////
    this.depositeForm = new FormGroup({
      address: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(32),
          Validators.maxLength(32),
        ],
      }),
      amount: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
      }),
    });
    //////////////////////////////
    this.dashboardd.getUserDepositLogs().subscribe({
      next: (res) => {
        this.depositLogs = res;
      },
    });
    ///////////////////////////
    await this.getAddress('BTC');
    await this.getAddress('ETH');
    await this.getAddress('RVN');
    await this.getAddress('LTCT');

    ///////////////////////////////
    setTimeout(() => {
      this.sharedSerivce.isLoading.next(false);
    }, this.waitingTime + 500);
  }
  async getAddress(currency: string) {
    this.dashboardd.getUserDepositAddress(currency).subscribe({
      next: (res) => {
        if (currency === 'BTC') {
          this.BTC_address = res;
          this.BTC_img_src = `https://api.qrserver.com/v1/create-qr-code/?data=${this.BTC_address.address}&size=[120]x[120]`;
        } else if (currency === 'ETH') {
          this.ETH_address = res;
          this.ETH_img_src = `https://api.qrserver.com/v1/create-qr-code/?data=${this.ETH_address.address}&size=[120]x[120]`;
        } else if (currency === 'RVN') {
          this.RVN_address = res;
          this.RVN_img_src = `https://api.qrserver.com/v1/create-qr-code/?data=${this.RVN_address.address}&size=[120]x[120]`;
        } else if (currency === 'LTCT') {
          this.LTCT_address = res;
          this.LTCT_img_src = `https://api.qrserver.com/v1/create-qr-code/?data=${this.LTCT_address.address}&size=[120]x[120]`;
        }
      },
    });
  }

  onDeposite() {}

  cryptoPlansTap1() {
    this.cryptoTapOpend = 'tap1';
    this.reload();
  }
  cryptoPlansTap2() {
    this.cryptoTapOpend = 'tap2';
    this.reload();
  }
  cryptoPlansTap3() {
    this.sharedSerivce.isLoading.next(true);
    this.cryptoTapOpend = 'tap3';
    this.reload();

    setTimeout(() => {
      this.sharedSerivce.isLoading.next(false);
    }, 500);
  }
  cryptoPlansTap4() {
    this.cryptoTapOpend = 'tap4';
    this.reload();
  }

  /////////////////////////////////////this is to reload compoment
  // i added <ng-container *ngIf="_reload">
  //     components here
  // </ng-container>
  //////////////in the html file and the blew function here
  public _reload = true;

  private reload() {
    setTimeout(() => (this._reload = true), 100);
  }

  //to do https://stackoverflow.com/questions/49102724/angular-5-copy-to-clipboard
}
