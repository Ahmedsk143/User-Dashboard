import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';
import { ChooseMinerComponent } from './mining-devices/choose-miner/choose-miner.component';
import { MiningDevicesComponent } from './mining-devices/mining-devices.component';
import { OverviewComponent } from './overview/overview.component';
import { ChoosePlanComponent } from './plans/choose-plan/choose-plan.component';
import { PlansComponent } from './plans/plans.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DepositeComponent } from './deposite/deposite.component';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'hashrate-plans', component: PlansComponent },
      {
        path: 'choose-plan',
        component: ChoosePlanComponent,
      },
      { path: 'mining-devices', component: MiningDevicesComponent },
      {
        path: 'choose-miner',
        component: ChooseMinerComponent,
      },
      {
        path: 'withdraw',
        component: WithdrawComponent,
      },
      {
        path: 'deposit',
        component: DepositeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardRoutingModule {}
