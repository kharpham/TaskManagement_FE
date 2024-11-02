// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string | null = null;


  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.credentials).subscribe(response => {
      this.router.navigate(['/tasks']).then(success => {
        if (success) {
          console.log('Navigation to /tasks successful');
        } else {
          console.error('Navigation to /tasks failed');
        }
      });
    }, error => {
      console.error('Login failed', error);
      this.errorMessage = 'Invalid email or password';
    });
  }
}