import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ApplicationRole } from '../../models/ApplicationRole';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-all-roles',
  templateUrl: './all-roles.component.html',
  styleUrls: ['./all-roles.component.css']
})
export class AllRolesComponent implements OnInit {
  allRoles: ApplicationRole[];
  addRoleFormModel = {
    Name: ''
  };

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllRoles().subscribe({
      next: roles => {
        this.allRoles = roles;
      },
      error: err => console.error(err)
    });
  }

  onSubmit(form: NgForm) {
    const newRole: ApplicationRole = {
      Id: "",
      Name: form.value.Name
    };
    this.usersService.addRole(newRole).subscribe(
      (res: any) => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

}
