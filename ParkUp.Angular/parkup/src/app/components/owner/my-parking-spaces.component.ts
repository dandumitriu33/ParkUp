import { Component, OnInit } from '@angular/core';

import { ParkingSpace } from '../../models/ParkingSpace';
import { ParkingSpacesService } from '../../services/parking-spaces.service';

@Component({
  selector: 'app-my-parking-spaces',
  templateUrl: './my-parking-spaces.component.html',
  styleUrls: ['./my-parking-spaces.component.css']
})
export class MyParkingSpacesComponent implements OnInit {
  allParkingSpaces: ParkingSpace[];

  constructor(private parkingSpacesService: ParkingSpacesService) { }

  ngOnInit(): void {
    this.parkingSpacesService.getAllOwnerParkingSpaces().subscribe({
      next: spaces => {
        this.allParkingSpaces = spaces;
      },
      error: err => console.error(err)
    });
  }

}
