import { Component, OnInit } from '@angular/core';

import { CreditPack } from '../../models/CreditPack';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-buy-credits',
  templateUrl: './buy-credits.component.html',
  styleUrls: ['./buy-credits.component.css']
})
export class BuyCreditsComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  onBuyCreditsClick(amount: number) {
    console.log('buying ' + amount);
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
    }
    var transferPayload: CreditPack = {
      "UserId": UserId,
      "Amount": amount
    };
    this.usersService.buyCredits(transferPayload).subscribe(
      (res: any) => {
        console.log(`bought ${amount} credits`);
        this.usersService.isUserLoggedIn.next(true);
      },
      err => {
        console.log(err);
      }
    );
  }
  
}
