import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
              private areasService: AreasService) { }

  ngOnInit(): void {
    this.resultMessage = "";
    this.areaId = this.route.snapshot.paramMap.get('id');
    this.populateEditFormInfo(this.areaId);
  }

  populateEditFormInfo(areaId: string) {
    this.areasService.getAreaById(areaId).subscribe({
      next: areaFromDb => {
        this.subjectArea = areaFromDb;        
        this.editAreaFormModel.Name = this.subjectArea.Name;        
      },
      error: err => console.error(err)
    });
  }

  onSubmit(form: NgForm) {    
    const editedArea: Area = {
      "Id": +this.areaId,
      "Name": this.editAreaFormModel.Name,
      "CityId": this.subjectArea.CityId
    };
    this.areasService.editArea(editedArea).subscribe(
      (res: any) => {
        this.resultMessage = `Area: ${editedArea.Name} edited successfully.`;
      },
      err => {
        console.log(err);
        this.resultMessage = `Area: ${editedArea.Name} was not edited.`;
      }
    );
  }
}
