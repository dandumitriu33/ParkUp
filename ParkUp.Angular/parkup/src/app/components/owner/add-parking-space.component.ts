import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Area } from '../../models/Area';

import { City } from '../../models/City';
import { ParkingSpace } from '../../models/ParkingSpace';
import { AreasService } from '../../services/areas.service';
import { CitiesService } from '../../services/cities.service';
import { ParkingSpacesService } from '../../services/parking-spaces.service';

@Component({
  selector: 'app-add-parking-space',
  templateUrl: './add-parking-space.component.html',
  styleUrls: ['./add-parking-space.component.css']
})
export class AddParkingSpaceComponent implements OnInit {
  allCities: City[];
  allAreas: Area[];
  resultMessage: string;
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
              private areasService: AreasService,
              private parkingSpacesService: ParkingSpacesService) { }

  ngOnInit(): void {
    this.resultMessage = '';
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

  onSubmit(form: NgForm) {
    console.log(`submitting ${this.addParkingSpaceFormModel.Name} - CityId: ${this.addParkingSpaceFormModel.CityId} - AreaId: ${this.addParkingSpaceFormModel.AreaId}`);

    // get owner ID
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
    }

    let placeholderDate: string = "2019-01-06T17:16:40"; // will be changed by backend

    const newParkingSpace: ParkingSpace = {
      "Id": 0,
      "AreaId": +this.addParkingSpaceFormModel.AreaId,
      "IsApproved": false,
      "OwnerId": UserId,
      "Name": this.addParkingSpaceFormModel.Name,
      "StreetName": this.addParkingSpaceFormModel.StreetName,
      "Description": this.addParkingSpaceFormModel.Description,
      "HourlyPrice": +this.addParkingSpaceFormModel.HourlyPrice,
      "IsActive": false,
      "IsTaken": false,
      "DateAdded": placeholderDate,
      "DateStarted": placeholderDate,
      "GPS": this.addParkingSpaceFormModel.GPS,
      "Latitude": 0,
      "Longitude": 0
    };

    this.parkingSpacesService.addNewParkingSpace(newParkingSpace).subscribe(
      (res: any) => {
        console.log('PS added successfully');
        this.resultMessage = `Parking Space ${newParkingSpace.Name} added.`;
      },
      err => {
        console.log(err);
        this.resultMessage = `Parking Space ${newParkingSpace.Name} was not added.`;
      }
    );
  }

}
