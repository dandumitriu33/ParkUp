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
    this.parkingSpacesService.getAllOwnerTransactions().subscribe({
      next: transactions => {
        this.allTransactions = transactions;
      },
      error: err => console.error(err)
    });
  }

}
