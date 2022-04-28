import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Numeric, stratify } from 'd3';
import { AuthService } from 'src/app/Auth/auth.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Balance } from '../balance.model';
import { DashboardService } from '../user-dashboard.service';
const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  //time i used to delay if fetching the cards data
  waitingTime: number = 1000;
  UserData: any = {
    userName: '',
    balance: '',
    activePlans: 0,
  };
  //////////////////////////////////////////////////////////added vars

  _balance_btc: any;
  _balance_eth: any;
  _balance_rvn: any;
  _balance_LTCT: any;
  _activePlans: any;

  //////////////////////////////////////////////////////////////////////

  minedTapOpend = 'tap1';
  minedChartTapOpend = 'tap1';
  gainsChartTapOpend = 'tap1';
  config1 = {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    },
  };
  config2 = {
    type: 'line',
    data: data,
  };
  ////////////////////////////////////i added this
  balances = new Array();
  array = new Array(); ///// this is for the BTC ETH LTCT RVN
  item: any;

  BTC: any;
  ETH: any;
  RVN: any;
  LTCT: any;

  /////////////////////////////////////////////// i added this to manupulate the graph Data
  btcMiningDetails = new Array(12, 51, 62, 33, 21, 62, 45, 50, 30);
  ethMiningDetails = new Array(10, 20, 20, 20, 50, 10, 40, 50, 30);
  LTCTMiningDetails = new Array(15, 20, 24, 30, 40, 62, 45, 50, 30);
  rvnMiningDetails = new Array(80, 70, 50, 30, 80, 50, 30, 50, 30);
  ////////////////////////////////////////////// i added this to make the color &Data of graph as constant
  graphColor: string = 'rgba(255, 73, 128, 1)';
  graphBackground: string = 'rgba(255, 73, 128, 0.2)';
  graphData = new Array(
    'Mar 1',
    'Mar 2',
    'Mar 3',
    'Mar 4',
    'Mar 5',
    'Mar 6',
    'Mar 7',
    'Mar 8',
    'Mar 9'
  );
  graphTension = 0.4;
  ////////////////////////////////////////////// i added this to make the color of BasicOptioBackground as constant
  basicOptionBackground: string = 'rgba(29, 26, 39, 0.6)';
  //////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  multi: any;
  view: any = [700, 350];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Day';
  yAxisLabel: string = 'Mined';
  timeline: boolean = false;
  showGridLines: boolean = true;

  tap1Data: any;
  tap2Data: any;
  tap3Data: any;
  tap4Data: any;

  basicOptions: any;

  btcPrice: string;
  ethPrice: string;
  rvnPrice: string;
  LTCTPrice: string;
  plans: any;
  BTCPlansTotalMined = 0;
  ETHPlansTotalMined = 0;
  LTCTPlansTotalMined = 0;
  RVNPlansTotalMined = 0;

  BTCPlansMiningSpeed = 0;
  ETHPlansMiningSpeed = 0;
  LTCTPlansMiningSpeed = 0;
  RVNPlansMiningSpeed = 0;
  constructor(
    private dashboard: DashboardService,
    private authServics: AuthService,
    private router: Router,
    private sharedSerivce: SharedService
  ) {
    Chart.register(...registerables);
  }

  async ngOnInit() {
    this.sharedSerivce.isLoading.next(true);

    // this.UserData = this.authServics.UserData();
    await this.dashboard.userData().subscribe({
      next: (res) => {
        //console.log(res);
        this.UserData = res;
        this._balance_btc = this.UserData.balance.btc;
        this._balance_eth = this.UserData.balance.eth;
        this._balance_LTCT = this.UserData.balance.ltct;
        this._balance_rvn = this.UserData.balance.rvn;
        // this.sharedSerivce.isLoading.next(false);
      },
      error: (err) => {
        console.log(err);
        //  this.sharedSerivce.isLoading.next(false);
      },
    });
    //this fetches the data and push it in the balances$ stream

    //this is fetching the data from the server and the external API and load cards

    /////////////////////////////here i added waiting by 1 sec to load the latest data
    await setTimeout(() => {
      this.dashboard.getPriceOfBitcoin().subscribe({
        next: (res) => {
          ///////////////////////
          this.btcPrice = res.USD;
          this.balances.push({
            currency: 'BTC',
            currencyBalance: this.UserData.balance.btc.toFixed(8),
            plans: this.UserData.activePlans,
            price: this.btcPrice,
            minWithdraw: 0.00005,
          });

          //console.log(res);
          // this.sharedSerivce.isLoading.next(false);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }, this.waitingTime);

    await setTimeout(() => {
      this.dashboard.getPriceOfEth().subscribe({
        next: (res) => {
          this.ethPrice = res.USD;
          this.balances.push({
            currency: 'ETH',
            currencyBalance: this.UserData.balance.eth.toFixed(8),
            plans: this.UserData.activePlans,
            price: this.ethPrice,
            minWithdraw: 0.00005,
          });
          //  this.sharedSerivce.isLoading.next(false);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }, this.waitingTime);

    await setTimeout(() => {
      this.dashboard.getPriceOfRVN().subscribe({
        next: (res) => {
          this.rvnPrice = res.USD;
          this.balances.push({
            currency: 'RVN',
            currencyBalance: this.UserData.balance.rvn.toFixed(8),
            plans: this.UserData.activePlans,
            price: this.rvnPrice,
            minWithdraw: 0.00005,
          });
          // this.sharedSerivce.isLoading.next(false);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }, this.waitingTime);

    await setTimeout(() => {
      this.dashboard.getPriceOfLTCT().subscribe({
        next: (res) => {
          this.LTCTPrice = res.data.amount ? res.data.amount : 0;
          this.balances.push({
            currency: 'LTCT',
            currencyBalance: this.UserData.balance.ltct.toFixed(8),
            plans: this.UserData.activePlans,
            price: this.LTCTPrice,
            minWithdraw: 0.00005,
          });
          //  this.sharedSerivce.isLoading.next(false);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }, this.waitingTime);

    this.BTC = this.balances[0];
    this.ETH = this.balances[1];
    this.RVN = this.balances[2];
    this.LTCT = this.balances[3];

    ////////////////////////////////////////////////////////////////////////
    ///////////////////here calculating the total mined of each currency and mining speed for each currency
    await this.dashboard.getPlans().subscribe({
      next: (res) => {
        this.plans = res;
        for (let i = 0; i < this.plans.length; i++) {
          if (this.plans[i].cryptoName === 'BTC' && this.plans[i].planStatus) {
            this.BTCPlansTotalMined += Number(this.plans[i].totalMined);
            this.BTCPlansMiningSpeed += Number(this.plans[i].hashPower);
          } else if (
            this.plans[i].cryptoName === 'ETH' &&
            this.plans[i].planStatus
          ) {
            this.ETHPlansTotalMined += Number(this.plans[i].totalMined);
            this.ETHPlansMiningSpeed += Number(this.plans[i].hashPower);
          } else if (
            this.plans[i].cryptoName === 'RVN' &&
            this.plans[i].planStatus
          ) {
            this.RVNPlansTotalMined += Number(this.plans[i].totalMined);
            this.RVNPlansMiningSpeed += Number(this.plans[i].hashPower);
          } else if (
            this.plans[i].cryptoName === 'LTCT' &&
            this.plans[i].planStatus
          ) {
            this.LTCTPlansTotalMined += Number(this.plans[i].totalMined);
            this.LTCTPlansMiningSpeed += Number(this.plans[i].hashPower);
          }
        }
        // this.sharedSerivce.isLoading.next(false);
      },
    });

    ///////////////////////////////////////////////btc graph called btcMiningDetails
    this.tap1Data = {
      labels: this.graphData,
      datasets: [
        {
          label: '',
          data: this.btcMiningDetails,
          fill: true,
          borderColor: this.graphColor,
          tension: this.graphTension,
          backgroundColor: this.graphBackground,
        },
      ],
    };
    this.tap2Data = {
      labels: this.graphData,
      datasets: [
        {
          label: '',
          data: this.ethMiningDetails,
          fill: true,
          borderColor: String(this.graphColor),
          tension: this.graphTension,
          backgroundColor: this.graphBackground,
        },
      ],
    };
    this.tap3Data = {
      labels: this.graphData,
      datasets: [
        {
          label: '',
          data: this.rvnMiningDetails,
          fill: true,
          borderColor: this.graphColor,
          tension: this.graphTension,
          backgroundColor: this.graphBackground,
        },
      ],
    };
    this.tap4Data = {
      labels: this.graphData,
      datasets: [
        {
          label: '',
          data: this.LTCTMiningDetails,
          fill: true,
          borderColor: this.graphColor,
          tension: this.graphTension,
          backgroundColor: this.graphBackground,
        },
      ],
    };
    this.basicOptions = {
      plugins: {
        tooltip: {
          backgroundColor: this.basicOptionBackground,
        },
        legend: {
          display: false,
          labels: {
            boxWidth: 0,
            boxHeight: 0,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
        y: {
          ticks: {
            color: '#ebedef',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
      },
    };
    setTimeout(() => {
      this.sharedSerivce.isLoading.next(false);
    }, this.waitingTime + 200);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  goToPlans() {
    this.router.navigate(['/user/dashboard/choose-plan']);
  }
  goToWithdraw() {
    this.router.navigate(['/user/dashboard/withdraw']);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  update(event: Event) {}
  minedTap1() {
    this.minedTapOpend = 'tap1';
  }
  minedTap2() {
    this.minedTapOpend = 'tap2';
  }
  minedTap3() {
    this.minedTapOpend = 'tap3';
  }
  minedTap4() {
    this.minedTapOpend = 'tap4';
  }
  minedChartTap1() {
    this.minedChartTapOpend = 'tap1';
  }
  minedChartTap2() {
    this.minedChartTapOpend = 'tap2';
  }
  minedChartTap3() {
    this.minedChartTapOpend = 'tap3';
  }
  minedChartTap4() {
    this.minedChartTapOpend = 'tap4';
  }
  gainsChartTap1() {
    this.gainsChartTapOpend = 'tap1';
  }
  gainsChartTap2() {
    this.gainsChartTapOpend = 'tap2';
  }
  gainsChartTap3() {
    this.gainsChartTapOpend = 'tap3';
  }
  gainsChartTap4() {
    this.gainsChartTapOpend = 'tap4';
  }
  //////////////////////////////////////////////////////////// i edit this to make the widget work
  async getBTC() {
    this.item = this.array.filter((item) =>
      item.title.toLowerCase().includes('BTC')
    );
    return await this.item.miningSpeed;
  }
  async getETH() {
    return await this.ETH.miningSpeed;
  }
  async getRVN() {
    return await this.RVN.miningSpeed;
  }
  async getLTCT() {
    return await this.LTCT.miningSpeed;
  }
}
