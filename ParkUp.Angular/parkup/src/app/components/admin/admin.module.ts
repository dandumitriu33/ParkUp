import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';

import { ApproveSpacesComponent } from './approve-spaces.component';
import { ApproveCashOutComponent } from './approve-cash-out.component';
import { AllUsersComponent } from './all-users.component';
import { AllSpacesComponent } from './all-spaces.component';
import { AllAreasComponent } from './all-areas.component';
import { AllCitiesComponent } from './all-cities.component';
import { SelectCityComponent } from './select-city.component';
import { SelectAreaComponent } from './select-area.component';
import { UserReportComponent } from './user-report/user-report.component';
import { AllUserSpacesComponent } from './all-user-spaces/all-user-spaces.component';
import { AllUserTransactionsComponent } from './all-user-transactions/all-user-transactions.component';
import { AllUserCashOutsComponent } from './all-user-cash-outs/all-user-cash-outs.component';

const routes: Routes = [
  { path: 'approve-spaces', component: ApproveSpacesComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } },
  { path: 'approve-cash-out', component: ApproveCashOutComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } },
  { path: 'all-users', component: AllUsersComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } },
  { path: 'all-spaces', component: AllSpacesComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } },
  { path: 'all-areas', component: AllAreasComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } },
  { path: 'all-cities', component: AllCitiesComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } },
  { path: 'user-report/:userId', component: UserReportComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } },
  { path: 'all-user-spaces/:userId', component: AllUserSpacesComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } },
  { path: 'all-user-transactions/:userId', component: AllUserTransactionsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } },
  { path: 'all-user-cash-outs/:userId', component: AllUserCashOutsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } },
];

@NgModule({
  declarations: [
    ApproveSpacesComponent,
    ApproveCashOutComponent,
    AllUsersComponent,
    AllSpacesComponent,
    AllAreasComponent,
    AllCitiesComponent,
    SelectCityComponent,
    SelectAreaComponent,
    UserReportComponent,
    AllUserSpacesComponent,
    AllUserTransactionsComponent,
    AllUserCashOutsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
