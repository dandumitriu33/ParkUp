import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MyParkingSpacesComponent } from './my-parking-spaces.component';
import { AddParkingSpaceComponent } from './add-parking-space.component';
import { CashOutComponent } from './cash-out.component';
import { TransactionHistoryComponent } from './transaction-history.component';

const routes: Routes = [
  { path: 'my-parking-spaces', component: MyParkingSpacesComponent },
  { path: 'add-parking-space', component: AddParkingSpaceComponent },
  { path: 'cash-out', component: CashOutComponent },
  { path: 'transaction-history', component: TransactionHistoryComponent }  
];

@NgModule({
  declarations: [
    MyParkingSpacesComponent,
    AddParkingSpaceComponent,
    CashOutComponent,
    TransactionHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OwnerModule { }
