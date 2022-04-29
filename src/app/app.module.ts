import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { SigninComponent } from './Auth/signin/signin.component';
import { CommonModule } from '@angular/common';

import { ChartModule } from 'primeng/chart';
import { SharedModule } from './shared/shared.module';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { UserComponent } from './Auth/user/user.component';
import { RecoveryMessageComponent } from './Auth/reset-password/recovery-message/recovery-message.component';
import { NewPasswordComponent } from './Auth/reset-password/new-password/new-password.component';
import { OtpComponent } from './Auth/otp/otp.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ResetCodeComponent } from './Auth/reset-password/reset-code/reset-code.component';
//import { AuthInterceptor } from './Auth/admin-auth-interceptor';
import { ErrorHandlerInterceptor } from './Auth/error-interceptor';
// import { MerchantComponent } from './merchant/merchant.component';
import { AccordionModule } from 'primeng/accordion';
import { HomeModule } from './home/home.module';
import { AuthInterceptor } from './Auth/auth-interceptor';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ResetPasswordComponent,
    UserComponent,
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
    HttpClientModule,
    ChartModule,
    HomeModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
