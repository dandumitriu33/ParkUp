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

  onBuy50Click(): void {
    console.log('buy 50 clicked.');
    // TODO - post request to add 50 cred to user
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
    }

    var transferPayload: CreditPack = {
      "UserId": UserId,
      "Amount": 50
    }
    console.log(transferPayload);
    this.usersService.buyCredits(transferPayload).subscribe(
      (res: any) => {
        console.log('bought 50 credits');
        this.usersService.isUserLoggedIn.next(true);
      },
      err => {
        console.log(err);        
      }
    );
  }

  onBuy100Click(): void {
    console.log('buy 100 clicked.');
    // TODO - post request to add 100 cred to user
  }

  onBuy500Click(): void {
    console.log('buy 500 clicked.');
    // TODO - post request to add 500 cred to user
  }

  onBuy1000Click(): void {
    console.log('buy 1000 clicked.');
    // TODO - post request to add 1000 cred to user
  }
}
