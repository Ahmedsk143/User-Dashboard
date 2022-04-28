import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery-message',
  templateUrl: './recovery-message.component.html',
  styleUrls: ['./recovery-message.component.scss'],
})
export class RecoveryMessageComponent implements OnInit {
  _email: string | null = sessionStorage.getItem('email');
  constructor(private router: Router) {}

  ngOnInit(): void {}
  newpassword() {
    this.router.navigate(['user/verify-code']);
  }
}
