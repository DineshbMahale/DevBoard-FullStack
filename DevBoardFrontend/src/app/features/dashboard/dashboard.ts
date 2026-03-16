import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl:'./dashboard.html',
  styleUrl: './dashboard.css',
})
export class UserDashboard {
  constructor(private router:Router){}

  private auth = inject(AuthService);
  currentUserRole = this.auth.getUserRole();

  showProfile(){
    this.router.navigate(['/profile'])
  }

  GetProjects(){
    console.log("I am Clickable !!");
  }

  showUsersList(){
    this.router.navigate(['/userList'])
  }
}
