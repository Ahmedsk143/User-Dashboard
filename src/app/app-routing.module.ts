import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './Auth/otp/otp.component';
import { RecoveryMessageComponent } from './Auth/reset-password/recovery-message/recovery-message.component';
import { ResetCodeComponent } from './Auth/reset-password/reset-code/reset-code.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { NewPasswordComponent } from './Auth/reset-password/new-password/new-password.component';
import { SigninComponent } from './Auth/signin/signin.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { UserComponent } from './Auth/user/user.component';
// import { MerchantComponent } from './merchant/merchant.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
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
    path: 'dashboard',
    loadChildren: () =>
      import('./user-dashboard/user-dashboard.module').then(
        (m) => m.UserDashboardModule
      ),
  },
  { path: '**', redirectTo: 'user/signin' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
