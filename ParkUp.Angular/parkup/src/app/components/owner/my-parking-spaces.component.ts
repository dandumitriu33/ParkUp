import { Component, OnInit } from '@angular/core';
import { ParkingSpace } from '../../models/ParkingSpace';

@Component({
  selector: 'app-my-parking-spaces',
  templateUrl: './my-parking-spaces.component.html',
  styleUrls: ['./my-parking-spaces.component.css']
})
export class MyParkingSpacesComponent implements OnInit {
  allParkingSpaces: ParkingSpace[];

  constructor() { }

  ngOnInit(): void {
  }

}
