import { Component, OnInit } from '@angular/core';

import { ParkingSpace } from '../../models/ParkingSpace';

@Component({
  selector: 'app-approve-spaces',
  templateUrl: './approve-spaces.component.html',
  styleUrls: ['./approve-spaces.component.css']
})
export class ApproveSpacesComponent implements OnInit {
  allUnapprovedParkingSpaces: ParkingSpace[];

  constructor() { }

  ngOnInit(): void {
  }

}
