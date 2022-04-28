import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminDashboardService } from '../admin-dashboard.service';
import { Miner } from '../models/miner.model';

@Component({
  selector: 'app-miners',
  templateUrl: './miners.component.html',
  styleUrls: ['./miners.component.scss'],
})
export class MinersComponent implements OnInit {
  newMinerForm: FormGroup;
  editMinerForm: FormGroup;
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
  selectedMiner: Miner = new Miner();
  /// the selected miner to be edit
  minerToEdit: Miner = new Miner();
  // The Miners shown to user
  miners: Miner[] = [];
  minersLength: number;
  BTCNum: number;
  // error messages
  newFormError = '';
  updateFormError = '';

  constructor(
    private dashboardService: AdminDashboardService,
    private sharedSerivce: SharedService
  ) {}
  ngOnInit(): void {
    this.sharedSerivce.isLoading.next(true);
    this.dashboardService.getMiners().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.miners = res;
          this.minersLength = this.miners.length;
        } else {
          this.miners = [];
          this.minersLength = 0;
        }
        this.sharedSerivce.isLoading.next(false);
      },
      error: (err) => {
        this.miners = [];
        this.minersLength = 0;
        this.sharedSerivce.isLoading.next(false);
        this.dashboardService.errorHandler(err);
      },
    });
    this.newMinerForm = new FormGroup({
      asicName: new FormControl(null, [Validators.required]),
      cryptoName: new FormControl(null, [Validators.required]),
      algorithm: new FormControl(null, [Validators.required]),
      hashPower: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
      hostFees: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
    });
    this.editMinerForm = new FormGroup({
      _id: new FormControl(null, [Validators.required]),
      asicName: new FormControl(null, [Validators.required]),
      cryptoName: new FormControl(null, [Validators.required]),
      algorithm: new FormControl(null, [Validators.required]),
      hashPower: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
      hostFees: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
      availability: new FormControl(null, [Validators.required]),
    });
  }
  //Check the plan name to open the menu corrsponding to that plan
  checkSelected(miner: Miner) {
    // assign the plan name to the selected plan and editplan
    if (this.selectedMiner._id != miner._id) {
      this.selectedMiner = miner;
      this.minerToEdit = miner;
      this.editMinerForm.setValue({
        _id: this.selectedMiner._id,
        asicName: this.selectedMiner.asicName,
        cryptoName: this.selectedMiner.cryptoName,
        algorithm: this.selectedMiner.algorithm,
        hashPower: this.selectedMiner.hashPower,
        price: this.selectedMiner.price,
        hostFees: this.selectedMiner.hostFees,
        availability: this.selectedMiner.availability,
      });
    }
    //to toggle the menue when clicked again
    else {
      this.selectedMiner = new Miner();
    }
  }
  //to check what miners to show on the page by the dropdown menu
  checkDisplayedminers(miner: Miner) {
    if (miner.cryptoName.includes('BTC') && this.selected == 'tap1') {
      return true;
    } else if (miner.cryptoName.includes('ETH') && this.selected == 'tap2') {
      return true;
    } else if (miner.cryptoName.includes('RVN') && this.selected == 'tap3') {
      return true;
    } else if (miner.cryptoName.includes('LTCT') && this.selected == 'tap4') {
      return true;
    } else if (this.selected == 'all') {
      return true;
    }
  }
  onNew() {
    if (this.newMinerForm.valid) {
      const miner = this.newMinerForm.value;
      this.dashboardService.addNewMiner(miner).subscribe({
        next: () => {
          //the problem with the commented code is that the _id of the new plan is empty..
          // and i select the plans based on the _id.. the solution is to select based on a created id by me          // const message = `'${this.newMinerForm.value.asicName}' has been added `;
          // this.newMinerForm.reset();
          // this.newFormOpend = false;
          // this.sharedSerivce.sentMessage.next(message);
          // this.selectedMiner = new Miner();
          // const fullMiner = {
          //   ...miner,
          //   _id: '',
          //   availability: true,
          //   createdAt: Date.now(),
          // };
          // this.miners.push(fullMiner);
          window.location.reload();
        },
        error: (err) => {
          this.dashboardService.errorHandler(err);
          this.newFormError = 'Some error occured, try again!';
        },
      });
    } else return;
  }
  onUpdate() {
    if (this.editMinerForm.valid) {
      const miner = this.editMinerForm.value;
      this.dashboardService.updateMiner(miner).subscribe({
        next: () => {
          const message = `'${this.editMinerForm.value.asicName}' has been edited `;
          //to update the view of the component without refersh
          const updatedInedx = this.miners.findIndex((e) => {
            return e._id == miner._id;
          });
          this.miners[updatedInedx] = miner;
          // console.log(this.miners[updatedInedx]);
          this.editMinerForm.reset();
          this.editFormOpend = false;
          //tp send message to the notification component
          this.sharedSerivce.sentMessage.next({
            message: message,
            error: false,
          });
        },
        error: (err) => {
          console.log(err);
          this.dashboardService.errorHandler(err);
        },
      });
    } else return;
  }
  onDelete() {
    this.dashboardService.deleteMiner(this.minerToEdit).subscribe({
      next: () => {
        const message = `'${this.minerToEdit.asicName}' has been deleted `;
        //to update the view of the component without refersh
        const updatedInedx = this.miners.findIndex((e) => {
          return e._id == this.minerToEdit._id;
        });
        if (updatedInedx > -1) {
          this.miners.splice(updatedInedx, 1);
          this.minersLength = this.miners.length;
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
        const message = `'${this.minerToEdit.asicName}' can't be deleted! `;
        this.sharedSerivce.sentMessage.next({ message: message, error: true });
        this.deleteConfirmOpend = false;
      },
    });
  }
  updateAval(miner: Miner) {
    console.log(miner);
    this.editMinerForm.setValue({
      _id: miner._id,
      asicName: miner.asicName,
      cryptoName: miner.cryptoName,
      algorithm: miner.algorithm,
      hashPower: miner.hashPower,
      price: miner.price,
      hostFees: miner.hostFees,
      availability: !miner.availability,
    });
    this.dashboardService.updateMiner(this.editMinerForm.value).subscribe({
      next: () => {
        const message = `'${this.editMinerForm.value.asicName}' availability has been changed  `;
        //to update the view of the component without refersh
        const updatedInedx = this.miners.findIndex((e) => {
          return e._id == miner._id;
        });
        this.miners[updatedInedx] = miner;
        // console.log(this.miners[updatedInedx]);
        this.editMinerForm.reset();
        //tp send message to the notification component
        this.sharedSerivce.sentMessage.next({
          message: message,
          error: false,
        });
      },
      error: (err) => {
        console.log(err);
        this.dashboardService.errorHandler(err);
      },
    });
  }
}
