import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordVisibleService } from 'src/app/service/password-visible/password-visible.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
import { PassCheckService } from 'src/app/service/pass-check/pass-check.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private router: Router,
    private passVisible: PasswordVisibleService,
    private service: ApiService,
    private fb: FormBuilder,
    private passCheck: PassCheckService
  ) {}

  public passwordVisible: boolean = false;
  passValid: boolean = false;
  password: string = '';
  btnValidation: boolean = false;

  // @ts-ignore
  userForm: FormGroup;

  // @ts-ignore
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      file: [null, Validators.required],
      email: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  // proses untuk membuat user baru
  submitForm() {
    if (this.userForm.valid) {
      const formData = new FormData();

      const file = this.fileInput.nativeElement.files;

      formData.append('username', this.userForm.get('username')?.value);
      formData.append('password', this.userForm.get('password')?.value);
      formData.append('email', this.userForm.get('email')?.value);

      for (let i = 0; i < file.length; i++) {
        formData.append('file', file[i]);
      }
      
      this.service.regisUser(formData).subscribe((res) => {
        if (res.status !== 200) {
          console.log(res);          
        }
      });

      this.router.navigate(['sign-in']);
    } else {
      this.btnValidation = true;
      setTimeout(() => {
        this.btnValidation = false;
      }, 2000);
    }
  }

  // password visibility
  togglePasswordVisibility(e: Event) {
    e.stopPropagation();
    this.passwordVisible = !this.passwordVisible;
    this.passVisible.changeIcon();
  }

  // navigate ke page sign-in
  signIn() {
    this.router.navigate(['sign-in']);
  }

  // mengecek password strength
  passwordCheck(event:any) {
    this.passValid = this.passCheck.checkPasswordStrength(event.target.value);
  }
}
