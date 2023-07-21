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
    private fb: FormBuilder
  ) {}

  public passwordVisible: boolean = false;

  errormsg: any;
  successmsg: any;

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
          this.successmsg = '';
          // return (this.errormsg = res.message);
          console.log(res);          
        }
        // this.successmsg = res.msg;
        // this.errormsg = '';
      });

      this.router.navigate(['sign-in']);
    } else {
      console.log();
      
      // this.errormsg = 'All Field is Required !';
      // this.successmsg = '';
    }
  }

  togglePasswordVisibility(e: Event) {
    e.stopPropagation();
    this.passwordVisible = !this.passwordVisible;
    this.passVisible.changeIcon();
  }

  signIn() {
    this.router.navigate(['sign-in']);
  }
}
