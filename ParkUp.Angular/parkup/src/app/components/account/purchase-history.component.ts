import { Component, OnInit } from '@angular/core';

import { CreditPackPurchase } from '../../models/CreditPackPurchase';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  allPurchases: CreditPackPurchase[];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getPurchaseHistory().subscribe({
      next: purchases => {
        this.allPurchases = purchases;
      },
      error: err => console.error(err)
    });
  }

}
