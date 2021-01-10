import { HttpClient } from '@angular/common/http';
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
    console.log('onsubmit new city: ' + form.value.Name);
    const newCity: City = {
      Id: 0,
      Name: form.value.Name,
      Areas: []
    };
    console.log(newCity);
    this.citiesService.addCity(newCity).subscribe(
      (res: any) => {
        console.log('new city added successfully');
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  onRemove(cityId: number) {
    console.log(`remove city ${cityId} clicked`);
    
    this.citiesService.deleteCity(cityId).subscribe(
      (res: any) => {
        console.log('city deleted successfully');
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

}
