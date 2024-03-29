import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PlansComponent } from './plans/plans.component';
import { UserDashboardComponent } from './user-dashboard.component';
import { MiningDevicesComponent } from './mining-devices/mining-devices.component';
import { DashHeaderComponent } from './dash-header/dash-header.component';
import { ChoosePlanComponent } from './choose-plan/choose-plan.component';
import { ChooseMinerComponent } from './choose-miner/choose-miner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DepositeComponent } from './deposite/deposite.component';
import { MerchantDistComponent } from './merchant-dist/merchant-dist.component';
import { MerchantMinerComponent } from './merchant-miner/merchant-miner.component';
import { ChoosePlanSellerComponent } from './choose-plan-seller/choose-plan-seller.component';
import { ChooseProviderComponent } from './choose-provider/choose-provider.component';
import { AccordionModule } from 'primeng/accordion';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    OverviewComponent,
    SidenavComponent,
    PlansComponent,
    UserDashboardComponent,
    MiningDevicesComponent,
    DashHeaderComponent,
    ChoosePlanComponent,
    ChooseMinerComponent,
    WithdrawComponent,
    DepositeComponent,
    MerchantDistComponent,
    MerchantMinerComponent,
    ChoosePlanSellerComponent,
    ChooseProviderComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ChartModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    AccordionModule,
  ],
})
export class UserDashboardModule {}
