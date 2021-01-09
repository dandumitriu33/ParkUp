import { Component, OnInit } from '@angular/core';

import { Area } from '../../models/Area';
import { City } from '../../models/City';
import { AreasService } from '../../services/areas.service';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'app-all-areas',
  templateUrl: './all-areas.component.html',
  styleUrls: ['./all-areas.component.css']
})
export class AllAreasComponent implements OnInit {
  allAreasForCity: Area[];
  allCities: City[];
  addAreaFormModel = {
    CityId: '',
    Name: ''
  };

  constructor(private areasService: AreasService,
              private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.citiesService.getAllCities().subscribe({
      next: cities => {
        this.allCities = cities;
      },
      error: err => console.error(err)
    });
  }

  refreshAreasForCity(cityId: string) {
    this.areasService.getAllAreasForCity(cityId).subscribe({
      next: areas => {
        this.allAreasForCity = areas;
      },
      error: err => console.error(err)
    });
  }

  onSubmit() {
    console.log(`new area submitted ${this.addAreaFormModel.Name} - CityId: ${this.addAreaFormModel.CityId}`);
  }

  logCityId(userSelectedCity) {
    console.log(`userSelectedCity from form ${userSelectedCity}`);
  }
}
