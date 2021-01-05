import { Component, OnInit } from '@angular/core';

import { ApplicationUser } from '../../models/ApplicationUser';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  allUsers: ApplicationUser[];

  constructor() { }

  ngOnInit(): void {
  }

}
