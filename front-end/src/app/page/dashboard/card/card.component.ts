import { Component } from '@angular/core';
import { PasswordVisibleService } from 'src/app/service/password-visible/password-visible.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  constructor(
    private passVisible: PasswordVisibleService,
  ) {}

  public passwordVisible: boolean = false;
  isEdit: boolean = false;

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
