import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetCodeComponent } from './Auth/reset-password/reset-code/reset-code.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { NewPasswordComponent } from './Auth/reset-password/new-password/new-password.component';
import { SigninComponent } from './Auth/signin/signin.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { UserComponent } from './Auth/user/user.component';
import { AuthGuard } from './Auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'passwordReset', component: ResetPasswordComponent },
      { path: 'verification', component: ResetCodeComponent },
      {
        path: 'new-password',
        component: NewPasswordComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
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
