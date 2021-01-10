import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ParkingSpace } from '../../models/ParkingSpace';
import { ParkingSpacesService } from '../../services/parking-spaces.service';

@Component({
  selector: 'app-my-parking-spaces',
  templateUrl: './my-parking-spaces.component.html',
  styleUrls: ['./my-parking-spaces.component.css']
})
export class MyParkingSpacesComponent implements OnInit {
  allParkingSpaces: ParkingSpace[];

  constructor(private parkingSpacesService: ParkingSpacesService,
              private router: Router) { }

  ngOnInit(): void {
    this.parkingSpacesService.getAllOwnerParkingSpaces().subscribe({
      next: spaces => {
        this.allParkingSpaces = spaces;
      },
      error: err => console.error(err)
    });
  }

  onRemove(parkingSpaceId: string) {
    console.log(`clicked remove for space ${parkingSpaceId} from my spaces`);

    this.parkingSpacesService.removeParkingSpace(parkingSpaceId).subscribe(
      (res: any) => {
        console.log('PS removed successfully');
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  onEdit(parkingSpaceId: string) {
    console.log(`clicked Edit PS ${parkingSpaceId} on MySpaces`);
    
  }

}
