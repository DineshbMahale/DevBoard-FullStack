import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  profileForm!: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserData();
    this.profileForm.disable(); // 🔒 initially read-only
  }

  initForm() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      roles: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: [''],
      confirmPassword: ['']
    });
  }

  loadUserData() {

    // const user = {
    //   firstName: currentUser.firstName,
    //   secondName: currentUser.secondName,
    //   roles: currentUser.roles,
    //   email: currentUser.email,
    //   userName: currentUser.userName
    // };
    // 👉 Replace with API later
    const user = {
      firstName: 'Dinesh',
      secondName: 'Mahale',
      roles: 'ADMIN',
      email: 'dinesh@gmail.com',
      userName: 'dinesh123'
    };

    this.profileForm.patchValue(user);
  }

  enableEdit() {
    this.isEditMode = true;
    this.profileForm.enable();
  }

  saveProfile() {
    if (this.profileForm.invalid) return;

    console.log('Updated Data:', this.profileForm.value);

    // 👉 Call API here later

    this.isEditMode = false;
    this.profileForm.disable();
  }

  cancelEdit() {
    this.isEditMode = false;
    this.profileForm.disable();
    this.loadUserData(); // reset
  }
}