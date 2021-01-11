import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
              private citiesService: CitiesService,
              private router: Router) { }

  ngOnInit(): void {
    this.resultMessage = "";
    this.cityId = this.route.snapshot.paramMap.get('id');
    this.populateEditFormInfo(this.cityId);
  }

  populateEditFormInfo(cityId: string) {
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
      var UserRole = payload.role;
    }
    this.citiesService.getCityById(cityId).subscribe({
      next: cityFromDb => {
        this.subjectCity = cityFromDb;
        // if current user is not an Admin or SuperAdmin, redirect to forbidden
        if (UserRole === "Admin" || UserRole === "SuperAdmin") {
          console.log(`user role: ${UserRole} - on city edit`);
          // set up placeholder values from DB
          this.editCityFormModel.Name = this.subjectCity.Name;
        } else {
          console.log(`user role: ${UserRole} on city Edit`);
          this.router.navigate(['/forbidden']);
          return false;
        }
      },
      error: err => console.error(err)
    });
  }

  onSubmit(form: NgForm) {
    console.log(`submitting edit for city ${this.cityId}`);

    // TODO: authorize Admin, SuperAdmin for security on backend

    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
      var UserRole = payload.role;
    }
    const editedCity: City = {
      "Id": +this.cityId,
      "Name": this.editCityFormModel.Name,
      "Areas": []
    };

    this.citiesService.editCity(editedCity).subscribe(
      (res: any) => {
        console.log('City edited successfully');
        this.resultMessage = `City: ${editedCity.Name} edited successfully.`;
      },
      err => {
        console.log(err);
        this.resultMessage = `City: ${editedCity.Name} was not edited.`;
      }
    );
  
  }

}
