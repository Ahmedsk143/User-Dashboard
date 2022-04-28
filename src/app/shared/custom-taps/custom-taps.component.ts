import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-taps',
  templateUrl: './custom-taps.component.html',
  styleUrls: ['./custom-taps.component.scss'],
})
export class CustomTapsComponent implements OnInit {
  opend = 'tap1';
  constructor() {}

  ngOnInit(): void {}
}
