import { Component, OnInit } from '@angular/core';

import { ApplicationUser } from '../../models/ApplicationUser';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  allUsers: ApplicationUser[];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe({
      next: users => {
        this.allUsers = users;
      },
      error: err => console.error(err)
    });
  }

}
