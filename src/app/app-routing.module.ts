import { NgModule } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './Auth/otp/otp.component';
import { RecoveryMessageComponent } from './Auth/reset-password/recovery-message/recovery-message.component';
import { ResetCodeComponent } from './Auth/reset-password/reset-code/reset-code.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { NewPasswordComponent } from './Auth/reset-password/new-password/new-password.component';
import { SigninComponent } from './Auth/signin/signin.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { UserComponent } from './Auth/user/user.component';
import { ChoosePlanComponent } from './user-dashboard/plans/choose-plan/choose-plan.component';
import { WithdrawComponent } from './user-dashboard/withdraw/withdraw.component';
import { AdminComponent } from './Auth/admin/admin.component';
// import { MerchantComponent } from './merchant/merchant.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'user/dashboard',
    loadChildren: () =>
      import('./user-dashboard/user-dashboard.module').then(
        (m) => m.UserDashboardModule
      ),
  },
  {
    path: 'admin/dashboard',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
  },
  // { path: 'signupOrsignin', component: SignupOrsigninComponent },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'reset-your-password', component: ResetPasswordComponent },
      { path: 'recovery-message', component: RecoveryMessageComponent },
      { path: 'verify-code', component: ResetCodeComponent },
      {
        path: 'new-password',
        component: NewPasswordComponent,
      },
      { path: 'otp', component: OtpComponent },
    ],
  },
  {
    path: 'admin',
    component: UserComponent,
    children: [{ path: 'signin', component: AdminComponent }],
  },
  // {
  //   path: 'test',
  //    component: MerchantComponent,
  // },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
