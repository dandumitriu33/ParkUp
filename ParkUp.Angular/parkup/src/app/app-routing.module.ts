import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'user', component: UserComponent,
    children: [
      {path: 'registration', component: RegistrationComponent}
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // TODO replace with error page
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
