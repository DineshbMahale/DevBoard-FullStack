import { Component } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../shared/pipes/capitalize-pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe-pipe';

@Component({
  selector: 'app-user-list',
  standalone:true,
  imports: [CommonModule, CapitalizePipe, FormsModule, SearchPipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  
   searchText = '';

   users: User[] = [
    { id: 1, name: 'john doe', active: true },
    { id: 2, name: 'jane smith', active: false },
    { id: 3, name: 'michael scott', active: true },
    { id: 4, name: 'pam beesly', active: false }
  ];

  showInactive = false;

  toggleInactive() {
    this.showInactive = !this.showInactive;
  }
}
