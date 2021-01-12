import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParkingSpaceRental } from '../../../models/ParkingSpaceRental';
import { ParkingSpacesService } from '../../../services/parking-spaces.service';

@Component({
  selector: 'app-all-user-transactions',
  templateUrl: './all-user-transactions.component.html',
  styles: [
  ]
})
export class AllUserTransactionsComponent implements OnInit {
  userId: string = 'Loading...';
  userRentalsAsOwner: ParkingSpaceRental[] = [];

  constructor(private parkingSpacesService: ParkingSpacesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.parkingSpacesService.getAllOwnerTransactions(this.userId).subscribe({
      next: transactions => {
        this.userRentalsAsOwner = transactions;
      },
      error: err => console.error(err)
    });
  }

}
