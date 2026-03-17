import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../auth/authentication-service';
import { Router, RouterLink } from '@angular/router';
import { TermsAndConditions } from '../terms-and-conditions/terms-and-conditions';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [CommonModule,ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  signUpForm: any;
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
     private router:Router, private dialog: MatDialog) { }

    ngOnInit(): void {
      this.OnInitSignUpForm();
    }

    OnInitSignUpForm() {
      this.signUpForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        roles: ['USER', Validators.required]
      })
    }
  
    onSubmitSignUpForm() {
      this.authService.signUp(this.signUpForm.value.firstName,this.signUpForm.value.lastName, this.signUpForm.value.email, this.signUpForm.value.password, this.signUpForm.value.roles).subscribe({
        next:(res:any) =>{
          alert('Registration successful! Please sign in to continue.');
          this.router.navigate(['/signin']);
        },
        error:(error) =>{
          console.error('Error during sign up', error);
          alert('Sign up failed. Please try again later.');
        }
      })
    }

    openDialog() {
      const dialogref = this.dialog.open(TermsAndConditions,{
        width: '400px',
        height: '400px'
      });

      dialogref.afterClosed().subscribe(result =>{
        console.log(`Dialog result: ${result}`);
      });
    }
} 
