import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MyParkingSpacesComponent } from './my-parking-spaces.component';
import { AddParkingSpaceComponent } from './add-parking-space.component';
import { CashOutComponent } from './cash-out.component';
import { TransactionHistoryComponent } from './transaction-history.component';
import { AuthGuard } from '../../auth/auth.guard';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'my-parking-spaces', component: MyParkingSpacesComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Owner', 'SuperAdmin'] } },
  { path: 'add-parking-space', component: AddParkingSpaceComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Owner', 'SuperAdmin'] } },
  { path: 'cash-out', component: CashOutComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Owner', 'SuperAdmin'] } },
  { path: 'transaction-history', component: TransactionHistoryComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Owner', 'SuperAdmin'] } }  
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
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OwnerModule { }
