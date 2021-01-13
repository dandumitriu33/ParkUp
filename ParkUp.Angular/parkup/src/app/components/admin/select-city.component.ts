import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { City } from '../../models/City';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.css']
})
export class SelectCityComponent implements OnInit {
  @Output() userSelectedCity: EventEmitter<any> = new EventEmitter();

  selectedCity: string;
  allCities: City[];

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.citiesService.getAllCities().subscribe({
      next: cities => {
        this.allCities = cities;
      },
      error: err => console.error(err)
    });
  }

  onCityChange() {
    this.userSelectedCity.emit(this.selectedCity)
  }

}
