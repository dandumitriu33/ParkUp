import { Component, OnInit } from '@angular/core';

import { ApplicationUser } from '../../models/ApplicationUser';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styles: [
  ]
})
export class UserRolesComponent implements OnInit {
  searchPhrase: string = "";
  searchErrorMessage: string = "temp";
  foundUsers: ApplicationUser[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.searchErrorMessage = "";
    this.searchPhrase = "";
    this.foundUsers = [];


  }

  onSearchClick() {
    this.usersService.searchUsers(this.searchPhrase).subscribe({
      next: dbFoundUsers => {
        if (dbFoundUsers.length == 0) {
          this.searchErrorMessage = `No results for '${this.searchPhrase}'.`;
        } else {
          this.foundUsers = dbFoundUsers;
          this.searchErrorMessage = "";
        }
      },
      error: err => console.error(err)
    });
  }

}
