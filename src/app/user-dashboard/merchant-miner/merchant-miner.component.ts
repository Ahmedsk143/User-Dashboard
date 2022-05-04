import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { DistAsic } from '../models/dist-asic.model';
import { WorkerPlan } from '../models/worker-plan.model';
import { MerchantUser } from '../models/merchant-users.model';
import { DashboardService } from '../user-dashboard.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-merchant-miner',
  templateUrl: './merchant-miner.component.html',
  styleUrls: ['./merchant-miner.component.scss'],
})
export class MerchantMinerComponent implements OnInit {
  sub: Subscription;
  //the worker data
  worker: DistAsic;
  //worker id from params
  workerID: string;
  selectedTap = 'tap1';
  //the list of plans
  workerPlans: WorkerPlan[];
  workerPlansLength: number;
  //the list of users
  merchantUsers: MerchantUser[];
  merchantUsersLength: number;
  // Forms
  newPlanForm: FormGroup;
  editPlanForm: FormGroup;
  // to control the choose currency dropdown menu
  dropCollapsed = false;
  // to toggle the add new form
  newFormOpend = false;
  // to toggle the edit form
  editFormOpend = false;
  // to show the menu only on the selected miner
  selectedPlan: WorkerPlan = new WorkerPlan();
  /// the selected miner to be edit
  planToEdit: WorkerPlan = new WorkerPlan();
  // error messages
  newFormError = '';
  updateFormError = '';
  deleteConfirmOpend = false;
  constructor(
    private clipboard: Clipboard,
    private dashboardService: DashboardService,
    private activatedRoute: ActivatedRoute,
    private sharedSerivce: SharedService
  ) {}
  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe((params) => {
      this.workerID = params.get('workerID')!;
      this.dashboardService.getWorkerDataById(this.workerID).subscribe({
        next: (res) => {
          this.worker = res[0];
          console.log(res);
        },
        error: (err) => {},
      });
      this.dashboardService.getWorkerPlansById(this.workerID).subscribe({
        next: (res) => {
          console.log(res);
          this.workerPlans = res.workerPlans;
          this.workerPlansLength = res.workerPlans.length;
        },
        error: (err) => {},
      });
      this.dashboardService.getWorkerUsersById(this.workerID).subscribe({
        next: (res) => {
          console.log(res);
          this.merchantUsers = res.planContracts;
          this.merchantUsersLength = res.planContracts.length;
        },
      });
    });
    this.newPlanForm = new FormGroup({
      planName: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
      power: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
    });
    this.editPlanForm = new FormGroup({
      _id: new FormControl(null, [Validators.required]),
      planName: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
      power: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
    });
  }
  //Check the plan name to open the menu corrsponding to that plan
  checkSelected(plan: WorkerPlan) {
    // assign the plan name to the selected plan and editplan
    if (this.selectedPlan._id != plan._id) {
      this.selectedPlan = plan;
      this.planToEdit = plan;
      this.editPlanForm.setValue({
        _id: this.planToEdit._id,
        planName: this.planToEdit.planName,
        price: this.planToEdit.price,
        power: this.planToEdit.hashPower,
      });
    }
    //to toggle the menue when clicked again
    else {
      this.selectedPlan = new WorkerPlan();
    }
  }

  onNew() {
    if (this.newPlanForm.valid) {
      const plan = this.newPlanForm.value;
      console.log(this.workerID, plan.planName, plan.price, plan.power);
      this.dashboardService
        .addWorkerPlan(this.workerID, plan.planName, plan.price, plan.power)
        .subscribe({
          next: () => {
            window.location.reload();
          },
          error: () => {
            this.newFormError = 'Some errors occured, try again!';
          },
        });
    } else return;
  }
  onUpdate() {
    if (this.editPlanForm.valid) {
      const plan = this.editPlanForm.value;
      this.dashboardService
        .updateWorkerPlan(
          this.workerID,
          this.planToEdit._id,
          plan.planName,
          plan.price,
          plan.power
        )
        .subscribe({
          next: () => {
            // const message = `'${this.editPlanForm.value.planName}' has been edited `;
            // //to update the view of the component without refersh
            // const updatedInedx = this.workerPlans.findIndex((e) => {
            //   return e._id == plan._id;
            // });
            // this.workerPlans[updatedInedx] = plan;
            // // console.log(this.plans[updatedInedx]);
            // this.editPlanForm.reset();
            // this.editFormOpend = false;
            // //tp send message to the notification component
            // this.sharedSerivce.sentMessage.next({
            //   message: message,
            //   error: false,
            // });
            window.location.reload();
          },
          error: () => {
            this.updateFormError = 'Some error occured, try again!';
          },
        });
    } else return;
  }
  onDelete() {
    this.dashboardService
      .deleteWorkerPlan(this.workerID, this.planToEdit._id)
      .subscribe({
        next: () => {
          const message = `'${this.planToEdit.planName}' has been deleted `;
          //to update the view of the component without refersh
          const updatedInedx = this.workerPlans.findIndex((e) => {
            return e._id == this.planToEdit._id;
          });
          if (updatedInedx > -1) {
            this.workerPlans.splice(updatedInedx, 1);
            this.workerPlansLength = this.workerPlans.length;
          }

          this.deleteConfirmOpend = false;
          //to send message to the notification component
          this.sharedSerivce.sentMessage.next({
            message: message,
            error: false,
          });
        },
      });
  }
  copyText(link: any) {
    this.clipboard.copy(link);
    console.log(link);
  }
}
