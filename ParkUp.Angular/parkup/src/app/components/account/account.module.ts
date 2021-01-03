import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { BuyCreditsComponent } from './buy-credits.component';
import { PurchaseHistoryComponent } from './purchase-history.component';


const routes: Routes = [
  { path: 'account', component: AccountComponent },
  { path: 'buy-credits', component: BuyCreditsComponent },
  { path: 'purchase-history', component: PurchaseHistoryComponent }
];

@NgModule({
  declarations: [
    AccountComponent,
    BuyCreditsComponent,
    PurchaseHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
