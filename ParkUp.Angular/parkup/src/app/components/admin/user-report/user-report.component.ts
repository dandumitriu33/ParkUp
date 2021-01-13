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
  userParkingSpaces: ParkingSpace[] = [];
  userRentalsAsOwner: ParkingSpaceRental[] = [];
  userApprovedCashOuts: CashOut[] = [];
  lifetimeSales: number;
  lifetimeParkUp: number;
  lifetimeCashOut: number;
  averageCashOut: number;


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
        this.setDaysAgoJoined(userInfoFromDb.DateAdded);
        this.userInfo = userInfoFromDb;
      },
      error: err => console.error(err)
    });
    this.parkingSpacesService.getAllOwnerParkingSpaces(this.userId).subscribe({
      next: ownerParkingSpacesFromDb => {
        this.userParkingSpaces = ownerParkingSpacesFromDb;
      },
      error: err => console.error(err)
    });
    this.parkingSpacesService.getAllOwnerTransactions(this.userId).subscribe({
      next: transactions => {
        this.userRentalsAsOwner = transactions;
        this.setLifetimeSales(this.userRentalsAsOwner);
        this.setLifeTimeParkUp(this.userRentalsAsOwner);
      },
      error: err => console.error(err)
    });
    this.usersService.getAllApprovedCashOutsForUser(this.userId).subscribe({
      next: cashOuts => {
        this.userApprovedCashOuts = cashOuts;
        this.setlifetimeCashOut(this.userApprovedCashOuts);
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

  setLifeTimeParkUp(userRentalsAsOwner: ParkingSpaceRental[]) {
    let sum: number = 0;
    userRentalsAsOwner.forEach(function (item) {
      sum = sum + (item.AmountPaidByUser - item.AmountReceivedByOwner);
    });
    this.lifetimeParkUp = sum;
  }

  setlifetimeCashOut(userApprovedCashOuts: CashOut[]) {
    let sum: number = 0;
    userApprovedCashOuts.forEach(function (item) {
      sum = sum + item.Amount;
    });
    this.lifetimeCashOut = sum;
    this.averageCashOut = this.lifetimeCashOut / userApprovedCashOuts.length;
  }

  setDaysAgoJoined(dateAdded: string) {
    var date1 = new Date(dateAdded);
    var date2 = new Date();
    var Difference_In_Time = date2.getTime() - date1.getTime();
    this.daysAgoJoined = Difference_In_Time / (1000 * 3600 * 24);
  }

}
