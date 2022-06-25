import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  accordion1 = true;
  accordion2 = false;
  accordion3 = false;
  accordion4 = false;

  constructor(private scroller: ViewportScroller) {}

  ngOnInit(): void {}
  goToHow() {
    this.scroller.scrollToAnchor('faq');
  }
}
