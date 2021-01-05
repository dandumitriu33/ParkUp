import { Component, OnInit } from '@angular/core';

import { ParkingSpaceRental } from '../../models/ParkingSpaceRental';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-rental-history',
  templateUrl: './rental-history.component.html',
  styleUrls: ['./rental-history.component.css']
})
export class RentalHistoryComponent implements OnInit {
  allRentals: ParkingSpaceRental[];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getRentalHistory().subscribe({
      next: rentals => {
        this.allRentals = rentals;
      },
      error: err => console.error(err)
    });
  }

}
