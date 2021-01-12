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
  lifetimeSales: number;
  lifetimeParkUp: number;
  lifetimeCasjOut: number;


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
        this.setLifetimeSales(this.userRentalsAsOwner);
      },
      error: err => console.error(err)
    });
    this.usersService.getAllApprovedCashOutsForUser(this.userId).subscribe({
      next: cashOuts => {
        this.userApprovedCashOuts = cashOuts;
      },
      error: err => console.error(err)
    });
  }

  setLifetimeSales(userRentalsAsOwner: ParkingSpaceRental[]) {
    let sum: number = 0;
    userRentalsAsOwner.forEach(function (item) {
      sum = sum + item.AmountPaidByUser;
    });
    this.lifetimeSales = sum;
  }

  setDaysAgoJoined(dateAdded: string) {
    var date1 = new Date(dateAdded);
    var date2 = new Date();
    var Difference_In_Time = date2.getTime() - date1.getTime();
    this.daysAgoJoined = Difference_In_Time / (1000 * 3600 * 24);
  }

}
