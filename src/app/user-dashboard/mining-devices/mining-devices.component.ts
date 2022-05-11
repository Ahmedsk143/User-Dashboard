import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { AsicContract } from '../models/asic-contract.model';
import { DashboardService } from '../user-dashboard.service';

@Component({
  selector: 'app-mining-devices',
  templateUrl: './mining-devices.component.html',
  styleUrls: ['./mining-devices.component.scss'],
})
export class MiningDevicesComponent implements OnInit {
  miners: AsicContract[];
  minersLength = 0;
  constructor(
    private dashboard: DashboardService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.isLoading.next(true);
    this.dashboard.getAsicContracts().subscribe((res: any) => {
      console.log(res);
      this.miners = res;
      this.minersLength = res.length;
      this.sharedService.isLoading.next(false);
    });
  }
}
