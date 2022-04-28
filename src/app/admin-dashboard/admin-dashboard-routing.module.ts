import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '../Auth/admin-auth.guard';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { FarmComponent } from './farm/farm.component';
import { MinersComponent } from './miners/miners.component';
import { OverviewComponent } from './overview/overview.component';
import { PlansComponent } from './plans/plans.component';
import { RequestComponent } from './request/request.component';
import { SubUserComponent } from './sub-user/sub-user.component';
import { SubUsersComponent } from './sub-users/sub-users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'hashrate-plans', component: PlansComponent },
      { path: 'subscribed-users', component: SubUsersComponent },
      { path: 'profile/:userID', component: SubUserComponent },
      { path: 'miners', component: MinersComponent },
      { path: 'request', component: RequestComponent },
      { path: 'farm', component: FarmComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
