import { Component, OnInit } from '@angular/core';

import { ParkingSpaceRental } from '../../models/ParkingSpaceRental';
import { ParkingSpacesService } from '../../services/parking-spaces.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  allTransactions: ParkingSpaceRental[];

  constructor(private parkingSpacesService: ParkingSpacesService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
    }
    this.parkingSpacesService.getAllOwnerTransactions(UserId).subscribe({
      next: transactions => {
        this.allTransactions = transactions;
      },
      error: err => console.error(err)
    });
  }

}
