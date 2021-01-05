import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { CreditPackPurchase } from '../models/CreditPackPurchase';
import { ParkingSpaceRental } from '../models/ParkingSpaceRental';
import { ApplicationUser } from '../models/ApplicationUser';
import { CashOut } from '../models/CashOut';
import { ApplicationRole } from '../models/ApplicationRole';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private purchaseHistoryUrl = 'https://localhost:44315/api/users/purchase-history/';
  private rentalHistoryUrl = 'https://localhost:44315/api/users/rental-history/';
  private allUsersUrl = 'https://localhost:44315/api/users/all-users';
  private allUnapprovedCashOutsUrl = 'https://localhost:44315/api/owners/all-unapproved-cash-outs';
  private allRolesUrl = 'https://localhost:44315/api/admins/all-roles';
  // TEMPORARY hardcoded user ID
  private userId = '19a0694b-57eb-4b0a-aca4-86d71e389d0f';

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<ApplicationRole[]> {
    return this.http.get<ApplicationRole[]>(this.allRolesUrl).pipe(
      tap(data => console.log('No of Roles: ' + data.length)),
      catchError(this.handleError)
    );
  }

  getAllUnapprovedCashOuts(): Observable<CashOut[]> {
    return this.http.get<CashOut[]>(this.allUnapprovedCashOutsUrl).pipe(
      tap(data => console.log('No of UACashOuts: ' + data.length)),
      catchError(this.handleError)
    );
  }

  getAllUsers(): Observable<ApplicationUser[]> {
    return this.http.get<ApplicationUser[]>(this.allUsersUrl).pipe(
      tap(data => console.log('No of users: ' + data.length)),
      catchError(this.handleError)
    );
  }

  getPurchaseHistory(): Observable<CreditPackPurchase[]> {
    return this.http.get<CreditPackPurchase[]>(this.purchaseHistoryUrl + this.userId).pipe(
      tap(data => console.log('No of purchases: ' + data.length)),
      catchError(this.handleError)
    );
  }

  getRentalHistory(): Observable<ParkingSpaceRental[]> {
    return this.http.get<ParkingSpaceRental[]>(this.rentalHistoryUrl + this.userId).pipe(
      tap(data => console.log('No of rentals: ' + data.length)),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


}
