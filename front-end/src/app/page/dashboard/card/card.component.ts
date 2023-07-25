import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { PasswordVisibleService } from 'src/app/service/password-visible/password-visible.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  constructor(
    private passVisible: PasswordVisibleService,
    private service: ApiService,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) {}

  private appId: string = '';
  public passwordVisible: boolean = false;
  isEdit: boolean = false;
  appName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  webAddress: string = '';
  updateTime: any = '';

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {
      this.appId = params['appId'];
      this.service.getAppById(this.appId).subscribe((res) => {
        this.appName = res.app_name;
        this.email = res.app_email;
        this.username = res.app_username;
        this.password = res.app_password;
        this.webAddress = res.app_link;
        this.updateTime = res.updatedAt;
      })
    })
  }

  updateYourPass() {
    const today = new Date();
    return today.getDate();
  }

  togglePasswordVisibility(e: Event) {
    e.stopPropagation();
    this.passwordVisible = !this.passwordVisible;
    this.passVisible.changeIcon();
  }

  editBtn() {
    this.isEdit = true;
  }

  cancelBtn() {
    this.isEdit = false;
  }
}
