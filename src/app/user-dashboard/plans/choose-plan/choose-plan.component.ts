import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardService } from '../../user-dashboard.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.component.html',
  styleUrls: ['./choose-plan.component.scss'],
})
export class ChoosePlanComponent implements OnInit {
  short = true;
  btc: any = true;
  shortPlansOpend = 'tap1';
  longPlansOpend = 'tap1';
  tap1Data: any;
  tap2Data: any;
  tap3Data: any;
  tap4Data: any;

  /////////////////////////////////////initial data/////////////////////////////////////////////
  shortPlans = [
    {
      id: '0',
      planType: 'loading...',
      planName: '',
      cryptoName: 'loading...',
      algorithm: 'loading...',
      planDuration: 'loading...',
      profitability: 'loading...',
      price: 0,
      availability: true,
      hashrate: 'loading...',
    },
  ];
  longPlans = [
    {
      id: '0',
      planType: 'loading...',
      planName: '',
      cryptoName: 'loading...',
      algorithm: 'loading...',
      planDuration: 'loading...',
      profitability: 'loading...',
      price: 0,
      availability: true,
      hashrate: 'loading...',
    },
  ];

  BTCPlansLong = new Array();
  BTCPlansShort = new Array();
  ETHPlansLong = new Array();
  ETHPlansShort = new Array();
  RVNPlansLong = new Array();
  RVNPlansShort = new Array();
  LTCTPlansLong = new Array();
  LTCTPlansShort = new Array();
  constructor(
    private http: HttpClient,
    private dashboard: DashboardService,
    private sharedSerivce: SharedService
  ) {}
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////here is buy  plan button
  //////////////////////////// each tab has its buttons even short or long and BTC or ETH or RVN or LTCT
  buying(n: any) {
    console.log('buy Bitcion short plan');
    this.dashboard.buyPlan(n[0]).subscribe({
      next: (res) => {
        console.log(n[0]);
        ///this is to display the notification
        this.sharedSerivce.sentMessage.next({
          message: 'the plan has been added successfully',
          error: false,
        });
      },
      error: (err) => {
        this.sharedSerivce.sentMessage.next({
          message: 'something went wrong, or no sufficient balance',
          error: true,
        });
      },
    });
  }

  /////here is general buy plan method

  //////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.sharedSerivce.isLoading.next(true);
    this.dashboard
      .get_BTC_Long_HashrateContractPlans()
      .subscribe((res: any) => {
        //console.log(res);
        for (let i = 0; i < res.plans.length; i++) {
          const ele = {
            id: res.plans[i]._id ? res.plans[i]._id : '0',
            planType: res.plans[i].planType ? res.plans[i].planType : '0',
            planName: res.plans[i].planName ? res.plans[i].planName : '0',
            cryptoName: res.plans[i].cryptoName ? res.plans[i].cryptoName : '0',
            algorithm: res.plans[i].algorithm ? res.plans[i].algorithm : '0',
            planDuration: res.plans[i].planDuration
              ? res.plans[i].planDuration
              : '0',
            profitability: res.plans[i].profitability
              ? res.plans[i].profitability
              : '0',
            price: res.plans[i].price ? res.plans[i].price : '0',
            availability: res.plans[i].availability,
            hashrate: res.PlansHashPower[i].hashrate
              ? res.PlansHashPower[i].hashrate
              : '0',
          };
          this.BTCPlansLong.push(ele);
        }
        //this.sharedSerivce.isLoading.next(false);
      });
    this.dashboard
      .get_BTC_Short_HashrateContractPlans()
      .subscribe((res: any) => {
        //console.log(res);
        for (let i = 0; i < res.plans.length; i++) {
          const ele = {
            id: res.plans[i]._id ? res.plans[i]._id : '0',
            planType: res.plans[i].planType ? res.plans[i].planType : '0',
            planName: res.plans[i].planName ? res.plans[i].planName : '0',
            cryptoName: res.plans[i].cryptoName ? res.plans[i].cryptoName : '0',
            algorithm: res.plans[i].algorithm ? res.plans[i].algorithm : '0',
            planDuration: res.plans[i].planDuration
              ? res.plans[i].planDuration
              : '0',
            profitability: res.plans[i].profitability
              ? res.plans[i].profitability
              : '0',
            price: res.plans[i].price ? res.plans[i].price : '0',
            availability: res.plans[i].availability,
            hashrate: res.PlansHashPower[i].hashrate
              ? res.PlansHashPower[i].hashrate
              : '0',
          };
          this.BTCPlansShort.push(ele);
        }
        //this.sharedSerivce.isLoading.next(false);
      });
    ///////////////////////////////////////BTC END ///////////////////////////////////////////////
    ///////////////////////////////////////ETH START ///////////////////////////////////////////////
    this.dashboard
      .get_ETH_Long_HashrateContractPlans()
      .subscribe((res: any) => {
        //console.log(res);
        for (let i = 0; i < res.plans.length; i++) {
          const ele = {
            id: res.plans[i]._id ? res.plans[i]._id : '0',
            planType: res.plans[i].planType ? res.plans[i].planType : '0',
            planName: res.plans[i].planName ? res.plans[i].planName : '0',
            cryptoName: res.plans[i].cryptoName ? res.plans[i].cryptoName : '0',
            algorithm: res.plans[i].algorithm ? res.plans[i].algorithm : '0',
            planDuration: res.plans[i].planDuration
              ? res.plans[i].planDuration
              : '0',
            profitability: res.plans[i].profitability
              ? res.plans[i].profitability
              : '0',
            price: res.plans[i].price ? res.plans[i].price : '0',
            availability: res.plans[i].availability,
            hashrate: res.PlansHashPower[i].hashrate
              ? res.PlansHashPower[i].hashrate
              : '0',
          };
          this.ETHPlansLong.push(ele);
        }
      });
    this.dashboard
      .get_ETH_Short_HashrateContractPlans()
      .subscribe((res: any) => {
        //console.log(res);
        for (let i = 0; i < res.plans.length; i++) {
          const ele = {
            id: res.plans[i]._id ? res.plans[i]._id : '0',
            planType: res.plans[i].planType ? res.plans[i].planType : '0',
            planName: res.plans[i].planName ? res.plans[i].planName : '0',
            cryptoName: res.plans[i].cryptoName ? res.plans[i].cryptoName : '0',
            algorithm: res.plans[i].algorithm ? res.plans[i].algorithm : '0',
            planDuration: res.plans[i].planDuration
              ? res.plans[i].planDuration
              : '0',
            profitability: res.plans[i].profitability
              ? res.plans[i].profitability
              : '0',
            price: res.plans[i].price ? res.plans[i].price : '0',
            availability: res.plans[i].availability,
            hashrate: res.PlansHashPower[i].hashrate
              ? res.PlansHashPower[i].hashrate
              : '0',
          };
          this.ETHPlansShort.push(ele);
        }
      });
    ///////////////////////////////////////ETH END ///////////////////////////////////////////////
    ///////////////////////////////////////RVN START ///////////////////////////////////////////////
    this.dashboard
      .get_RVN_Long_HashrateContractPlans()
      .subscribe((res: any) => {
        //console.log(res);
        for (let i = 0; i < res.plans.length; i++) {
          const ele = {
            id: res.plans[i]._id ? res.plans[i]._id : '0',
            planType: res.plans[i].planType ? res.plans[i].planType : '0',
            planName: res.plans[i].planName ? res.plans[i].planName : '0',
            cryptoName: res.plans[i].cryptoName ? res.plans[i].cryptoName : '0',
            algorithm: res.plans[i].algorithm ? res.plans[i].algorithm : '0',
            planDuration: res.plans[i].planDuration
              ? res.plans[i].planDuration
              : '0',
            profitability: res.plans[i].profitability
              ? res.plans[i].profitability
              : '0',
            price: res.plans[i].price ? res.plans[i].price : '0',
            availability: res.plans[i].availability,
            hashrate: res.PlansHashPower[i].hashrate
              ? res.PlansHashPower[i].hashrate
              : '0',
          };
          this.RVNPlansLong.push(ele);
        }
      });
    this.dashboard
      .get_RVN_Short_HashrateContractPlans()
      .subscribe((res: any) => {
        //console.log(res);
        for (let i = 0; i < res.plans.length; i++) {
          const ele = {
            id: res.plans[i]._id ? res.plans[i]._id : '0',
            planType: res.plans[i].planType ? res.plans[i].planType : '0',
            planName: res.plans[i].planName ? res.plans[i].planName : '0',
            cryptoName: res.plans[i].cryptoName ? res.plans[i].cryptoName : '0',
            algorithm: res.plans[i].algorithm ? res.plans[i].algorithm : '0',
            planDuration: res.plans[i].planDuration
              ? res.plans[i].planDuration
              : '0',
            profitability: res.plans[i].profitability
              ? res.plans[i].profitability
              : '0',
            price: res.plans[i].price ? res.plans[i].price : '0',
            availability: res.plans[i].availability,
            hashrate: res.PlansHashPower[i].hashrate
              ? res.PlansHashPower[i].hashrate
              : '0',
          };
          this.RVNPlansShort.push(ele);
        }
      });
    ///////////////////////////////////////RVN END ///////////////////////////////////////////////
    ///////////////////////////////////////LTCT START ///////////////////////////////////////////////
    this.dashboard
      .get_LTCT_Long_HashrateContractPlans()
      .subscribe((res: any) => {
        //console.log(res);
        for (let i = 0; i < res.plans.length; i++) {
          const ele = {
            id: res.plans[i]._id ? res.plans[i]._id : '0',
            planType: res.plans[i].planType ? res.plans[i].planType : '0',
            planName: res.plans[i].planName ? res.plans[i].planName : '0',
            cryptoName: res.plans[i].cryptoName ? res.plans[i].cryptoName : '0',
            algorithm: res.plans[i].algorithm ? res.plans[i].algorithm : '0',
            planDuration: res.plans[i].planDuration
              ? res.plans[i].planDuration
              : '0',
            profitability: res.plans[i].profitability
              ? res.plans[i].profitability
              : '0',
            price: res.plans[i].price ? res.plans[i].price : '0',
            availability: res.plans[i].availability,
            hashrate: res.PlansHashPower[i].hashrate
              ? res.PlansHashPower[i].hashrate
              : '0',
          };
          this.LTCTPlansLong.push(ele);
        }
      });
    this.dashboard
      .get_LTCT_Short_HashrateContractPlans()
      .subscribe((res: any) => {
        //console.log(res);
        for (let i = 0; i < res.plans.length; i++) {
          const ele = {
            id: res.plans[i]._id ? res.plans[i]._id : '0',
            planType: res.plans[i].planType ? res.plans[i].planType : '0',
            planName: res.plans[i].planName ? res.plans[i].planName : '0',
            cryptoName: res.plans[i].cryptoName ? res.plans[i].cryptoName : '0',
            algorithm: res.plans[i].algorithm ? res.plans[i].algorithm : '0',
            planDuration: res.plans[i].planDuration
              ? res.plans[i].planDuration
              : '0',
            profitability: res.plans[i].profitability
              ? res.plans[i].profitability
              : '0',
            price: res.plans[i].price ? res.plans[i].price : '0',
            availability: res.plans[i].availability,
            hashrate: res.PlansHashPower[i].hashrate
              ? res.PlansHashPower[i].hashrate
              : '0',
          };
          this.LTCTPlansShort.push(ele);
        }
      });
    ////////////////////////////////////////////
    //   (await this.dashboard.getHashrateContractPlans('BTC', 'long')).subscribe(
    //     (res: any) => {
    //       console.log(res);
    //       for (let i = 0; i < res.plans.length; i++) {
    //         const ele = {
    //           id: res.plans[i]._id,
    //           type: `${res.plans[i].planName} Miners`,
    //           icon: '',
    //           avilability: res.plans[i].availability,
    //           duration: res.plans[i].planDuration,
    //           crypto: `${res.plans[i].cryptoName}`,
    //           power: res.PlansHashPower[1][i],
    //           pricePer: '',
    //           profitability: `${res.plans[i].profitability}`,
    //           price: `${res.plans[i].price}`,
    //         };
    //         this.BTCPlansLong.push(ele);
    //       }
    //     }
    //   );
    //   (await this.dashboard.getHashrateContractPlans('ETH', 'long')).subscribe(
    //     (res: any) => {
    //       console.log(res);
    //       for (let i = 0; i < res.plans.length; i++) {
    //         const ele = {
    //           id: res.plans[i]._id,
    //           type: `${res.plans[i].planName} Miners`,
    //           icon: '',
    //           avilability: res.plans[i].availability,
    //           duration: res.plans[i].planDuration,
    //           crypto: `${res.plans[i].cryptoName}`,
    //           power: res.PlansHashPower[1][i],
    //           pricePer: '',
    //           profitability: `${res.plans[i].profitability}`,
    //           price: `${res.plans[i].price}`,
    //         };
    //         this.ETHPlansLong.push(ele);
    //       }
    //     }
    //   );
    //   (await this.dashboard.getHashrateContractPlans('RVN', 'long')).subscribe(
    //     (res: any) => {
    //       console.log(res);
    //       for (let i = 0; i < res.plans.length; i++) {
    //         const ele = {
    //           id: res.plans[i]._id,
    //           type: `${res.plans[i].planName} Miners`,
    //           icon: '',
    //           avilability: res.plans[i].availability,
    //           duration: res.plans[i].planDuration,
    //           crypto: `${res.plans[i].cryptoName}`,
    //           power: res.PlansHashPower[1][i],
    //           pricePer: '',
    //           profitability: `${res.plans[i].profitability}`,
    //           price: `${res.plans[i].price}`,
    //         };
    //         if (res.plans[i].planType == 'long') {
    //           if (res.plans[i].cryptoName == 'RVN') {
    //             this.RVNPlansLong.push(ele);
    //           }
    //         }
    //       }
    //     }
    //   );
    //   (await this.dashboard.getHashrateContractPlans('LTCT', 'long')).subscribe(
    //     (res: any) => {
    //       console.log(res);
    //       for (let i = 0; i < res.plans.length; i++) {
    //         const ele = {
    //           id: res.plans[i]._id,
    //           type: `${res.plans[i].planName} Miners`,
    //           icon: '',
    //           avilability: res.plans[i].availability,
    //           duration: res.plans[i].planDuration,
    //           crypto: `${res.plans[i].cryptoName}`,
    //           power: res.PlansHashPower[1][i],
    //           pricePer: '',
    //           profitability: `${res.plans[i].profitability}`,
    //           price: `${res.plans[i].price}`,
    //         };
    //         this.LTCTPlansLong.push(ele);
    //       }
    //     }
    //   );
    //   (await this.dashboard.getHashrateContractPlans('BTC', 'short')).subscribe(
    //     (res: any) => {
    //       console.log(res);
    //       for (let i = 0; i < res.plans.length; i++) {
    //         const ele = {
    //           id: res.plans[i]._id,
    //           type: `${res.plans[i].planName} Miners`,
    //           icon: '',
    //           avilability: res.plans[i].availability,
    //           duration: res.plans[i].planDuration,
    //           crypto: `${res.plans[i].cryptoName}`,
    //           power: res.PlansHashPower[1][i],
    //           pricePer: '',
    //           profitability: `${res.plans[i].profitability}`,
    //           price: `${res.plans[i].price}`,
    //         };
    //         this.BTCPlansShort.push(ele);
    //       }
    //     }
    //   );
    //   (await this.dashboard.getHashrateContractPlans('ETH', 'short')).subscribe(
    //     (res: any) => {
    //       console.log(res);
    //       for (let i = 0; i < res.plans.length; i++) {
    //         const ele = {
    //           id: res.plans[i]._id,
    //           type: `${res.plans[i].planName} Miners`,
    //           icon: '',
    //           avilability: res.plans[i].availability,
    //           duration: res.plans[i].planDuration,
    //           crypto: `${res.plans[i].cryptoName}`,
    //           power: res.PlansHashPower[1][i],
    //           pricePer: '',
    //           profitability: `${res.plans[i].profitability}`,
    //           price: `${res.plans[i].price}`,
    //         };
    //         this.ETHPlansShort.push(ele);
    //       }
    //     }
    //   );
    //   (await this.dashboard.getHashrateContractPlans('RVN', 'short')).subscribe(
    //     (res: any) => {
    //       console.log(res);
    //       for (let i = 0; i < res.plans.length; i++) {
    //         const ele = {
    //           id: res.plans[i]._id,
    //           type: `${res.plans[i].planName} Miners`,
    //           icon: '',
    //           avilability: res.plans[i].availability,
    //           duration: res.plans[i].planDuration,
    //           crypto: `${res.plans[i].cryptoName}`,
    //           power: res.PlansHashPower[1][i],
    //           pricePer: '',
    //           profitability: `${res.plans[i].profitability}`,
    //           price: `${res.plans[i].price}`,
    //         };
    //         this.RVNPlansShort.push(ele);
    //       }
    //     }
    //   );
    //   (await this.dashboard.getHashrateContractPlans('LTCT', 'short')).subscribe(
    //     (res: any) => {
    //       console.log(res);
    //       for (let i = 0; i < res.plans.length; i++) {
    //         const ele = {
    //           id: res.plans[i]._id,
    //           type: `${res.plans[i].planName} Miners`,
    //           icon: '',
    //           avilability: res.plans[i].availability,
    //           duration: res.plans[i].planDuration,
    //           crypto: `${res.plans[i].cryptoName}`,
    //           power: res.PlansHashPower[1][i],
    //           pricePer: '',
    //           profitability: `${res.plans[i].profitability}`,
    //           price: `${res.plans[i].price}`,
    //         };
    //         this.LTCTPlansShort.push(ele);
    //       }
    //     }
    //   );
    setTimeout(() => {
      this.sharedSerivce.isLoading.next(false);
    }, 1600);
  } //on init ends

  shortPlansTap1() {
    this.shortPlansOpend = 'tap1';
  }
  shortPlansTap2() {
    this.shortPlansOpend = 'tap2';
  }
  shortPlansTap3() {
    this.shortPlansOpend = 'tap3';
  }
  shortPlansTap4() {
    this.shortPlansOpend = 'tap4';
  }
  longPlansTap1() {
    this.longPlansOpend = 'tap1';
  }
  longPlansTap2() {
    this.longPlansOpend = 'tap2';
  }
  longPlansTap3() {
    this.longPlansOpend = 'tap3';
  }
  longPlansTap4() {
    this.longPlansOpend = 'tap4';
  }
}
