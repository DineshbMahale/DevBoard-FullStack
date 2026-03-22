import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../auth/authentication-service';
import { Router, RouterLink } from '@angular/router';
import { TermsAndConditions } from '../terms-and-conditions/terms-and-conditions';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../shared/alert-service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  signUpForm: any;
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
    private router: Router, private dialog: MatDialog, private alertService: AlertService) { }

  ngOnInit(): void {
    this.OnInitSignUpForm();
  }

  OnInitSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      roles: ['', Validators.required],
      termsAndConditions: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    }
    )
  }

  passwordMatchValidator(form: any) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null
      : { mismatch: true }
  }

  onSubmitSignUpForm() {
    this.authService.signUp(
      this.signUpForm.value.firstName,
      this.signUpForm.value.lastName,
      this.signUpForm.value.email,
      this.signUpForm.value.userName,
      this.signUpForm.value.password,
      this.signUpForm.value.roles
    ).subscribe({
      next: (res: any) => {
        // ✅ Store token
        this.authService.saveToken(res.token);
        // ✅ Optional: decode or store user info
        console.log('JWT Token:', res);

        // ✅ Redirect directly to dashboard
        this.alertService.showSuccess('Registration successful! Redirecting to dashboard...');
        console.log('Registration successful!');
        
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 100);
      },
      error: (error) => {
        if (error.status === 409) {
          this.alertService.showError(error.error.message);
        } else {
          this.alertService.showError('Sign up failed. Please try again later.');
        }
        console.error('Error during sign up', error);
      }
    });
  }

  openDialog() {
    const dialogref = this.dialog.open(TermsAndConditions, {
      width: '400px',
      height: '400px'
    });

    dialogref.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
} 
