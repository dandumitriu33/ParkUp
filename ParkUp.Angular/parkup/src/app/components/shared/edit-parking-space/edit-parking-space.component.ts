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
    });;
    // map to ANG PS

    
  }

  onSubmit(form: NgForm) {
    console.log(`submitting edit for PS ${this.parkingSpaceId}`);

    //// get owner ID
    //if (localStorage.getItem('token') != null) {
    //  var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    //  var UserId = payload.UserID;
    //}
    //// compare to PS owner for security on backend


    //let placeholderDate: string = "2019-01-06T17:16:40"; // will be changed by backend

    //const newParkingSpace: ParkingSpace = {
    //  "Id": 0,
    //  "AreaId": +this.addParkingSpaceFormModel.AreaId,
    //  "IsApproved": false,
    //  "OwnerId": UserId,
    //  "Name": this.addParkingSpaceFormModel.Name,
    //  "StreetName": this.addParkingSpaceFormModel.StreetName,
    //  "Description": this.addParkingSpaceFormModel.Description,
    //  "HourlyPrice": +this.addParkingSpaceFormModel.HourlyPrice,
    //  "IsActive": false,
    //  "IsTaken": false,
    //  "DateAdded": placeholderDate,
    //  "DateStarted": placeholderDate,
    //  "GPS": this.addParkingSpaceFormModel.GPS,
    //  "Latitude": 0,
    //  "Longitude": 0
    //};

    //this.parkingSpacesService.addNewParkingSpace(newParkingSpace).subscribe(

    //  (res: any) => {
    //    console.log('PS added successfully');
    //    this.resultMessage = `Parking Space ${newParkingSpace.Name} added.`;
    //  },
    //  err => {
    //    console.log(err);
    //    this.resultMessage = `Parking Space ${newParkingSpace.Name} was not added.`;
    //  }
    //);
  }

}
