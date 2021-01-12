import { Component, OnInit } from '@angular/core';

import { ParkingSpace } from '../../models/ParkingSpace';
import { ParkingSpaceApproval } from '../../models/ParkingSpaceApproval';
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

  onApproveClick(unapprovedSpaceId: number) {
    console.log(`Approve space clicked - for: ${unapprovedSpaceId}`);
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var currentUserId = payload.UserID;
    }
    let parkingSpaceApproval: ParkingSpaceApproval = {
      "UserId": currentUserId,
      "ParkingSpaceId": unapprovedSpaceId
    };
    this.parkingSpacesService.approveParkingSpace(parkingSpaceApproval).subscribe(
      (res: any) => {
        console.log('PS approved successfully');
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

}
