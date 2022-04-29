import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { ChartModule } from 'primeng/chart';
import { NotificationComponent } from './notification/notification.component';
import { QrComponent } from './qr/qr.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [SpinnerComponent, NotificationComponent, QrComponent],
  exports: [QRCodeModule, SpinnerComponent, ChartModule, NotificationComponent],
  imports: [CommonModule],
})
export class SharedModule {}
