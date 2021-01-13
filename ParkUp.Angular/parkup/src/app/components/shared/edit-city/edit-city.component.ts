import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { City } from '../../../models/City';
import { CitiesService } from '../../../services/cities.service';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styles: [
  ]
})
export class EditCityComponent implements OnInit {
  resultMessage: string;
  cityId: string;
  subjectCity: City;

  editCityFormModel = {
    Name: ''
  };

  constructor(private route: ActivatedRoute,
              private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.resultMessage = "";
    this.cityId = this.route.snapshot.paramMap.get('id');
    this.populateEditFormInfo(this.cityId);
  }

  populateEditFormInfo(cityId: string) {
    this.citiesService.getCityById(cityId).subscribe({
      next: cityFromDb => {
        this.subjectCity = cityFromDb;
        this.editCityFormModel.Name = this.subjectCity.Name;
      },
      error: err => console.error(err)
    });
  }

  onSubmit(form: NgForm) {
    const editedCity: City = {
      "Id": +this.cityId,
      "Name": this.editCityFormModel.Name,
      "Areas": []
    };
    this.citiesService.editCity(editedCity).subscribe(
      (res: any) => {
        this.resultMessage = `City: ${editedCity.Name} edited successfully.`;
      },
      err => {
        console.log(err);
        this.resultMessage = `City: ${editedCity.Name} was not edited.`;
      }
    );  
  }

}
