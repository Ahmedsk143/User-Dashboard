import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  message: string;
  error: boolean;

  constructor(private shared: SharedService) {}

  ngOnInit(): void {
    this.shared.sentMessage.subscribe((res) => {
      this.message = res.message;
      this.error = res.error;
      setTimeout(() => {
        this.shared.sentMessage.next({ message: '', error: false });
      }, 5000);
    });
  }
  closeNotif() {
    this.shared.sentMessage.next({ message: '', error: false });
  }
}
