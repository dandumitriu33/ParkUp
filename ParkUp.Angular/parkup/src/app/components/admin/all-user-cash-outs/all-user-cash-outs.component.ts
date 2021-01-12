import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CashOut } from '../../../models/CashOut';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-all-user-cash-outs',
  templateUrl: './all-user-cash-outs.component.html',
  styles: [
  ]
})
export class AllUserCashOutsComponent implements OnInit {
  userId: string = 'Loading...';
  userApprovedCashOuts: CashOut[] = [];

  constructor(private usersService: UsersService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.usersService.getAllApprovedCashOutsForUser(this.userId).subscribe({
      next: cashOuts => {
        this.userApprovedCashOuts = cashOuts;
      },
      error: err => console.error(err)
    });
  }

}
