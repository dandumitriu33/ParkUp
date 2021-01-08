import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MyParkingSpacesComponent } from './my-parking-spaces.component';
import { AddParkingSpaceComponent } from './add-parking-space.component';
import { CashOutComponent } from './cash-out.component';
import { TransactionHistoryComponent } from './transaction-history.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: 'my-parking-spaces', component: MyParkingSpacesComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } },
  { path: 'add-parking-space', component: AddParkingSpaceComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } },
  { path: 'cash-out', component: CashOutComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } },
  { path: 'transaction-history', component: TransactionHistoryComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } }  
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
