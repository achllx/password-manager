import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordVisibleService } from 'src/app/service/password-visible/password-visible.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private activeRouter: ActivatedRoute,
    private service: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private passVisible: PasswordVisibleService,
  ) {}

  private id: string = '';
  public passwordVisible: boolean = false;
  username: string = '';
  imgUrl: string = '';
  apps: any[] = [];
  isTambah: boolean = false;

  // @ts-ignore
  appForm: FormGroup;
  
  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {
      this.id = params['id'];
      this.service.getStatus(this.id).subscribe((res) => {
        if(res) {
          if(res.islogin === 'false') {
            alert('please login properly');
            this.router.navigate(['sign-in']);
            return;
          } 
        } else {
          alert('please login properly');
          this.router.navigate(['sign-in']);
          return;
        }
      });

      this.service.getUserById(this.id).subscribe((res) => {
        this.username = res.user_name;
        this.imgUrl = res.user_picture;
      })

      this.service.getAppByUserId(this.id).subscribe((res) => {
        for (let i = 0; i < res.length; i++) {
          this.apps.push(res[i]);
        }
      })
    })

    this.appForm = this.fb.group({
      appName: [null, Validators.required],
      appType: [null, Validators.required],
      appLink: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.required],
    })
  }

  submitForm() {
    if (this.appForm.valid) {
      const formData = new FormData();

      formData.append('user_id', this.id);
      formData.append('app_name', this.appForm.get('appName')?.value!);
      formData.append('app_type', this.appForm.get('appType')?.value!);
      formData.append('app_link', this.appForm.get('appLink')?.value!);
      formData.append('app_username', this.appForm.get('username')?.value!);
      formData.append('app_password', this.appForm.get('password')?.value!);
      formData.append('app_email', this.appForm.get('email')?.value!);

      this.service.createApp(formData).subscribe((res) => {
        window.location.reload();
      });
    }
  }

  logout() {
    this.service.userLogout(this.id).subscribe((res) => {
      this.router.navigate(['sign-in'])
    })
  }

  cardPage(appId: string) {
    this.router.navigate([`dashboard/${this.id}/app/${appId}`])
  }

  togglePasswordVisibility(e: Event) {
    e.stopPropagation();
    this.passwordVisible = !this.passwordVisible;
    this.passVisible.changeIcon();
  }
}
