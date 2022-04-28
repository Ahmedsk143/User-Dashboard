import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TabsComponent } from './tabs/tabs.component';
import { TimelineChartComponent } from './timeline-chart/timeline-chart.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartModule } from 'primeng/chart';
import { CustomTapsComponent } from './custom-taps/custom-taps.component';
import { NotificationComponent } from './notification/notification.component';
import { QrComponent } from './qr/qr.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    TabsComponent,
    TimelineChartComponent,
    CustomTapsComponent,
    NotificationComponent,
    QrComponent,
  ],
  exports: [
    QRCodeModule,
    HeaderComponent,
    SpinnerComponent,
    TabsComponent,
    TimelineChartComponent,
    ChartModule,
    CustomTapsComponent,
    NotificationComponent,
  ],
  imports: [CommonModule, MatTabsModule],
})
export class SharedModule {}
