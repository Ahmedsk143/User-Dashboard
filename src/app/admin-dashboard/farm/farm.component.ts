import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminDashboardService } from '../admin-dashboard.service';
import { Worker } from '../models/worker.model';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss'],
})
export class FarmComponent implements OnInit {
  selectedTap = 'tap1';
  activeWorkers: Worker[];
  inactiveWorkers: Worker[];
  activeWorkersLength: number;
  inactiveWorkersLength: number;
  newWorkerOpend = false;
  newWorkerForm: FormGroup;
  newFormError: string;
  selectedWorker: Worker = new Worker();
  workerToEdit: Worker = new Worker();
  deleteConfirmOpend = false;
  endConfirmOpend = false;

  constructor(
    private dashboardService: AdminDashboardService,
    private sharedSerivce: SharedService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getActiveWorkers().subscribe({
      next: (res) => {
        this.activeWorkers = res;
        this.activeWorkersLength = res.length;
      },
      error: (err) => {
        this.dashboardService.errorHandler(err);
      },
    });
    this.dashboardService.getInactiveWorkers().subscribe({
      next: (res) => {
        this.inactiveWorkers = res;
        this.inactiveWorkersLength = res.length;
      },
      error: (err) => {
        this.dashboardService.errorHandler(err);
      },
    });
    this.newWorkerForm = new FormGroup({
      workerName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      workerID: new FormControl(null, Validators.required),
      pool: new FormControl(null, Validators.required),
    });
  }
  checkSelected(worker: Worker) {
    if (this.selectedWorker._id != worker._id) {
      this.selectedWorker = worker;
      this.workerToEdit = worker;
    }
    //to toggle the menue when clicked again
    else {
      this.selectedWorker = new Worker();
    }
    console.log(this.selectedWorker);
  }
  onNew() {
    if (this.newWorkerForm.valid) {
      const worker = this.newWorkerForm.value;
      this.dashboardService.addNewWorker(worker).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          this.newFormError = 'Some error occured, try again!';
          this.dashboardService.errorHandler(err);
        },
      });
    } else return;
  }
  onDelete() {
    console.log(this.selectedWorker);
    this.dashboardService.deleteWorker(this.workerToEdit._id!).subscribe({
      next: () => {
        const message = `'${this.workerToEdit.workerName}' has been deleted `;
        //to update the view of the component without refersh
        const updatedInedx1 = this.activeWorkers.findIndex((e) => {
          return e._id == this.workerToEdit._id;
        });
        if (updatedInedx1 > -1) {
          this.activeWorkers.splice(updatedInedx1, 1);
          this.activeWorkersLength = this.activeWorkers.length;
        }
        const updatedInedx2 = this.inactiveWorkers.findIndex((e) => {
          return e._id == this.workerToEdit._id;
        });
        if (updatedInedx2 > -1) {
          this.inactiveWorkers.splice(updatedInedx2, 1);
          this.inactiveWorkersLength = this.inactiveWorkers.length;
        }
        this.deleteConfirmOpend = false;
        //to send message to the notification component
        this.sharedSerivce.sentMessage.next({
          message: message,
          error: false,
        });
      },
      error: (err) => {
        const message = `'${this.workerToEdit.workerName}' can't be deleted! `;
        this.sharedSerivce.sentMessage.next({
          message: message,
          error: true,
        });
        this.deleteConfirmOpend = false;
        this.dashboardService.errorHandler(err);
      },
    });
  }
  onEndWorker() {
    console.log(this.selectedWorker);
    this.dashboardService.endWorker(this.workerToEdit._id!).subscribe({
      next: () => {
        // delete the request from the view
        const updatedInedx = this.activeWorkers.findIndex((e) => {
          return e._id == this.workerToEdit._id;
        });
        if (updatedInedx > -1) {
          this.activeWorkers.splice(updatedInedx, 1);
          this.activeWorkersLength = this.activeWorkers.length;
        }
        this.activeWorkers = [...this.activeWorkers];
        const offlineWorker = { ...this.workerToEdit, workerStatus: false };
        this.inactiveWorkers.push(offlineWorker);
        this.inactiveWorkers = [...this.inactiveWorkers];
        this.inactiveWorkersLength = this.inactiveWorkers.length;
        this.endConfirmOpend = false;
        this.sharedSerivce.sentMessage.next({
          message: 'Contract has been ended',
          error: false,
        });
      },
      error: (err) => {
        const message = `'${this.workerToEdit.workerName}' can't be deleted! `;
        this.sharedSerivce.sentMessage.next({
          message: message,
          error: true,
        });
        this.deleteConfirmOpend = false;
        this.dashboardService.errorHandler(err);
      },
    });
  }
  checkRig(worker: Worker) {
    if (
      worker.workerName.includes('Rig') ||
      worker.workerName.includes('rig')
    ) {
      return 'rig';
    } else {
      return 'asic';
    }
  }
}
