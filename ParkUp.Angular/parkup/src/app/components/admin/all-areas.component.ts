import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Area } from '../../models/Area';
import { City } from '../../models/City';
import { NewArea } from '../../models/NewArea';
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

  onSubmit(form: NgForm) {
    console.log(`submitting ${this.addAreaFormModel.Name} - CityId: ${this.addAreaFormModel.CityId}`);

    const newArea: NewArea = {
      "Name": this.addAreaFormModel.Name,
      "CityId": +this.addAreaFormModel.CityId
    };
    console.log(newArea);
    this.areasService.postNewArea(newArea).subscribe(
      (res: any) => {
        console.log('area added successfully');
        this.refreshAreasForCity(this.addAreaFormModel.CityId);
      },
      err => {
        console.log(err);
      }
    );

  }

}
