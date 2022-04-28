import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { DashHeaderComponent } from './dash-header/dash-header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { OverviewComponent } from './overview/overview.component';
import { PlansComponent } from './plans/plans.component';
import { SubUsersComponent } from './sub-users/sub-users.component';
import { MinersComponent } from './miners/miners.component';
import { RequestComponent } from './request/request.component';
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
import { SubUserComponent } from './sub-user/sub-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FarmComponent } from './farm/farm.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    DashHeaderComponent,
    SidenavComponent,
    OverviewComponent,
    PlansComponent,
    SubUsersComponent,
    MinersComponent,
    RequestComponent,
    SubUserComponent,
    FarmComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminDashboardRoutingModule,
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
export class AdminDashboardModule {}
