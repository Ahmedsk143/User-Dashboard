import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { Asic } from '../models/asic.model';
import { DashboardService } from '../user-dashboard.service';

@Component({
  selector: 'app-choose-miner',
  templateUrl: './choose-miner.component.html',
  styleUrls: ['./choose-miner.component.scss'],
})
export class ChooseMinerComponent implements OnInit {
  miners: Asic[];
  buyForm: FormGroup;
  buyFormOpend = false;
  selectedMiner: Asic;
  constructor(
    private dashboard: DashboardService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.buyForm = new FormGroup({
      currency: new FormControl(null, Validators.required),
    });
    this.sharedService.isLoading.next(true);
    this.dashboard.getAsicsToBuy().subscribe((res: any) => {
      this.miners = res;
      console.log(res);
      this.sharedService.isLoading.next(false);
    });
  }
  addAsicContract(miner: Asic) {
    this.selectedMiner = miner;
    this.buyFormOpend = true;
  }
  onSubmit() {
    this.dashboard
      .addAsicContract(this.selectedMiner._id, this.buyForm.value.currency)
      .subscribe({
        next: (res) => {
          this.buyFormOpend = false;
          this.sharedService.sentMessage.next({
            message: 'Asic is successfuly bought',
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
}
