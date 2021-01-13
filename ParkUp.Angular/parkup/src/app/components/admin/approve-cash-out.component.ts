import { Component, OnInit } from '@angular/core';

import { CashOut } from '../../models/CashOut';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-approve-cash-out',
  templateUrl: './approve-cash-out.component.html',
  styleUrls: ['./approve-cash-out.component.css']
})
export class ApproveCashOutComponent implements OnInit {
  allUnapprovedCashOuts: CashOut[];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllUnapprovedCashOuts().subscribe({
      next: cashOuts => {
        this.allUnapprovedCashOuts = cashOuts;
      },
      error: err => console.error(err)
    });
  }

  onApproveCashOut(cashOutId: number) {
    console.log(`cash out Approve click for ${cashOutId}`);
  }

}
