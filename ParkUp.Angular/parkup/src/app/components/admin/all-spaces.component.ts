import { Component, OnInit, Output } from '@angular/core';

import { Area } from '../../models/Area';
import { City } from '../../models/City';
import { ParkingSpace } from '../../models/ParkingSpace';
import { AreasService } from '../../services/areas.service';
import { ParkingSpacesService } from '../../services/parking-spaces.service';

@Component({
  selector: 'app-all-spaces',
  templateUrl: './all-spaces.component.html',
  styleUrls: ['./all-spaces.component.css']
})
export class AllSpacesComponent implements OnInit {
  sharedCityIdTemp: string;
  allAreasForCity: Area[];
  allParkingSpacesForArea: ParkingSpace[];

  constructor(private parkingSpacesService: ParkingSpacesService,
              private areasService: AreasService) { }

  ngOnInit(): void {
  }

  refreshAreasForCity(cityId: string) {
    this.areasService.getAllAreasForCity(cityId).subscribe({
      next: areas => {
        this.allAreasForCity = areas;
      },
      error: err => console.error(err)
    });
    this.sharedCityIdTemp = cityId;
  }

  refreshParkingSpacesForArea(areaId: string) {
    this.parkingSpacesService.getAllParkingSpacesForArea(areaId).subscribe({
      next: parkingSpaces => {
        this.allParkingSpacesForArea = parkingSpaces;
      },
      error: err => console.error(err)
    });
  }

  onRemove(parkingSpaceId: string, areaId: string) {
    console.log(`clicked remove for space ${parkingSpaceId} from area ${areaId}`);

    this.parkingSpacesService.removeParkingSpace(parkingSpaceId).subscribe(
      (res: any) => {
        console.log('PS removed successfully');
        this.refreshParkingSpacesForArea(areaId);
      },
      err => {
        console.log(err);
      }
    );
  }

}
