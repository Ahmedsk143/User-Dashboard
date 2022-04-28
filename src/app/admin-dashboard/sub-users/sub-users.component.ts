import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminDashboardService } from '../admin-dashboard.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-sub-users',
  templateUrl: './sub-users.component.html',
  styleUrls: ['./sub-users.component.scss'],
})
export class SubUsersComponent implements OnInit {
  usersData: User[] = [];
  usersLength: number;
  constructor(
    private dashboardService: AdminDashboardService,
    private sharedSerivce: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedSerivce.isLoading.next(true);
    this.dashboardService.getSubscribedUsers().subscribe({
      next: (res) => {
        this.usersData = res;
        this.usersLength = res.length;
        this.sharedSerivce.isLoading.next(false);
      },
      error: (err) => {
        this.dashboardService.errorHandler(err);
      },
    });
  }
}
