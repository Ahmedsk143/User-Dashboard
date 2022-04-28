import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminDashboardService } from '../admin-dashboard.service';
import { Plan } from '../models/plan.model';

export interface planError {
  value: string;
  msg: string;
  param: string;
  location: string;
}

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  newPlanForm: FormGroup;
  editPlanForm: FormGroup;
  // to control the choose currency dropdown menu
  dropCollapsed = false;
  // to control what is displayed on the trigger button
  selected = 'all';
  // to toggle the add new form
  newFormOpend = false;
  // to toggle the edit form
  editFormOpend = false;
  // to toggle the delete confirm
  deleteConfirmOpend = false;
  // to show the menu only on the selected miner
  selectedPlan: Plan = new Plan();
  /// the selected miner to be edit
  planToEdit: Plan = new Plan();
  // The plans shown to user
  plans: Plan[] = [];
  plansLength: number;
  BTCNum: number;
  // error messages
  newFormError = '';
  updateFormError = '';
  errors: planError[] = [
    {
      value: 'asd',
      msg: 'Invalid value',
      param: 'planType',
      location: 'body',
    },
  ];
  displayedErrors: any = {
    planType: false,
    planName: false,
    cryptoName: false,
    algorithm: false,
    planDuration: false,
    profitability: false,
    price: false,
  };
  constructor(
    private dashboardService: AdminDashboardService,
    private sharedSerivce: SharedService
  ) {}
  ngOnInit(): void {
    this.sharedSerivce.isLoading.next(true);
    this.dashboardService.getPlans().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.plans = res;
          this.plansLength = this.plans.length;
        } else {
          this.plans = [];
          this.plansLength = 0;
        }
        this.sharedSerivce.isLoading.next(false);
      },
      error: (err) => {
        this.dashboardService.errorHandler(err);
        this.sharedSerivce.isLoading.next(false);
      },
    });
    this.newPlanForm = new FormGroup({
      planType: new FormControl(null, [Validators.required]),
      planName: new FormControl(null, [Validators.required]),
      cryptoName: new FormControl(null, [Validators.required]),
      algorithm: new FormControl(null, [Validators.required]),
      planDuration: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
      profitability: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
    });
    this.editPlanForm = new FormGroup({
      _id: new FormControl(null, [Validators.required]),
      planType: new FormControl(null, [Validators.required]),
      planName: new FormControl(null, [Validators.required]),
      cryptoName: new FormControl(null, [Validators.required]),
      algorithm: new FormControl(null, [Validators.required]),
      planDuration: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
      profitability: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
      availability: new FormControl(null, [Validators.required]),
      createdAt: new FormControl(null, [Validators.required]),
    });
  }
  //to check what plans to show on the page by the dropdown menu
  checkDisplayedPlans(plan: Plan) {
    if (plan.cryptoName.includes('BTC') && this.selected == 'tap1') {
      return true;
    } else if (plan.cryptoName.includes('ETH') && this.selected == 'tap2') {
      return true;
    } else if (plan.cryptoName.includes('RVN') && this.selected == 'tap3') {
      return true;
    } else if (plan.cryptoName.includes('LTCT') && this.selected == 'tap4') {
      return true;
    } else if (this.selected == 'all') {
      return true;
    }
  }
  //Check the plan name to open the menu corrsponding to that plan
  checkSelected(plan: Plan) {
    // assign the plan name to the selected plan and editplan
    if (this.selectedPlan._id != plan._id) {
      this.selectedPlan = plan;
      this.planToEdit = plan;
      this.editPlanForm.setValue({
        _id: this.selectedPlan._id,
        planType: this.selectedPlan.planType,
        planName: this.selectedPlan.planName,
        cryptoName: this.selectedPlan.cryptoName,
        algorithm: this.selectedPlan.algorithm,
        planDuration: this.selectedPlan.planDuration,
        profitability: this.selectedPlan.profitability,
        price: this.selectedPlan.price,
        availability: true,
        createdAt: this.selectedPlan.createdAt,
      });
    }
    //to toggle the menue when clicked again
    else {
      this.selectedPlan = new Plan();
    }
  }

  onNew() {
    if (this.newPlanForm.valid) {
      const plan = this.newPlanForm.value;
      console.log(plan);
      this.dashboardService.addNewPlan(plan).subscribe({
        next: () => {
          //the problem with the commented code is that the _id of the new plan is empty..
          // and i select the plans based on the _id.. the solution is to select based on a created id by me
          // const message = `'${this.newPlanForm.value.planName}' has been added `;
          // this.newPlanForm.reset();
          // this.newFormOpend = false;
          // this.sharedSerivce.sentMessage.next(message);
          // this.selectedPlan = new Plan();
          // const fullPlan = {
          //   ...plan,
          //   _id: '',
          //   availability: true,
          //   createdAt: Date.now(),
          // };
          // this.plans.push(fullPlan);
          // this.plansLength = this.plans.length;
          window.location.reload();
        },
        error: (err) => {
          // console.log(err.error);
          // console.log(err.error.errors);
          // this.errors = err.error['errors'];
          // for (let i = 0; i <= err.error.length; i++) {
          //   console.log(this.errors[i]?.msg, this.errors[i]?.param);
          //   if (
          //     this.errors[i]?.msg == 'Invalid value' &&
          //     this.errors[i]?.param == 'planType'
          //   ) {
          //     this.displayedErrors.planType = true;
          //   } else if (
          //     this.errors[i]?.msg == 'Invalid value' &&
          //     this.errors[i]?.param == 'planName'
          //   ) {
          //     this.displayedErrors.planName = true;
          //   } else if (
          //     this.errors[i]?.msg == 'Invalid value' &&
          //     this.errors[i]?.param == 'cryptoName'
          //   ) {
          //     this.displayedErrors.cryptoName = true;
          //   } else if (
          //     this.errors[i]?.msg == 'Invalid value' &&
          //     this.errors[i]?.param == 'algorithm'
          //   ) {
          //     this.displayedErrors.algorithm = true;
          //   } else if (
          //     this.errors[i]?.msg == 'Invalid value' &&
          //     this.errors[i]?.param == 'planDuration'
          //   ) {
          //     this.displayedErrors.planDuration = true;
          //   } else if (
          //     this.errors[i]?.msg == 'Invalid value' &&
          //     this.errors[i]?.param == 'profitability'
          //   ) {
          //     this.displayedErrors.profitability = true;
          //   } else if (
          //     this.errors[i]?.msg == 'Invalid value' &&
          //     this.errors[i]?.param == 'price'
          //   ) {
          //     this.displayedErrors.price = true;
          //   }
          // }
          // console.log(this.displayedErrors);
          this.dashboardService.errorHandler(err);
          this.newFormError = 'Some errors occured, try again!';
        },
      });
    } else return;
  }
  onUpdate() {
    if (this.editPlanForm.valid) {
      const plan = this.editPlanForm.value;
      this.dashboardService.updatePlan(plan).subscribe({
        next: () => {
          const message = `'${this.editPlanForm.value.planName}' has been edited `;
          //to update the view of the component without refersh
          const updatedInedx = this.plans.findIndex((e) => {
            return e._id == plan._id;
          });
          this.plans[updatedInedx] = plan;
          // console.log(this.plans[updatedInedx]);
          this.editPlanForm.reset();
          this.editFormOpend = false;
          //tp send message to the notification component
          this.sharedSerivce.sentMessage.next({
            message: message,
            error: false,
          });
        },
        error: (err) => {
          this.dashboardService.errorHandler(err);
          this.updateFormError = 'Some error occured, try again!';
          console.log(err);
        },
      });
    } else return;
  }
  onDelete() {
    this.dashboardService.deletePlan(this.planToEdit).subscribe({
      next: () => {
        const message = `'${this.planToEdit.planName}' has been deleted `;
        //to update the view of the component without refersh
        const updatedInedx = this.plans.findIndex((e) => {
          return e._id == this.planToEdit._id;
        });
        if (updatedInedx > -1) {
          this.plans.splice(updatedInedx, 1);
          this.plansLength = this.plans.length;
        }

        this.deleteConfirmOpend = false;
        //to send message to the notification component
        this.sharedSerivce.sentMessage.next({
          message: message,
          error: false,
        });
      },
      error: (err) => {
        this.dashboardService.errorHandler(err);
      },
    });
  }
  updateAval(plan: Plan) {
    this.editPlanForm.setValue({
      _id: plan._id,
      planType: plan.planType,
      planName: plan.planName,
      cryptoName: plan.cryptoName,
      algorithm: plan.algorithm,
      planDuration: plan.planDuration,
      profitability: plan.profitability,
      price: plan.price,
      availability: !plan.availability,
      createdAt: plan.createdAt,
    });
    this.dashboardService.updatePlan(this.editPlanForm.value).subscribe({
      next: () => {
        const message = `'${this.editPlanForm.value.planName}' availability has been changed  `;
        //to update the view of the component without refersh
        const updatedInedx = this.plans.findIndex((e) => {
          return e._id == plan._id;
        });
        this.plans[updatedInedx] = plan;
        this.plans = [...this.plans];
        this.editPlanForm.reset();
        //tp send message to the notification component
        this.sharedSerivce.sentMessage.next({
          message: message,
          error: false,
        });
      },
      error: (err) => {
        this.dashboardService.errorHandler(err);
        console.log(err);
      },
    });
  }
}
