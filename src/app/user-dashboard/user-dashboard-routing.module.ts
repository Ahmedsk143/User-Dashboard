import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';
import { ChooseMinerComponent } from './choose-miner/choose-miner.component';
import { MiningDevicesComponent } from './mining-devices/mining-devices.component';
import { OverviewComponent } from './overview/overview.component';
import { ChoosePlanComponent } from './choose-plan/choose-plan.component';
import { PlansComponent } from './plans/plans.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DepositeComponent } from './deposite/deposite.component';
import { MerchantDistComponent } from './merchant-dist/merchant-dist.component';
import { MerchantMinerComponent } from './merchant-miner/merchant-miner.component';
import { ChoosePlanSellerComponent } from './choose-plan-seller/choose-plan-seller.component';
import { ChooseProviderComponent } from './choose-provider/choose-provider.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'hashrate-plans', component: PlansComponent },
      {
        path: 'choose-provider',
        component: ChooseProviderComponent,
      },
      {
        path: 'choose-plan',
        component: ChoosePlanComponent,
      },
      {
        path: 'choose-plan-sellers',
        component: ChoosePlanSellerComponent,
      },
      { path: 'mining-devices', component: MiningDevicesComponent },
      {
        path: 'choose-miner',
        component: ChooseMinerComponent,
      },

      {
        path: 'merchant-distribution',
        component: MerchantDistComponent,
      },
      {
        path: 'merchant-distribution/:workerID',
        component: MerchantMinerComponent,
      },
      {
        path: 'withdraw',
        component: WithdrawComponent,
      },
      {
        path: 'deposit',
        component: DepositeComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardRoutingModule {}
