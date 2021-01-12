import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationUser } from '../../../models/ApplicationUser';
import { CashOut } from '../../../models/CashOut';
import { ParkingSpace } from '../../../models/ParkingSpace';
import { ParkingSpaceRental } from '../../../models/ParkingSpaceRental';
import { ParkingSpacesService } from '../../../services/parking-spaces.service';

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
  userParkingSpaces: ParkingSpace[];
  userRentalsAsOwner: ParkingSpaceRental[];
  userApprovedCashOuts: CashOut[];


  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private parkingSpacesService: ParkingSpacesService) { }

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
    this.parkingSpacesService.getAllOwnerParkingSpaces(this.userId).subscribe({
      next: ownerParkingSpacesFromDb => {
        console.log(`received ${ownerParkingSpacesFromDb.length} spaces`);
        this.userParkingSpaces = ownerParkingSpacesFromDb;
      },
      error: err => console.error(err)
    });
    this.parkingSpacesService.getAllOwnerTransactions(this.userId).subscribe({
      next: transactions => {
        this.userRentalsAsOwner = transactions;
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
