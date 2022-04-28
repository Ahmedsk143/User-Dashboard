import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../Auth/admin-auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  onActivate(event: any) {
    window.scroll({
      top: 0,
      left: 0,
      // behavior: 'smooth',
    });
  }
}
