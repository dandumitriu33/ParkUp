import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ParkUp';

  constructor(private router: Router) { }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']) 
  }

  currentUserExists(): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    }
    return false;
  }

  currentUserSuperAdmin(): boolean {
    try {
      if (localStorage.getItem('token') != null) {
        var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        var userRole = payload.role;
        if (userRole === "SuperAdmin") {
          return true;
        }
        return false;
      }
    } catch (e) {
      console.log(e);
    }    
  }

  currentUserAdminOrSuperAdmin(): boolean {
    try {
      if (localStorage.getItem('token') != null) {
        var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        var userRole = payload.role;
        if (userRole === "Admin" || userRole === "SuperAdmin") {
          return true;
        }
        return false;
      }
    } catch (e) {
      console.log(e);
    }   
  }
}
