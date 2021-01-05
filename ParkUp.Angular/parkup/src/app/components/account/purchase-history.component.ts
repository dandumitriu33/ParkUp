import { Component, OnInit } from '@angular/core';

import { CreditPackPurchase } from '../../models/CreditPackPurchase';
import { PurchaseHistoryService } from '../../services/purchase-history.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  allPurchases: CreditPackPurchase[];

  constructor(private purchaseHistoryService: PurchaseHistoryService) { }

  ngOnInit(): void {
    this.purchaseHistoryService.getPurchaseHistory().subscribe({
      next: purchases => {
        this.allPurchases = purchases;
      },
      error: err => console.error(err)
    });
  }

}
