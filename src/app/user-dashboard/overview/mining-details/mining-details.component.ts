import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mining-details',
  templateUrl: './mining-details.component.html',
  styleUrls: ['./mining-details.component.scss'],
})
export class MiningDetailsComponent implements OnInit {
  choosedTab: string = 'BTC';
  constructor() {}

  ngOnInit(): void {}

  changeTab(choosed: string) {
    this.choosedTab = choosed;
  }
}
