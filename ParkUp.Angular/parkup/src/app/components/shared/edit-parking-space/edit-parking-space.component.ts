import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-parking-space',
  templateUrl: './edit-parking-space.component.html',
  styles: [
  ]
})
export class EditParkingSpaceComponent implements OnInit {
  parkingSpaceId: number;
  
  editParkingSpaceFormModel = {
    Name: '',
    HourlyPrice: '',
    StreetName: '',
    Description: '',
    GPS: ''
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.parkingSpaceId = +this.route.snapshot.paramMap.get('id');
    // GET PS from API based on id
  }

  onSubmit(form: NgForm) {
    console.log(`submitting edit for PS ${this.parkingSpaceId}`);

    // get owner ID
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
    }
    // compare to PS owner for security


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
