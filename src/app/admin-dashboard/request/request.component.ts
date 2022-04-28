import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminDashboardService } from '../admin-dashboard.service';
import { RequestNew } from '../models/req-new.model';
import { RequestApproved } from '../models/req-approved.model';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  selectedTap = 'tap1';
  newRequests: RequestNew[] = [];
  approvedRequests: RequestApproved[] = [];
  newRequestsLength: number;
  approvedRequestsLength: number;
  acceptForm: FormGroup;
  acceptFormOpend = false;
  endConfirmOpend = false;
  selectedRequest: RequestNew;
  selectedApprovedRequest: RequestApproved;

  constructor(
    private dashboardService: AdminDashboardService,
    private sharedSerivce: SharedService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.sharedSerivce.isLoading.next(true);
    this.dashboardService.getRequests().subscribe({
      next: (res) => {
        this.newRequests = res;
        this.newRequestsLength = this.newRequests.length;
        this.sharedSerivce.isLoading.next(false);
      },
      error: (err) => {
        this.dashboardService.errorHandler(err);
      },
    });
    this.acceptForm = new FormGroup({
      address: new FormControl(null, Validators.required),
      workerID: new FormControl(null, Validators.required),
      pool: new FormControl(null, Validators.required),
    });
    this.dashboardService.getApprovedRequests().subscribe({
      next: (res) => {
        this.approvedRequests = res;
        this.approvedRequestsLength = this.approvedRequests.length;

        this.sharedSerivce.isLoading.next(false);
      },
      error: (err) => {
        this.dashboardService.errorHandler(err);
      },
    });
  }
  //it gets the selected request and opens the form
  selectReqNew(request: RequestNew) {
    this.sharedSerivce.isLoading.next(true);
    this.selectedRequest = request;
    console.log(this.selectedRequest);
    this.dashboardService.getAddress(request.asicID).subscribe({
      next: (res) => {
        console.log(this.selectedRequest);
        this.acceptForm.setValue({
          address: res.address,
          workerID: '',
          pool: '',
        });
        this.acceptFormOpend = true;
        this.sharedSerivce.isLoading.next(false);
      },
    });
  }
  // the final request on the form
  onAcceptReq() {
    if (this.acceptForm.valid) {
      const address: string = this.acceptForm.value.address;
      const workerID: string = this.acceptForm.value.workerID;
      const pool: string = this.acceptForm.value.pool;
      this.dashboardService
        .acceptRequest(this.selectedRequest._id, address, workerID, pool)
        .subscribe({
          next: () => {
            console.log('this.selectedRequest', this.selectedRequest);
            console.log(this.newRequests);
            // delete the request from the view
            const updatedInedx = this.newRequests.findIndex((e) => {
              return e._id == this.selectedRequest._id;
            });
            if (updatedInedx > -1) {
              this.newRequests.splice(updatedInedx, 1);
              this.newRequestsLength = this.newRequests.length;
            }
            this.newRequests = [...this.newRequests];
            // update the view of the approved requests
            const newApproved: RequestApproved = {
              ...this.selectedRequest,
              address: address,
              workerID: workerID,
              pool: pool,
            };
            this.approvedRequests.push(newApproved);
            this.approvedRequests = [...this.approvedRequests];
            this.approvedRequestsLength = this.approvedRequests.length;
            this.acceptFormOpend = false;
            this.sharedSerivce.sentMessage.next({
              message: 'Contract has been approved',
              error: false,
            });
          },
          error: (err) => {
            this.dashboardService.errorHandler(err);
          },
        });
    }
  }
  copyText() {
    this.clipboard.copy(this.acceptForm.get('address')?.value);
  }
  selectReqApproved(request: RequestApproved) {
    this.selectedApprovedRequest = request;
    console.log(this.selectReqApproved, request);
    this.endConfirmOpend = true;
  }
  onEndContract() {
    this.dashboardService
      .endContract(this.selectedApprovedRequest._id)
      .subscribe({
        next: (res: any) => {
          // delete the request from the view
          const updatedInedx = this.approvedRequests.findIndex((e) => {
            return e._id == this.selectedApprovedRequest._id;
          });
          if (updatedInedx > -1) {
            this.approvedRequests.splice(updatedInedx, 1);
            this.approvedRequestsLength = this.approvedRequests.length;
          }
          this.approvedRequests = [...this.approvedRequests];
          this.endConfirmOpend = false;
          this.sharedSerivce.sentMessage.next({
            message: 'Contract has been ended',
            error: false,
          });
        },
        error: (err) => {
          this.dashboardService.errorHandler(err);
        },
      });
  }
}
