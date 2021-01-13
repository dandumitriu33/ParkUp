import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { City } from '../../models/City';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'app-all-cities',
  templateUrl: './all-cities.component.html',
  styleUrls: ['./all-cities.component.css']
})
export class AllCitiesComponent implements OnInit {
  
  addCityFormModel = {
    Name: ''
  };
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

  onSubmit(form: NgForm) {
    const newCity: City = {
      Id: 0,
      Name: form.value.Name,
      Areas: []
    };
    this.citiesService.addCity(newCity).subscribe(
      (res: any) => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  onRemove(cityId: number) {
    this.citiesService.deleteCity(cityId).subscribe(
      (res: any) => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

}
