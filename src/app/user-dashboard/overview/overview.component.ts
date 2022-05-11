import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SharedService } from 'src/app/shared/shared.service';
import { PlanContract } from '../models/plan-contract.model';
import { UserData } from '../models/user-data.model';
import { DashboardService } from '../user-dashboard.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  UserData: UserData;
  //prices
  btcPrice = 0;
  ethPrice = 0;
  rvnPrice = 0;
  ltctPrice = 0;
  // plan contracts
  plans: PlanContract[];
  // calculated total mined of all plan contracts
  btcTotalMined = 0;
  ethTotalMined = 0;
  rvnTotalMined = 0;
  ltctTotalMined = 0;
  // calculated total hashrate of all plan contracts
  btcTotalSpeed = 0;
  ethTotalSpeed = 0;
  rvnTotalSpeed = 0;
  ltctTotalSpeed = 0;
  // calculated total active plan contracts
  btcTotalActive = 0;
  ethTotalActive = 0;
  rvnTotalActive = 0;
  ltctTotalActive = 0;
  // control the opend taps
  minedTapOpend = 'tap1';

  //time i used to delay if fetching the cards data
  // waitingTime: number = 1000;
  // config1 = {
  //   type: 'line',
  //   data: {
  //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //     datasets: [
  //       {
  //         label: 'My First Dataset',
  //         data: [65, 59, 80, 81, 56, 55, 40],
  //         fill: false,
  //         borderColor: 'rgb(75, 192, 192)',
  //         tension: 0.1,
  //       },
  //     ],
  //   },
  // };
  // config2 = {
  //   type: 'line',
  //   data: data,
  // };
  ////////////////////////////////////i added this
  // balances = new Array();
  // array = new Array(); ///// this is for the BTC ETH LTCT RVN
  // item: any;
  // BTC: any;
  // ETH: any;
  // RVN: any;
  // LTCT: any;
  /////////////////////////////////////////////// i added this to manupulate the graph Data
  // btcMiningDetails = new Array(12, 51, 62, 33, 21, 62, 45, 50, 30);
  // ethMiningDetails = new Array(10, 20, 20, 20, 50, 10, 40, 50, 30);
  // LTCTMiningDetails = new Array(15, 20, 24, 30, 40, 62, 45, 50, 30);
  // rvnMiningDetails = new Array(80, 70, 50, 30, 80, 50, 30, 50, 30);
  ////////////////////////////////////////////// i added this to make the color &Data of graph as constant
  // graphColor: string = 'rgba(255, 73, 128, 1)';
  // graphBackground: string = 'rgba(255, 73, 128, 0.2)';
  // graphData = new Array(
  //   'Mar 1',
  //   'Mar 2',
  //   'Mar 3',
  //   'Mar 4',
  //   'Mar 5',
  //   'Mar 6',
  //   'Mar 7',
  //   'Mar 8',
  //   'Mar 9'
  // );
  // graphTension = 0.4;
  ////////////////////////////////////////////// i added this to make the color of BasicOptioBackground as constant
  // basicOptionBackground: string = 'rgba(29, 26, 39, 0.6)';
  //////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  // multi: any;
  // view: any = [700, 350];

  // // options
  // legend: boolean = false;
  // showLabels: boolean = true;
  // animations: boolean = true;
  // xAxis: boolean = true;
  // yAxis: boolean = true;
  // showYAxisLabel: boolean = false;
  // showXAxisLabel: boolean = false;
  // xAxisLabel: string = 'Day';
  // yAxisLabel: string = 'Mined';
  // timeline: boolean = false;
  // showGridLines: boolean = true;

  // tap1Data: any;
  // tap2Data: any;
  // tap3Data: any;
  // tap4Data: any;

  // basicOptions: any;
  constructor(
    private dashboard: DashboardService,
    private sharedService: SharedService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    //get user data inculding the balances
    this.dashboard.getUserData().subscribe({
      next: (res) => {
        console.log(res);
        this.UserData = res;
        // this.sharedService.isLoading.next(false);
      },
    });
    //get current prices
    this.dashboard.getBTCPrice().subscribe({
      next: (res) => {
        this.btcPrice = res.USD;
      },
    });
    this.dashboard.getETHPrice().subscribe({
      next: (res) => {
        this.ethPrice = res.USD;
      },
    });
    this.dashboard.getRVNPrice().subscribe({
      next: (res) => {
        this.rvnPrice = res.USD;
      },
    });
    this.dashboard.getLTCTPrice().subscribe({
      next: (res) => {
        this.ltctPrice = res.data.amount ? res.data.amount : 0;
      },
    });

    //get plans contract
    this.dashboard.getPlansContract().subscribe({
      next: (res) => {
        this.plans = res;
        this.plans.map((e) => {
          if (e.planStatus) {
            if (e.cryptoName == 'BTC') {
              this.btcTotalSpeed += e.hashPower;
              this.btcTotalActive++;
            } else if (e.cryptoName == 'ETH') {
              this.ethTotalSpeed += e.hashPower;
              this.ethTotalActive++;
            } else if (e.cryptoName == 'RVN') {
              this.rvnTotalSpeed += e.hashPower;
              this.rvnTotalActive++;
            } else if (e.cryptoName == 'LTCT') {
              this.ltctTotalSpeed += e.hashPower;
              this.ltctTotalActive++;
            }
          }
          if (e.cryptoName == 'BTC') {
            this.btcTotalMined += e.totalMined;
          } else if (e.cryptoName == 'ETH') {
            this.ethTotalMined += e.totalMined;
          } else if (e.cryptoName == 'RVN') {
            this.rvnTotalMined += e.totalMined;
          } else if (e.cryptoName == 'LTCT') {
            this.ltctTotalMined += e.totalMined;
          }
        });
        // for (let i = 0; i < this.plans.length; i++) {
        //   if (this.plans[i].cryptoName === 'BTC' && this.plans[i].planStatus) {
        //     this.BTCPlansTotalMined += Number(this.plans[i].totalMined);
        //     this.BTCPlansMiningSpeed += Number(this.plans[i].hashPower);
        //   } else if (
        //     this.plans[i].cryptoName === 'ETH' &&
        //     this.plans[i].planStatus
        //   ) {
        //     this.ETHPlansTotalMined += Number(this.plans[i].totalMined);
        //     this.ETHPlansMiningSpeed += Number(this.plans[i].hashPower);
        //   } else if (
        //     this.plans[i].cryptoName === 'RVN' &&
        //     this.plans[i].planStatus
        //   ) {
        //     this.RVNPlansTotalMined += Number(this.plans[i].totalMined);
        //     this.RVNPlansMiningSpeed += Number(this.plans[i].hashPower);
        //   } else if (
        //     this.plans[i].cryptoName === 'LTCT' &&
        //     this.plans[i].planStatus
        //   ) {
        //     this.LTCTPlansTotalMined += Number(this.plans[i].totalMined);
        //     this.LTCTPlansMiningSpeed += Number(this.plans[i].hashPower);
        //   }
        // }
      },
    });

    // this.tap1Data = {
    //   labels: this.graphData,
    //   datasets: [
    //     {
    //       label: '',
    //       data: this.btcMiningDetails,
    //       fill: true,
    //       borderColor: this.graphColor,
    //       tension: this.graphTension,
    //       backgroundColor: this.graphBackground,
    //     },
    //   ],
    // };
    // this.tap2Data = {
    //   labels: this.graphData,
    //   datasets: [
    //     {
    //       label: '',
    //       data: this.ethMiningDetails,
    //       fill: true,
    //       borderColor: String(this.graphColor),
    //       tension: this.graphTension,
    //       backgroundColor: this.graphBackground,
    //     },
    //   ],
    // };
    // this.tap3Data = {
    //   labels: this.graphData,
    //   datasets: [
    //     {
    //       label: '',
    //       data: this.rvnMiningDetails,
    //       fill: true,
    //       borderColor: this.graphColor,
    //       tension: this.graphTension,
    //       backgroundColor: this.graphBackground,
    //     },
    //   ],
    // };
    // this.tap4Data = {
    //   labels: this.graphData,
    //   datasets: [
    //     {
    //       label: '',
    //       data: this.LTCTMiningDetails,
    //       fill: true,
    //       borderColor: this.graphColor,
    //       tension: this.graphTension,
    //       backgroundColor: this.graphBackground,
    //     },
    //   ],
    // };
    // this.basicOptions = {
    //   plugins: {
    //     tooltip: {
    //       backgroundColor: this.basicOptionBackground,
    //     },
    //     legend: {
    //       display: false,
    //       labels: {
    //         boxWidth: 0,
    //         boxHeight: 0,
    //       },
    //     },
    //   },
    //   scales: {
    //     x: {
    //       ticks: {
    //         color: '#ebedef',
    //       },
    //       grid: {
    //         color: 'rgba(255,255,255,0.2)',
    //       },
    //     },
    //     y: {
    //       ticks: {
    //         color: '#ebedef',
    //       },
    //       grid: {
    //         color: 'rgba(255,255,255,0.2)',
    //       },
    //     },
    //   },
    // };
  }
  //Control the opend tabs
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
}
