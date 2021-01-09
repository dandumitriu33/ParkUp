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
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
    }
    var transferPayload: CreditPack = {
      "UserId": UserId,
      "Amount": 50
    };
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
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
    }
    var transferPayload: CreditPack = {
      "UserId": UserId,
      "Amount": 100
    };
    this.usersService.buyCredits(transferPayload).subscribe(
      (res: any) => {
        console.log('bought 100 credits');
        this.usersService.isUserLoggedIn.next(true);
      },
      err => {
        console.log(err);
      }
    );
  }

  onBuy500Click(): void {
    console.log('buy 500 clicked.');
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
    }
    var transferPayload: CreditPack = {
      "UserId": UserId,
      "Amount": 500
    };
    this.usersService.buyCredits(transferPayload).subscribe(
      (res: any) => {
        console.log('bought 500 credits');
        this.usersService.isUserLoggedIn.next(true);
      },
      err => {
        console.log(err);
      }
    );
  }

  onBuy1000Click(): void {
    console.log('buy 1000 clicked.');
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
    }
    var transferPayload: CreditPack = {
      "UserId": UserId,
      "Amount": 1000
    };
    this.usersService.buyCredits(transferPayload).subscribe(
      (res: any) => {
        console.log('bought 1000 credits');
        this.usersService.isUserLoggedIn.next(true);
      },
      err => {
        console.log(err);
      }
    );
  }
}
