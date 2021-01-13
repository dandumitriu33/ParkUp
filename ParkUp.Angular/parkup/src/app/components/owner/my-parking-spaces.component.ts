import { Component, OnInit } from '@angular/core';

import { ForceFreeParkingSpace } from '../../models/ForceFreeParkingSpace';
import { ParkingSpace } from '../../models/ParkingSpace';
import { ParkingSpacesService } from '../../services/parking-spaces.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-my-parking-spaces',
  templateUrl: './my-parking-spaces.component.html',
  styleUrls: ['./my-parking-spaces.component.css']
})
export class MyParkingSpacesComponent implements OnInit {
  allParkingSpaces: ParkingSpace[];

  constructor(private parkingSpacesService: ParkingSpacesService,
              private usersService: UsersService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
    }
    this.parkingSpacesService.getAllOwnerParkingSpaces(UserId).subscribe({
      next: spaces => {
        this.allParkingSpaces = spaces;
      },
      error: err => console.error(err)
    });
    this.usersService.isUserLoggedIn.next(true);
  }

  onRemove(parkingSpaceId: string) {
    this.parkingSpacesService.removeParkingSpace(parkingSpaceId).subscribe(
      (res: any) => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  onForceFree(parkingSpaceId: number) {
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var currentUserId = payload.UserID;
    }
    let forceFreeParkingSpaceDTO: ForceFreeParkingSpace = {
      "UserId": currentUserId,
      "ParkingSpaceId": parkingSpaceId
    };
    this.parkingSpacesService.forceFreeParkingSpace(forceFreeParkingSpaceDTO).subscribe(
      (res: any) => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );    
  }

}
