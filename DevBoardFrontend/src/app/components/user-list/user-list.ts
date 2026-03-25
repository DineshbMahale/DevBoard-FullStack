import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../shared/pipes/capitalize-pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe-pipe';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, CapitalizePipe, FormsModule, SearchPipe],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  searchText = '';

  selectedUser: User | null = null;
  isAuthorized: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.setAuthorization();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (err: any) => {
        console.error('Error fetching users', err);
      }
    });
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  onEdit() {
    if (!this.selectedUser) return;

    console.log('Editing user:', this.selectedUser);

    // 👉 You can navigate or open modal here
    // example:
    // this.router.navigate(['/edit-user', this.selectedUser.id]);
  }

  onDelete() {
    if (!this.selectedUser) return;

          const confirmDelete = confirm(`Delete ${this.selectedUser.firstName} ${this.selectedUser.lastName}?`);
          if (!confirmDelete) return;

    this.userService.deleteUser(this.selectedUser.id).subscribe({
      next: () => {
        console.log('User deleted');

        // remove from UI
        this.users = this.users.filter(u => u.id !== this.selectedUser?.id);
        this.selectedUser = null;
      },
      error: (err) => {
        console.error('Delete failed', err);
      }
    });
  }

  setAuthorization() {
    // ⚠️ Replace with JWT decode later (best practice)
    const role = localStorage.getItem('role');
    this.isAuthorized = role === 'Admin';
  }
}