import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selectedPlan: WorkerPlan;
  buyForm: FormGroup;
  buyFormOpend = false;
  constructor(
    private dashboardService: DashboardService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.buyForm = new FormGroup({
      currency: new FormControl(null, Validators.required),
    });
    this.dashboardService.getAllSellers().subscribe({
      next: (res) => {
        this.sellers = res.sellers;
        this.sellers.map((e) => {
          e.sellerPlans = [];
        });
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
    this.selectedPlan = plan;
    this.buyFormOpend = true;
  }
  onSubmit() {
    this.dashboardService
      .addPlanContractSeller(this.selectedPlan._id, this.buyForm.value.currency)
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
          console.log(err.error);
          this.sharedService.sentMessage.next({
            message: 'An error has occured, try again!',
            error: true,
          });
        },
      });
  }
}
