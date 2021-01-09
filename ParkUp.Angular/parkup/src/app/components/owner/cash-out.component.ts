import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CashOutRequest } from '../../models/CashOutRequest';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-cash-out',
  templateUrl: './cash-out.component.html',
  styleUrls: ['./cash-out.component.css']
})
export class CashOutComponent implements OnInit {
  addCashOutRequest = {
    Amount: ''
  };

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log('submitting new cash out for: ' + form.value.Amount);
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
    }
    const newCashOutRequest: CashOutRequest = {
      "UserId": UserId,
      "Amount":form.value.Amount
    };
    console.log(newCashOutRequest);
    this.usersService.requestCashOut(newCashOutRequest).subscribe(
      (res: any) => {
        console.log('cash out request added successfully');
      },
      err => {
        console.log(err);
      }
    );
  }

}
