import { Component, OnInit } from '@angular/core';

import { CashOut } from '../../models/CashOut';
import { CashOutApproval } from '../../models/CashOutApproval';
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
    this.usersService.isUserLoggedIn.next(true);
  }

  onApproveCashOutClick(cashOutId: number) {
    console.log(`cash out Approve click for ${cashOutId}`);
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var currentUserId = payload.UserID;
    }
    let cashOutApproval: CashOutApproval = {
      "UserId": currentUserId,
      "CashOutId": cashOutId
    };
    this.usersService.approveCashOut(cashOutApproval).subscribe(
      (res: any) => {
        console.log('Cash Out approved successfully');
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

}
