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
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var UserId = payload.UserID;
    }
    this.usersService.getPurchaseHistory(UserId).subscribe({
      next: purchases => {
        this.allPurchases = purchases;
      },
      error: err => console.error(err)
    });
  }

}
