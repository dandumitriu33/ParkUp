import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Area } from '../../../models/Area';
import { AreasService } from '../../../services/areas.service';

@Component({
  selector: 'app-edit-area',
  templateUrl: './edit-area.component.html',
  styles: [
  ]
})
export class EditAreaComponent implements OnInit {
  resultMessage: string;
  areaId: string;
  subjectArea: Area;

  editAreaFormModel = {
    Name: ''
  };

  constructor(private route: ActivatedRoute,
              private areasService: AreasService,
              private router: Router) { }

  ngOnInit(): void {
    this.resultMessage = "";
    this.areaId = this.route.snapshot.paramMap.get('id');
    this.populateEditFormInfo(this.areaId);
  }

  populateEditFormInfo(areaId: string) {
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
      var UserRole = payload.role;
    }
    this.areasService.getAreaById(areaId).subscribe({
      next: areaFromDb => {
        this.subjectArea = areaFromDb;
        // if current user is not an Admin or SuperAdmin, redirect to forbidden
        if (UserRole === "Admin" || UserRole === "SuperAdmin") {
          console.log(`user role: ${UserRole} - on area edit`);
          // set up placeholder values from DB
          this.editAreaFormModel.Name = this.subjectArea.Name;
        } else {
          console.log(`user role: ${UserRole} on area Edit`);
          this.router.navigate(['/forbidden']);
          return false;
        }
      },
      error: err => console.error(err)
    });
  }

  onSubmit(form: NgForm) {
    console.log(`submitting edit for area ${this.areaId}`);

    // TODO: authorize Admin, SuperAdmin for security on backend

    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
      var UserRole = payload.role;
    }
    const editedArea: Area = {
      "Id": +this.areaId,
      "Name": this.editAreaFormModel.Name,
      "CityId": this.subjectArea.CityId
    };

    this.areasService.editArea(editedArea).subscribe(
      (res: any) => {
        console.log('Area edited successfully');
        this.resultMessage = `Area: ${editedArea.Name} edited successfully.`;
      },
      err => {
        console.log(err);
        this.resultMessage = `Area: ${editedArea.Name} was not edited.`;
      }
    );

  }
}
