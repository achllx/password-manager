import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent {
  constructor(
    private router: Router,
  ) {}

  signUp() {
    this.router.navigate(['sign-up']);
  }
}
