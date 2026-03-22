import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../shared/alert-service';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin implements OnInit {

  signInForm: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
     private router: Router, private alertService: AlertService) {this.OnInitSignInForm();}

   ngOnInit(): void {
    if(this.authService.isUserLoggedIn){
      this.router.navigate(['/dashboard']);
    }
  }

  OnInitSignInForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  public getEmail(){
    return this.signInForm.get('email');
  }

  public getPassword(){
    return this.signInForm.get('password');
  }

  onSubmitSignInForm() {
    this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password).subscribe({
      next:(res:any) =>{
        this.authService.saveToken(res.token);
        this.router.navigate(['/dashboard']);
        this.alertService.showSuccess('Login successful!');
      },
      error:(error) =>{
        console.error('Error during sign in', error);
        this.alertService.showError('Sign in failed. Please check your credentials and try again.');
      }
    })
  }
}
