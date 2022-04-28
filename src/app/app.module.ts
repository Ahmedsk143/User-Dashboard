import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { SigninComponent } from './Auth/signin/signin.component';
import { HeaderComponent } from './shared/header/header.component';
import { ConfirmationComponent } from './Auth/confirmation/confirmation.component';
import { SliderComponent } from './Auth/slider/slider.component';
import { OverviewComponent } from './user-dashboard/overview/overview.component';
import { SidenavComponent } from './user-dashboard/sidenav/sidenav.component';
import { PlansComponent } from './user-dashboard/plans/plans.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MiningDevicesComponent } from './user-dashboard/mining-devices/mining-devices.component';
import { SignupOrsigninComponent } from './Auth/signup-orsignin/signup-orsignin.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { DashHeaderComponent } from './user-dashboard/dash-header/dash-header.component';
import { MiningDetailsComponent } from './user-dashboard/overview/mining-details/mining-details.component';
import { TabsComponent } from './shared/tabs/tabs.component';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ChartModule } from 'primeng/chart';
import { ChoosePlanComponent } from './user-dashboard/plans/choose-plan/choose-plan.component';
import { ChooseMinerComponent } from './user-dashboard/mining-devices/choose-miner/choose-miner.component';
import { DiagloComponent } from './user-dashboard/diaglo/diaglo.component';
import { SharedModule } from './shared/shared.module';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { UserComponent } from './Auth/user/user.component';
import { AdminComponent } from './Auth/admin/admin.component';
import { RecoveryMessageComponent } from './Auth/reset-password/recovery-message/recovery-message.component';
import { NewPasswordComponent } from './Auth/reset-password/new-password/new-password.component';
import { OtpComponent } from './Auth/otp/otp.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ResetCodeComponent } from './Auth/reset-password/reset-code/reset-code.component';
//import { AdminAuthInterceptor } from './Auth/admin-auth-interceptor';
import { ErrorHandlerInterceptor } from './Auth/admin-error-interceptor';
// import { MerchantComponent } from './merchant/merchant.component';
import { AccordionModule } from 'primeng/accordion';

///////////////////////////////

/////////////////////////////////////
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ConfirmationComponent,
    SliderComponent,
    SignupOrsigninComponent,
    ResetPasswordComponent,
    UserComponent,
    AdminComponent,
    RecoveryMessageComponent,
    NewPasswordComponent,
    OtpComponent,
    ResetCodeComponent,
  ],
  imports: [
    BrowserModule,
    QRCodeModule,
    QRCodeModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    HttpClientModule,
    MatTableModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    ChartModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
