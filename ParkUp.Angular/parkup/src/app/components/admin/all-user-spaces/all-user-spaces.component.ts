import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParkingSpace } from '../../../models/ParkingSpace';
import { ParkingSpacesService } from '../../../services/parking-spaces.service';

@Component({
  selector: 'app-all-user-spaces',
  templateUrl: './all-user-spaces.component.html',
  styles: [
  ]
})
export class AllUserSpacesComponent implements OnInit {
  userId: string = 'Loading...';
  userParkingSpaces: ParkingSpace[] = [];

  constructor(private parkingSpacesService: ParkingSpacesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.parkingSpacesService.getAllOwnerParkingSpaces(this.userId).subscribe({
      next: ownerParkingSpacesFromDb => {
        console.log(`received ${ownerParkingSpacesFromDb.length} spaces`);
        this.userParkingSpaces = ownerParkingSpacesFromDb;
      },
      error: err => console.error(err)
    });
  }

}
