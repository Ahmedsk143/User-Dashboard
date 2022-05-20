import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../user-dashboard.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Plan } from '../models/plan.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.component.html',
  styleUrls: ['./choose-plan.component.scss'],
})
export class ChoosePlanComponent implements OnInit {
  short = true;
  shortPlansOpend = 'tap1';
  longPlansOpend = 'tap1';
  shortPlansBTC: Plan[];
  longPlansBTC: Plan[];
  shortPlansETH: Plan[];
  longPlansETH: Plan[];
  shortPlansRVN: Plan[];
  longPlansRVN: Plan[];
  shortPlansLTCT: Plan[];
  longPlansLTCT: Plan[];
  buyForm: FormGroup;
  buyFormOpend = false;
  selectedPlan: Plan;
  constructor(
    private dashboard: DashboardService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.buyForm = new FormGroup({
      currency: new FormControl(null, Validators.required),
    });
    this.onShortBTC();
  }

  onShortBTC() {
    this.sharedService.isLoading.next(true);
    this.dashboard.getShortBTC().subscribe({
      next: (res) => {
        for (let i = 0; i < res.plans.length; i++) {
          res.plans[i].hashPower = res.PlansHashPower[i].hashrate;
        }
        this.shortPlansBTC = res.plans;
        this.sharedService.isLoading.next(false);
      },
      error: (err) => {
        this.sharedService.isLoading.next(false);
      },
    });
  }
  onLongBTC() {
    this.sharedService.isLoading.next(true);
    this.dashboard.getLongBTC().subscribe({
      next: (res) => {
        for (let i = 0; i < res.plans.length; i++) {
          res.plans[i].hashPower = res.PlansHashPower[i].hashrate;
        }
        this.longPlansBTC = res.plans;
        this.sharedService.isLoading.next(false);
      },
      error: (err) => {
        this.sharedService.isLoading.next(false);
      },
    });
  }
  onShortETH() {
    this.sharedService.isLoading.next(true);
    this.dashboard.getShortETH().subscribe({
      next: (res) => {
        for (let i = 0; i < res.plans.length; i++) {
          res.plans[i].hashPower = res.PlansHashPower[i].hashrate;
        }
        this.shortPlansETH = res.plans;
        this.sharedService.isLoading.next(false);
      },
      error: (err) => {
        this.sharedService.isLoading.next(false);
      },
    });
  }
  onLongETH() {
    this.sharedService.isLoading.next(true);
    this.dashboard.getLongETH().subscribe({
      next: (res) => {
        for (let i = 0; i < res.plans.length; i++) {
          res.plans[i].hashPower = res.PlansHashPower[i].hashrate;
        }
        this.longPlansETH = res.plans;
        this.sharedService.isLoading.next(false);
      },
      error: (err) => {
        this.sharedService.isLoading.next(false);
      },
    });
  }
  onShortRVN() {
    this.sharedService.isLoading.next(true);
    this.dashboard.getShortRVN().subscribe({
      next: (res) => {
        for (let i = 0; i < res.plans.length; i++) {
          res.plans[i].hashPower = res.PlansHashPower[i].hashrate;
        }
        this.shortPlansRVN = res.plans;
        this.sharedService.isLoading.next(false);
      },
      error: (err) => {
        this.sharedService.isLoading.next(false);
      },
    });
  }
  onLongRVN() {
    this.sharedService.isLoading.next(true);
    this.dashboard.getLongRVN().subscribe({
      next: (res) => {
        for (let i = 0; i < res.plans.length; i++) {
          res.plans[i].hashPower = res.PlansHashPower[i].hashrate;
        }
        this.longPlansRVN = res.plans;
        this.sharedService.isLoading.next(false);
      },
      error: (err) => {
        this.sharedService.isLoading.next(false);
      },
    });
  }
  onShortLTCT() {
    this.sharedService.isLoading.next(true);
    this.dashboard.getShortLTCT().subscribe({
      next: (res) => {
        for (let i = 0; i < res.plans.length; i++) {
          res.plans[i].hashPower = res.PlansHashPower[i].hashrate;
        }
        this.shortPlansLTCT = res.plans;
        this.sharedService.isLoading.next(false);
      },
      error: (err) => {
        this.sharedService.isLoading.next(false);
      },
    });
  }
  onLongLTCT() {
    this.sharedService.isLoading.next(true);
    this.dashboard.getLongLTCT().subscribe({
      next: (res) => {
        for (let i = 0; i < res.plans.length; i++) {
          res.plans[i].hashPower = res.PlansHashPower[i].hashrate;
        }
        this.longPlansLTCT = res.plans;
        this.sharedService.isLoading.next(false);
      },
      error: (err) => {
        this.sharedService.isLoading.next(false);
      },
    });
  }
  addPlanContract(plan: Plan) {
    this.selectedPlan = plan;
    this.buyFormOpend = true;
  }
  onSubmit() {
    this.dashboard
      .addPlanContract(this.selectedPlan._id, this.buyForm.value.currency)
      .subscribe({
        next: (res) => {
          this.buyFormOpend = false;
          this.sharedService.sentMessage.next({
            message: 'Plan is successfuly bought',
            error: false,
          });
        },
        error: (err) => {
          this.buyFormOpend = false;
          this.sharedService.sentMessage.next({
            message: 'An error has occured, try again!',
            error: true,
          });
        },
      });
  }
  shortPlansTap1() {
    this.onShortBTC();
    this.shortPlansOpend = 'tap1';
  }
  shortPlansTap2() {
    this.onShortETH();
    this.shortPlansOpend = 'tap2';
  }
  shortPlansTap3() {
    this.onShortRVN();
    this.shortPlansOpend = 'tap3';
  }
  shortPlansTap4() {
    this.onShortLTCT();
    this.shortPlansOpend = 'tap4';
  }
  longPlansTap1() {
    this.onLongBTC();
    this.longPlansOpend = 'tap1';
  }
  longPlansTap2() {
    this.onLongETH();
    this.longPlansOpend = 'tap2';
  }
  longPlansTap3() {
    this.onLongRVN();
    this.longPlansOpend = 'tap3';
  }
  longPlansTap4() {
    this.onLongLTCT();
    this.longPlansOpend = 'tap4';
  }
}
