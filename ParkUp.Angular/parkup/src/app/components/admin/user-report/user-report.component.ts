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
    "DateAdded": '0',
    "Credits": 0.0,
    "PartnerPercentage": 0,
  };
  daysAgoJoined: number;

  constructor(private usersService: UsersService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.populateUserInfo();
    
  }

  populateUserInfo() {
    this.usersService.getUserInfoForAdmin(this.userId).subscribe({
      next: userInfoFromDb => {
        console.log(`received: ${this.userInfo}`);
        this.setDaysAgoJoined(userInfoFromDb.DateAdded);
        this.userInfo = userInfoFromDb;
      },
      error: err => console.error(err)
    });
  }

  setDaysAgoJoined(dateAdded: string) {
    var date1 = new Date(dateAdded);
    var date2 = new Date();

    var Difference_In_Time = date2.getTime() - date1.getTime();
    this.daysAgoJoined = Difference_In_Time / (1000 * 3600 * 24);
    console.log(`>>>>>>>>diff in time ${this.daysAgoJoined}`);
  }

}
