import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DistAsic } from '../models/dist-asic.model';
import { DashboardService } from '../user-dashboard.service';

@Component({
  selector: 'app-merchant-dist',
  templateUrl: './merchant-dist.component.html',
  styleUrls: ['./merchant-dist.component.scss'],
})
export class MerchantDistComponent implements OnInit {
  hasMiner = false;
  distAsics: DistAsic[];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getWorkers().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.hasMiner = true;
          this.distAsics = res;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  createSeller() {
    this.dashboardService.createSeller().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
