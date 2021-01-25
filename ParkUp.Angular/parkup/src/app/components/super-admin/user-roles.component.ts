import { Component, OnInit } from '@angular/core';
import { ApplicationRole } from '../../models/ApplicationRole';

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
  roles: ApplicationRole[];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.searchErrorMessage = "";
    this.searchPhrase = "";
    this.foundUsers = [];
    this.populateRoles();

  }

  onAddRoleClick(userId: string, roleId: string) {
    console.log(`adding role: ${roleId} to user: ${userId}`);
  }

  onRemoveRoleClick(userId: string, roleId: string) {
    console.log(`removing role: ${roleId} to user: ${userId}`);
  }

  populateRoles() {
    this.usersService.getAllRoles().subscribe({
      next: dbRoles => {
        this.roles = dbRoles;
      },
      error: err => console.error(err)
    });
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
