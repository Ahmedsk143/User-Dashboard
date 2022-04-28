import { Component } from '@angular/core';
// import { AppConfigService } from '../app-config.service';
// import { AppConfig } from '../appconfig';
import { Chart } from 'chart.js';
const chartData: any[] = [
  {
    name: 'Mar 1',
    value: 1,
  },
  {
    name: 'Mar 2',
    value: 2,
  },
  {
    name: 'Mar 3',
    value: 3,
  },
  {
    name: 'March 4',
    value: 4,
  },
  {
    name: 'March 6',
    value: 6,
  },
  {
    name: 'March 7',
    value: 7,
  },
  {
    name: 'March 8',
    value: 8,
  },
  {
    name: 'March 9',
    value: 9,
  },
  {
    name: 'March 14',
    value: 14,
  },
];

@Component({
  selector: 'app-timeline-chart',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.scss'],
})
export class TimelineChartComponent {
  // basicData: any;

  // lineStylesData: any;

  // basicOptions: any;

  // subscription: Subscription;

  // config: AppConfig;

  // constructor(private configService: AppConfigService) {}

  ngOnInit() {
    // this.lineStylesData = {
    //   labels: ['Mar 1', 'Mar 2', 'Mar 3', 'Mar 4', 'Mar 5', 'Mar 6', 'Mar 7'],
    //   datasets: [
    //     {
    //       label: '',
    //       data: [12, 51, 62, 33, 21, 62, 45],
    //       fill: true,
    //       borderColor: 'rgba(255, 73, 128, 1)',
    //       tension: 0.4,
    //       backgroundColor: 'rgba(255, 73, 128, 0.2)',
    //     },
    //   ],
    // };
    // this.config = this.configService.config;
    // this.updateChartOptions();
    // this.subscription = this.configService.configUpdate$.subscribe((config) => {
    //   this.config = config;
    //   this.updateChartOptions();
    // });
  }

  // updateChartOptions() {
  //   if (this.config.dark) this.applyDarkTheme();
  //   else this.applyLightTheme();
  // }

  // applyLightTheme() {
  //   this.basicOptions = {
  //     plugins: {
  //       legend: {
  //         labels: {
  //           boxWidth: 0,
  //           boxHeight: 0,
  //         },
  //       },
  //     },
  //     scales: {
  //       x: {
  //         ticks: {
  //           color: '#495057',
  //         },
  //         grid: {
  //           color: '#ebedef',
  //         },
  //       },
  //       y: {
  //         ticks: {
  //           color: '#495057',
  //         },
  //         grid: {
  //           color: '#ebedef',
  //         },
  //       },
  //     },
  //   };
  // }

  // applyDarkTheme() {
  //   this.basicOptions = {
  //     plugins: {
  //       tooltip: {
  //         backgroundColor: 'rgba(29, 26, 39, 0.6)',
  //       },
  //       legend: {
  //         display: false,
  //         labels: {
  //           boxWidth: 0,
  //           boxHeight: 0,
  //         },
  //       },
  //     },
  //     scales: {
  //       x: {
  //         ticks: {
  //           color: '#ebedef',
  //         },
  //         grid: {
  //           color: 'rgba(255,255,255,0.2)',
  //         },
  //       },
  //       y: {
  //         ticks: {
  //           color: '#ebedef',
  //         },
  //         grid: {
  //           color: 'rgba(255,255,255,0.2)',
  //         },
  //       },
  //     },
  //   };
  // }
}
