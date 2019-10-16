import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stef-chefan-ui';
  
  constructor(public authService: AuthService) {
  }

  logout() {
    this.authService.doLogout()
  }
}
