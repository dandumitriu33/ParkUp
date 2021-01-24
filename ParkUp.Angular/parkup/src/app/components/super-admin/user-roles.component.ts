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
    console.log('search Clicked: ' + this.searchPhrase);

  }

}
