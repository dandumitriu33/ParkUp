import { Component, OnInit } from '@angular/core';
import { Area } from '../../models/Area';
import { City } from '../../models/City';
import { ParkingSpace } from '../../models/ParkingSpace';
import { AreasService } from '../../services/areas.service';
import { CitiesService } from '../../services/cities.service';
import { ParkingSpacesService } from '../../services/parking-spaces.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allCities: City[] = [];
  allAreasForCity: Area[] = [];
  availableParkingSpaces: ParkingSpace[] = [];
  selectedCity: string;
  selectedArea: string;

  takenSpaces: any[];

  constructor(private citiesService: CitiesService,
              private areasService: AreasService,
              private parkingSpacesService: ParkingSpacesService) { }

  ngOnInit(): void {
    this.citiesService.getAllCities().subscribe({
      next: cities => {
        this.allCities = cities;
      },
      error: err => console.error(err)
    });



    // temp hardcoded
    this.takenSpaces = [
      { 'id': 1, 'name': 'test' },
      { 'id': 2, 'name': 'test2' },
      { 'id': 3, 'name': 'test3' }
      ];
  }

  onCityChange() {
    console.log(`home - selected city changed to: ${this.selectedCity}`);
    // refresh areas based on selectedCity
    this.refreshAreasForSelectedCity(this.selectedCity);
  }

  refreshAreasForSelectedCity(selectedCity: string) {
    this.areasService.getAllAreasForCity(this.selectedCity).subscribe({
      next: areas => {
        this.allAreasForCity = areas;
      },
      error: err => console.error(err)
    });
  }

  onAreaChange() {
    console.log(`home - selected area changed to: ${this.selectedArea}`);
    this.availableParkingSpaces = [];
    // refresh spaces based on Manually selectedArea
    this.parkingSpacesService.getAllParkingSpacesForArea(this.selectedArea).subscribe({
      next: parkingSpaces => {
        this.availableParkingSpaces = parkingSpaces;
      },
      error: err => console.error(err)
    });
  }

}
