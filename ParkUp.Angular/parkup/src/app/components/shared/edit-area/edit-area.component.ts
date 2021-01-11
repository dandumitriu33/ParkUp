import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Area } from '../../../models/Area';

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) { }
}
