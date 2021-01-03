import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { BuyCreditsComponent } from './buy-credits.component';
import { PurchaseHistoryComponent } from './purchase-history.component';
import { RentalHistoryComponent } from './rental-history.component';


const routes: Routes = [
  { path: 'account', component: AccountComponent },
  { path: 'buy-credits', component: BuyCreditsComponent },
  { path: 'purchase-history', component: PurchaseHistoryComponent },
  { path: 'rental-history', component: RentalHistoryComponent }
];

@NgModule({
  declarations: [
    AccountComponent,
    BuyCreditsComponent,
    PurchaseHistoryComponent,
    RentalHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
