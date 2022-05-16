import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { TransLog } from '../models/trans-log.model';
import { UserData } from '../models/user-data.model';
import { DashboardService } from '../user-dashboard.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent implements OnInit {
  userData: UserData;
  withdrawLogs: TransLog[];
  withdrawLogsLength = 0;
  crypto = true;
  cryptoTapOpend = 'tap1';

  withdrawFormBTC: FormGroup;
  withdrawFormETH: FormGroup;
  withdrawFormRVN: FormGroup;
  withdrawFormLTCT: FormGroup;

  constructor(
    private sharedService: SharedService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    // this.sharedService.isLoading.next(true);
    this.dashboardService.getUserData().subscribe({
      next: (res) => {
        this.userData = res;
        this.sharedService.isLoading.next(false);
      },
    });
    this.dashboardService.getWithdrawLogs().subscribe({
      next: (res) => {
        this.withdrawLogs = res;
      },
    });

    this.withdrawFormBTC = new FormGroup({
      addressBTC: new FormControl(null, {
        validators: [
          Validators.required,
          // Validators.minLength(34),
          // Validators.maxLength(34),
        ],
      }),
      amountBTC: new FormControl(null, Validators.required),
      //   validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
      // }),
    });

    this.withdrawFormETH = new FormGroup({
      addressETH: new FormControl(null, {
        validators: [
          Validators.required,
          // Validators.minLength(34),
          // Validators.maxLength(34),
        ],
      }),
      amountETH: new FormControl(null, Validators.required),
      //   validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
      // }),
    });
    //////////////////////////////////
    this.withdrawFormRVN = new FormGroup({
      addressRVN: new FormControl(null, {
        validators: [
          Validators.required,
          // Validators.minLength(34),
          // Validators.maxLength(34),
        ],
      }),
      amountRVN: new FormControl(null, Validators.required),
      //   validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
      // }),
    });
    //////////////////////////////////
    this.withdrawFormLTCT = new FormGroup({
      addressLTCT: new FormControl(null, {
        validators: [
          Validators.required,
          // Validators.minLength(34),
          // Validators.maxLength(34),
        ],
      }),
      amountLTCT: new FormControl(null, Validators.required),
      //   validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
      // }),
    });
  }
  onWithdraw() {
    let currency = '';
    let amount = '';
    let address = '';
    if (this.cryptoTapOpend == 'tap1') {
      currency = 'BTC';
      amount = this.withdrawFormBTC.value.amountBTC;
      address = this.withdrawFormBTC.value.addressBTC;
    } else if (this.cryptoTapOpend == 'tap2') {
      currency = 'ETH';
      amount = this.withdrawFormETH.value.amountETH;
      address = this.withdrawFormETH.value.addressETH;
    } else if (this.cryptoTapOpend == 'tap3') {
      currency = 'RVN';
      amount = this.withdrawFormRVN.value.amountRVN;
      address = this.withdrawFormRVN.value.addressRVN;
    } else if (this.cryptoTapOpend == 'tap4') {
      currency = 'LTCT';
      amount = this.withdrawFormLTCT.value.amountLTCT;
      address = this.withdrawFormLTCT.value.addressLTCT;
    }
    console.log(currency, amount, address);
    this.dashboardService.withdrawRequest(currency, amount, address).subscribe({
      next: (res) => {
        this.withdrawFormBTC.reset();
        this.withdrawFormETH.reset();
        this.withdrawFormRVN.reset();
        this.withdrawFormLTCT.reset();
        if (currency == 'BTC') {
          this.userData.balance.btc -= Number(amount);
        } else if (currency == 'ETH') {
          this.userData.balance.eth -= Number(amount);
        } else if (currency == 'RVN') {
          this.userData.balance.rvn -= Number(amount);
        } else if (currency == 'LTCT') {
          this.userData.balance.ltct -= Number(amount);
        }
        this.sharedService.sentMessage.next({
          message: 'Withdrawed Successfully',
          error: false,
        });
      },
      error: () => {
        this.sharedService.sentMessage.next({
          message: 'An error occured, try again!',
          error: true,
        });
      },
    });
  }
  // onWithdraw(currency: string) {
  //   this.sharedService.isLoading.next(true);
  //   let _amount, _address;
  //   if (currency === 'BTC') {
  //     _amount = this.withdrawFormBTC.value.amountBTC;
  //     _address = this.withdrawFormBTC.value.addressBTC;
  //   } else if (currency === 'ETH') {
  //     _amount = this.withdrawFormETH.value.amountETH;
  //     _address = this.withdrawFormETH.value.addressETH;
  //   } else if (currency === 'RVN') {
  //     _amount = this.withdrawFormRVN.value.amountRVN;
  //     _address = this.withdrawFormRVN.value.addressRVN;
  //   } else if (currency === 'LTCT') {
  //     _amount = this.withdrawFormLTCT.value.amountLTCT;
  //     _address = this.withdrawFormLTCT.value.addressLTCT;
  //   }
  //   if (Number(_amount) > 0.0 && _address != null) {
  //     this.dashboardService
  //       .UserWithdrawRequest(currency, parseFloat(_amount), _address)
  //       .subscribe({
  //         next: (res) => {
  //           ///this is to display the notification
  //           this.sharedService.sentMessage.next({
  //             message:
  //               'the property has been added successfully wait for the confirmation',
  //             error: false,
  //           });
  //         },
  //         error: (err) => {
  //           console.log(err);
  //           this.sharedService.sentMessage.next({
  //             message: 'something went wrong ',
  //             error: true,
  //           });
  //         },
  //       });
  //   }
  //   this.sharedService.isLoading.next(false);
  // }

  cryptoPlansTap1() {
    this.cryptoTapOpend = 'tap1';
  }
  cryptoPlansTap2() {
    this.cryptoTapOpend = 'tap2';
  }
  cryptoPlansTap3() {
    this.cryptoTapOpend = 'tap3';
  }
  cryptoPlansTap4() {
    this.cryptoTapOpend = 'tap4';
  }
}
