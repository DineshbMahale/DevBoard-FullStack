import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../../../models/login.model';
import { AuthService } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { sign } from 'crypto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl:'./login.html',
  styleUrl: './login.css'
})

export class LoginComponent {
  loginData: LoginModel = {
    username: '',
    password: ''
  };

  showPassword = false;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router){}

  togglePassword(){

    this.showPassword = !this.showPassword;

  }

  loginUser(){

    if(!this.loginData.username || !this.loginData.password){
      this.errorMessage = "All fields are required";
      return;
    }

    this.auth.login(this.loginData).subscribe({

      next: (res:any) => {

        this.auth.saveToken(res.token, res.role);
        this.router.navigate(['/dashboard']);

      },

      error: () => {

        this.errorMessage = "Invalid username or password";

      }

    });

  }

}

