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
import { MiningDetailsComponent } from './overview/mining-details/mining-details.component';
import { ChoosePlanComponent } from './plans/choose-plan/choose-plan.component';
import { ChooseMinerComponent } from './mining-devices/choose-miner/choose-miner.component';
import { DiagloComponent } from './diaglo/diaglo.component';
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

@NgModule({
  declarations: [
    OverviewComponent,
    SidenavComponent,
    PlansComponent,
    UserDashboardComponent,
    MiningDevicesComponent,
    DashHeaderComponent,
    MiningDetailsComponent,
    ChoosePlanComponent,
    ChooseMinerComponent,
    DiagloComponent,
    WithdrawComponent,
    DepositeComponent,
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
  ],
})
export class UserDashboardModule {}
