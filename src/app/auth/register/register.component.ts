import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { username: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  register() {
    this.authService.register(this.user).subscribe(response => {
      // Navigate to the tasks page
      this.router.navigate(['/tasks']);
    }, error => {
      console.error('Registration failed', error);
    });
  }
}