import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ApproveSpacesComponent } from './approve-spaces.component';
import { ApproveCashOutComponent } from './approve-cash-out.component';
import { AllUsersComponent } from './all-users.component';
import { AllSpacesComponent } from './all-spaces.component';
import { AllAreasComponent } from './all-areas.component';
import { AllCitiesComponent } from './all-cities.component';
import { SelectCityComponent } from './select-city.component';
import { SelectAreaComponent } from './select-area.component';

const routes: Routes = [
  { path: 'approve-spaces', component: ApproveSpacesComponent },
  { path: 'approve-cash-out', component: ApproveCashOutComponent },
  { path: 'all-users', component: AllUsersComponent },
  { path: 'all-spaces', component: AllSpacesComponent },
  { path: 'all-areas', component: AllAreasComponent },
  { path: 'all-cities', component: AllCitiesComponent }
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
    SelectAreaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
