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
  resultMessage: string;
  addCashOutRequest = {
    Amount: ''
  };

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.resultMessage = "";
  }

  onSubmit(form: NgForm) {
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
    }
    const newCashOutRequest: CashOutRequest = {
      "UserId": UserId,
      "Amount": form.value.Amount
    };
    this.usersService.requestCashOut(newCashOutRequest).subscribe(
      (res: any) => {
        this.resultMessage = `Cash Out request for ${newCashOutRequest.Amount} submitted. Please wait 2-7 business days for approval.`;
      },
      err => {
        this.resultMessage = `Error. The Cash Out request for ${newCashOutRequest.Amount} was not submitted. Please try again later.`;
        console.log(err);
      }
    );
  }

}
