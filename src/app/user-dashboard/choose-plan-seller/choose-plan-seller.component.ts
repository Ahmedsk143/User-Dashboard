import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { Merchant } from '../models/merchant.model';
import { WorkerPlan } from '../models/worker-plan.model';
import { DashboardService } from '../user-dashboard.service';

@Component({
  selector: 'app-choose-plan-seller',
  templateUrl: './choose-plan-seller.component.html',
  styleUrls: ['./choose-plan-seller.component.scss'],
})
export class ChoosePlanSellerComponent implements OnInit {
  sellers: Merchant[];
  selectedSeller: Merchant;
  constructor(
    private dashboardService: DashboardService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getAllSellers().subscribe({
      next: (res) => {
        this.sellers = res.sellers;
        this.sellers.map((e) => {
          e.sellerPlans = [];
        });
        console.log(res);
        console.log(this.sellers);
      },
    });
  }
  getSellerPlans(seller: Merchant) {
    this.selectedSeller = seller;
    this.dashboardService
      .getSellerPlansById(this.selectedSeller.sellerID)
      .subscribe({
        next: (res) => {
          this.sellers.map((e) => {
            if (e.sellerID == this.selectedSeller.sellerID) {
              e.sellerPlans = res.sellerPlans;
            }
          });
        },
      });
  }
  addPlanContract(plan: WorkerPlan) {
    this.dashboardService.addPlanContractSeller(plan._id, 'eth').subscribe({
      next: (res) => {
        this.sharedService.sentMessage.next({
          message: 'Successfuly bought',
          error: false,
        });
      },
    });
    console.log(plan._id);
  }
}
