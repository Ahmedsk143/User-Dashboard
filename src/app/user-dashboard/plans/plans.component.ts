import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { PlanContract } from '../models/plan-contract.model';
import { DashboardService } from '../user-dashboard.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  selectedTap = 'tap1';
  activePlans: PlanContract[] = [];
  expiredPlans: PlanContract[] = [];
  activePlansLength = 0;
  expiredPlansLength = 0;
  minedChartTapOpend = 'tap1';
  basicOptions: any;

  constructor(
    private dashboard: DashboardService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.sharedService.isLoading.next(true);
    this.dashboard.getPlansContract().subscribe((res) => {
      res.map((e) => {
        let plan = e;
        plan.xAxis = [];
        plan.yAxis = [];
        e.hourlyGains?.map((e) => {
          plan.xAxis?.push(
            new Date(e.date).getUTCHours() +
              ':' +
              new Date(e.date).getUTCMinutes()
          );
          plan.yAxis?.push(e.profit);
        });
        if (plan.planStatus) {
          this.activePlans.push(plan);
        } else {
          this.expiredPlans.push(plan);
        }
      });
      this.activePlansLength = this.activePlans.length;
      this.expiredPlansLength = this.expiredPlans.length;
      console.log(this.expiredPlans);
      this.sharedService.isLoading.next(false);
    });
    this.basicOptions = {
      plugins: {
        tooltip: {
          backgroundColor: 'rgba(29, 26, 39, 0.6)',
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
}
