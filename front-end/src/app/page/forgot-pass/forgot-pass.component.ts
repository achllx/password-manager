import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordVisibleService } from 'src/app/service/password-visible/password-visible.service';
import { PassCheckService } from 'src/app/service/pass-check/pass-check.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent {
  constructor(
    private router: Router,
    private service: ApiService,
    private passVisible: PasswordVisibleService,
    private passCheck: PassCheckService
  ) {}

  public passwordVisible: boolean = false;
  passValid: boolean = false;
  password: string = '';

  userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  togglePasswordVisibility(e: Event) {
    e.stopPropagation()
    this.passwordVisible = !this.passwordVisible;
    this.passVisible.changeIcon()
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }

  changePassword() {
    if(this.userForm.valid) {
      const formData = new FormData;
      formData.append('email', this.userForm.get('email')?.value!);
      formData.append('password', this.userForm.get('password')?.value!);

      this.service.changeUserPass(formData).subscribe((res) => {
        this.router.navigate(['sign-in']);
      })
    }
  }

  passwordCheck(event:any) {
    this.passValid = this.passCheck.checkPasswordStrength(event.target.value);
  }
}
