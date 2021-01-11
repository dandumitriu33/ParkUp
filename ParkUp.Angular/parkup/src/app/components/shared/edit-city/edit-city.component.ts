import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styles: [
  ]
})
export class EditCityComponent implements OnInit {
  resultMessage: string;

  editCityFormModel = {
    Name: ''
  };

  constructor() { }

  ngOnInit(): void {
    this.resultMessage = "";
  }

  onSubmit(form: NgForm) {
    console.log(`city edit submitted`);
  }

}
