import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationUser } from '../../../models/ApplicationUser';

import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styles: [
  ]
})
export class UserReportComponent implements OnInit {
  userId: string;
  userInfo: ApplicationUser = {
    "Id": 'Loading...',
    "FirstName": 'Loading...',
    "LastName": 'Loading...',
    "Email": 'Loading...',
    "DateAdded": 'Loading...',
    "Credits": 0.0,
    "PartnerPercentage": 0,
  };

  constructor(private usersService: UsersService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.usersService.getUserInfoForAdmin(this.userId).subscribe({
      next: userInfoFromDb => {
        console.log(`received: ${this.userInfo}`);
        this.userInfo = userInfoFromDb;
      },
      error: err => console.error(err)
    });
  }

}
