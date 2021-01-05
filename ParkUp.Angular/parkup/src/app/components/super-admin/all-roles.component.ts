import { Component, OnInit } from '@angular/core';

import { ApplicationRole } from '../../models/ApplicationRole';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-all-roles',
  templateUrl: './all-roles.component.html',
  styleUrls: ['./all-roles.component.css']
})
export class AllRolesComponent implements OnInit {
  allRoles: ApplicationRole[];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllRoles().subscribe({
      next: roles => {
        this.allRoles = roles;
      },
      error: err => console.error(err)
    });
  }

}
