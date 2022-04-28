import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  onActivate(event: any) {
    // window.scroll(0,0);
    window.scroll({
      top: 0,
      left: 0,
      // behavior: 'smooth',
    });

    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
  }
}
