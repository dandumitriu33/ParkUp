import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { BuyCreditsComponent } from './buy-credits.component';


const routes: Routes = [
  { path: 'account', component: AccountComponent },
  { path: 'buy-credits', component: BuyCreditsComponent }
];

@NgModule({
  declarations: [
    AccountComponent,
    BuyCreditsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
