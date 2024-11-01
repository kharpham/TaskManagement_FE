import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  login() {
    this.authService.login(this.credentials).subscribe(response => {
      // Navigate to the tasks page
      this.router.navigate(['/tasks']);
    }, error => {
      console.error('Login failed', error);
    });
  }
}