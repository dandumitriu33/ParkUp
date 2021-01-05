import { Component, OnInit } from '@angular/core';

import { CashOut } from '../../models/CashOut';

@Component({
  selector: 'app-approve-cash-out',
  templateUrl: './approve-cash-out.component.html',
  styleUrls: ['./approve-cash-out.component.css']
})
export class ApproveCashOutComponent implements OnInit {
  allUnapprovedCashOuts: CashOut[];

  constructor() { }

  ngOnInit(): void {
  }

}
