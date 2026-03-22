import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication-service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatDialogModule], // ✅ required for dialog
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'], // ✅ fixed (plural)
})
export class UserDashboard {

  // 🔥 Inject (modern Angular way)
  private router = inject(Router);
  private auth = inject(AuthenticationService);
  private dialog = inject(MatDialog);

  //loggedIn user  info
  loggedInUser = localStorage.getItem('userName');
  // UI State
  isSidebarCollapsed = false;
  isDarkMode = false;

  // User Role
  currentUserRole = this.auth.getUserRole();

  // ✅ Data for @for
  stats = [
    { title: 'Revenue', value: '$24,500' },
    { title: 'Tasks', value: '18' },
    { title: 'Efficiency', value: '94%' }
  ];

  activities = [
    { id: 1, project: 'Website Redesign', status: 'Completed', date: 'Oct 12' },
    { id: 2, project: 'Mobile API', status: 'In Progress', date: 'Oct 14' }
  ];

  // Sidebar toggle
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  // Theme toggle
 toggleTheme() {
  this.isDarkMode = !this.isDarkMode;
}

  // Navigation
  showProfile() {
    this.router.navigate(['/profile']);
  }

  showUsersList() {
    this.router.navigate(['/userList']);
  }

  GetProjects() {
    console.log('Projects clicked');
  }

  // Logout with confirmation
  logout() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.auth.logOut();
        this.router.navigate(['/signin']);
      }
    });
  }
}