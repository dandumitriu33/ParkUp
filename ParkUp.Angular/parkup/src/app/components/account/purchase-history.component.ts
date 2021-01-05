import { Component, OnInit } from '@angular/core';

import { CreditPackPurchase } from '../../models/CreditPackPurchase';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  creditPackPurchaseHistory: CreditPackPurchase[];

  constructor() { }

  ngOnInit(): void {
  }

}
