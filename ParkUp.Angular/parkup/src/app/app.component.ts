import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ParkUp';
  userDetails;
  isUserLoggedIn: boolean;

  constructor(private router: Router,
              private usersService: UsersService) {
    this.usersService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
      console.log('isUserLoggedIn value changed...');
      this.refreshUserDetails();
      console.log('user details refreshed');
    });
  }

  ngOnInit() {
    this.refreshUserDetails();
  }

  refreshUserDetails() {
    if (localStorage.getItem('token') != null) {
      this.usersService.getUserProfile().subscribe(
        res => {
          this.userDetails = res;
        },
        err => {
          console.log(err);
        }
      );
    }    
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']) 
  }

  currentUserIsSignedIn(): boolean {
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

  currentUserOwnerOrSuperAdmin(): boolean {
    try {
      if (localStorage.getItem('token') != null) {
        var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        var userRole = payload.role;
        if (userRole === "Owner" || userRole === "SuperAdmin") {
          return true;
        }
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
