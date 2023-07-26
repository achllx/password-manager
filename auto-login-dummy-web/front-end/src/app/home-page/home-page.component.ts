import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

id: string = '';
app: string='';
username: string='';

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private service: ApiService,
  ) {}

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {
      this.id = params['id'];
    
      this.service.checkApp(this.id).subscribe((res)=>{
        this.app = res.app
        this.username = res.username
      })
    });
  }

}
