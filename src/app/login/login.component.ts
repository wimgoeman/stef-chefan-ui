import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private email: string = ''
  private password: string = ''
  private error? : string = null

  constructor(private authService: AuthService, private router: Router) { }

  // onKeydown(event) {
  //   if (event.key === "Enter") {
  //     this.login()
  //   }
  // }

  googleLogin() {
    this.authService.doGoogleLogin().subscribe((error) => {
      this.error = "Failed to login"
    })
  }

  // No email based login for now
  // login() {
  //   this.authService.doLogin(this.email, this.password).subscribe((error) => {
  //     this.error = "Failed to login"
  //   })
  // }


}
