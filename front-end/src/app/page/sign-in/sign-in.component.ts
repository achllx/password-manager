import { Router } from '@angular/router';
import { PasswordVisibleService } from 'src/app/service/password-visible/password-visible.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(
    private router: Router,
    private passVisible: PasswordVisibleService,
    private service: ApiService
  ) {}

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public passwordVisible: boolean = false;

  togglePasswordVisibility(e: Event) {
    e.stopPropagation()
    this.passwordVisible = !this.passwordVisible;
    this.passVisible.changeIcon()
  }

  forgotPass() {
    this.router.navigate(['sign-in/forgot-password']);
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }

  faceRecog() {
    this.router.navigate(['sign-in/face-recognition']);
  }

  submitForm() {
    if (this.userForm.valid) {
      this.service.loginUser(
        this.userForm.get('username')?.value!,
        this.userForm.get('password')?.value!
      ).subscribe((res) => {
        this.router.navigate([`dashboard/${res.user_id}`]);
      })
    }
  }
}
