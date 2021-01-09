import { Component, OnInit } from '@angular/core';
import { Area } from '../../models/Area';

import { City } from '../../models/City';
import { AreasService } from '../../services/areas.service';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'app-add-parking-space',
  templateUrl: './add-parking-space.component.html',
  styleUrls: ['./add-parking-space.component.css']
})
export class AddParkingSpaceComponent implements OnInit {
  allCities: City[];
  allAreas: Area[];
  addParkingSpaceFormModel = {
    CityId: '',
    AreaId: '',
    Name: '',
    HourlyPrice: '',
    StreetName: '',
    Description: '',
    GPS: ''
  };

  constructor(private citiesService: CitiesService,
              private areasService: AreasService) { }

  ngOnInit(): void {
    this.citiesService.getAllCities().subscribe({
      next: cities => {
        this.allCities = cities;
      },
      error: err => console.error(err)
    });
  }

  onCityChange(cityId: string) {
    console.log('change city in add space: ' + cityId);
    this.refreshAreasSelector(cityId);
  }

  refreshAreasSelector(cityId: string) {
    console.log('refreshing areas for newly selected city: ' + cityId);
    this.areasService.getAllAreasForCity(cityId).subscribe({
      next: areas => {
        this.allAreas = areas;
      },
      error: err => console.error(err)
    });
  }

}
