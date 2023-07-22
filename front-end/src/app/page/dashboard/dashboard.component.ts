import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  ) {}

  private id: string = '';
  username: string = '';
  imgUrl: string = '';
  apps: any[] = [];
  
  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {
      this.id = params['id'];
      this.service.getStatus(this.id).subscribe((res) => {
        if(!res || !res.islogin) {
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
  }

  
}
