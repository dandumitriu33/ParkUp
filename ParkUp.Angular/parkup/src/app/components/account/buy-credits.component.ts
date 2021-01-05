import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy-credits',
  templateUrl: './buy-credits.component.html',
  styleUrls: ['./buy-credits.component.css']
})
export class BuyCreditsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onBuy50Click(): void {
    console.log('buy 50 clicked.');
    // TODO - post request to add 50 cred to user
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
