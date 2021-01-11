import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ParkingSpace } from '../../../models/ParkingSpace';
import { ParkingSpacesService } from '../../../services/parking-spaces.service';

@Component({
  selector: 'app-edit-parking-space',
  templateUrl: './edit-parking-space.component.html',
  styles: [
  ]
})
export class EditParkingSpaceComponent implements OnInit {
  parkingSpaceId: string;
  subjectParkingSpace: ParkingSpace;
  resultMessage: string;
  
  editParkingSpaceFormModel = {
    Name: '',
    HourlyPrice: '',
    StreetName: '',
    Description: '',
    GPS: ''
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private parkingSpacesService: ParkingSpacesService) { }

  ngOnInit(): void {
    this.resultMessage = "";
    this.parkingSpaceId = this.route.snapshot.paramMap.get('id');
    this.populateEditFormInfo(this.parkingSpaceId);
  }

  populateEditFormInfo(parkingSpaceId: string) {
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
      var UserRole = payload.role;
    }
    this.parkingSpacesService.getParkingSpaceById(parkingSpaceId).subscribe({
      next: parkingSpaceFromDb => {
        this.subjectParkingSpace = parkingSpaceFromDb;
        // if current user is not the owner of the PS, redirect to forbidden
        if (this.subjectParkingSpace.OwnerId !== UserId && UserRole !== "Admin" && UserRole !== "SuperAdmin") {
          console.log(`user role: ${UserRole}`);
          console.log(`DB owner id: ${this.subjectParkingSpace.OwnerId} -- vs-- current user ID: ${UserId}`);
          this.router.navigate(['/forbidden']);
          return false;
        } else {
          console.log(`user role: ${UserRole}`);
          // set up placeholder values from DB
          this.editParkingSpaceFormModel.Name = this.subjectParkingSpace.Name;
          this.editParkingSpaceFormModel.HourlyPrice = this.subjectParkingSpace.HourlyPrice.toString();
          this.editParkingSpaceFormModel.StreetName = this.subjectParkingSpace.StreetName;
          this.editParkingSpaceFormModel.Description = this.subjectParkingSpace.Description;
          this.editParkingSpaceFormModel.GPS = this.subjectParkingSpace.GPS;
        }
      },
      error: err => console.error(err)
    });
  }

  onSubmit(form: NgForm) {
    console.log(`submitting edit for PS ${this.parkingSpaceId}`);

    // TODO: compare to PS owner for security on backend


    let placeholderDate: string = "2019-01-06T17:16:40"; // will be changed by backend
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
      var UserRole = payload.role;
    }
    const editedParkingSpace: ParkingSpace = {
      "Id": +this.parkingSpaceId,
      "AreaId": 0,
      "IsApproved": false,
      "OwnerId": UserId,
      "Name": this.editParkingSpaceFormModel.Name,
      "StreetName": this.editParkingSpaceFormModel.StreetName,
      "Description": this.editParkingSpaceFormModel.Description,
      "HourlyPrice": +this.editParkingSpaceFormModel.HourlyPrice,
      "IsActive": false,
      "IsTaken": false,
      "DateAdded": placeholderDate,
      "DateStarted": placeholderDate,
      "GPS": this.editParkingSpaceFormModel.GPS,
      "Latitude": 0,
      "Longitude": 0
    };

    this.parkingSpacesService.editParkingSpace(editedParkingSpace).subscribe(
      (res: any) => {
        console.log('PS edited successfully');
        this.resultMessage = `Parking Space ${editedParkingSpace.Name} edited successfully.`;
      },
      err => {
        console.log(err);
        this.resultMessage = `Parking Space ${editedParkingSpace.Name} was not edited.`;
      }
    );
  }

}
