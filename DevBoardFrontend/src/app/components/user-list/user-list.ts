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
  showInactive = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
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

  toggleInactive() {
    this.showInactive = !this.showInactive;
  }
}