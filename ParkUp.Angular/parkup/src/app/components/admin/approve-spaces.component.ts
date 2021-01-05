import { Component, OnInit } from '@angular/core';

import { ParkingSpace } from '../../models/ParkingSpace';
import { ParkingSpacesService } from '../../services/parking-spaces.service';

@Component({
  selector: 'app-approve-spaces',
  templateUrl: './approve-spaces.component.html',
  styleUrls: ['./approve-spaces.component.css']
})
export class ApproveSpacesComponent implements OnInit {
  allUnapprovedParkingSpaces: ParkingSpace[];

  constructor(private parkingSpacesService: ParkingSpacesService) { }

  ngOnInit(): void {
    this.parkingSpacesService.getAllUnapprovedParkingSpaces().subscribe({
      next: unapprovedParkingSpaces => {
        this.allUnapprovedParkingSpaces = unapprovedParkingSpaces;
      },
      error: err => console.error(err)
    });
  }

}
