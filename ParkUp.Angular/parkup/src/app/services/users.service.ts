import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { CreditPackPurchase } from '../models/CreditPackPurchase';
import { ParkingSpaceRental } from '../models/ParkingSpaceRental';
import { ApplicationUser } from '../models/ApplicationUser';
import { CashOut } from '../models/CashOut';
import { ApplicationRole } from '../models/ApplicationRole';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditPack } from '../models/CreditPack';
import { CashOutRequest } from '../models/CashOutRequest';
import { CashOutApproval } from '../models/CashOutApproval';
import { ModifyRole } from '../models/ModifyRole';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = `https://localhost:44315/api/`;
  private purchaseHistoryUrl = this.baseUrl + `users/purchase-history/`;
  private rentalHistoryUrl = this.baseUrl + `users/rental-history/`;
  private allUsersUrl = this.baseUrl + `users/all-users`;
  private allUnapprovedCashOutsUrl = this.baseUrl + `owners/all-unapproved-cash-outs`;
  private allRolesUrl = this.baseUrl + `admins/all-roles`;
  private registrationUrl = this.baseUrl + `users/register`;
  private loginUrl = this.baseUrl + `users/login`;
  private userProfileUrl = this.baseUrl + `userProfile`;
  private buyCreditsUrl = this.baseUrl + `users/buy-credits`;
  private cashOutRequestUrl = this.baseUrl + `owners/request-cash-out`;
  private cashAllApprovedOutsForUserUrl = this.baseUrl + `owners/get-all-approved-cash-outs-for-user/`;
  private addNewRoleUrl = this.baseUrl + `admins/add-new-role`;
  private getUserInfoForAdminUrl = this.baseUrl + `admins/get-user-info/`;
  private approveCashOutUrl = this.baseUrl + `admins/approve-cash-out`;
  private searchUsersUrl = this.baseUrl + `users/search/`;
  private addToRoleUrl = this.baseUrl + `admins/add-to-role`;
  private removeFromRoleUrl = this.baseUrl + `admins/remove-from-role`;
  

  // FOR username update on navbar after login - CAN ALSO be used for CREDITS UPDATE after buy/leave!!!!!!!!
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder) { }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payload.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  searchUsers(searchPhrase: string): Observable<ApplicationUser[]> {
    return this.http.get<ApplicationUser[]>(this.searchUsersUrl + searchPhrase).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }

  approveCashOut(cashOutApproval: CashOutApproval) {
    return this.http.post(this.approveCashOutUrl, cashOutApproval);
  }

  addToRole(modifyRole: ModifyRole) {
    return this.http.post(this.addToRoleUrl, modifyRole);
  }

  removeFromRole(modifyRole: ModifyRole) {
    return this.http.post(this.removeFromRoleUrl, modifyRole);
  }

  getUserInfoForAdmin(userId: string) {
    return this.http.get<ApplicationUser>(this.getUserInfoForAdminUrl + `${userId}`).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }

  addRole(newRole: ApplicationRole) {
    return this.http.post(this.addNewRoleUrl, newRole);
  }

  requestCashOut(payload: CashOutRequest) {
    return this.http.post(this.cashOutRequestUrl, payload);
  }

  buyCredits(payload: CreditPack) {
    return this.http.post(this.buyCreditsUrl, payload);
  }

  getUserProfile() {
    // see auth.interceptor.ts for enterprise - multiple router w/ auth - this is the manual way for small apps
    // var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    // return this.http.get(this.userProfileUrl, { headers: tokenHeader });

    return this.http.get(this.userProfileUrl);
  }

  // LOGIN VIA API
  login(formData) {
    return this.http.post(this.loginUrl, formData);
  }
  // LOGIN VIA API END
  
  // REGISTRATION VIA API
  registrationPasswordsFormModel = this.formBuilder.group({
    // the minlength is not set up on the backend at this time (development of MVP)
    // the rule is here just for Angular validation testing purposes
    Password: ['', [Validators.required, Validators.minLength(3)]],
    ConfirmPassword: ['', Validators.required]
  }, {
    validator: this.comparePasswords
  });

  registrationFormModel = this.formBuilder.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    Passwords: this.registrationPasswordsFormModel    
  });

  comparePasswords(formBuilder: FormGroup) {
    let confirmPasswordControl = formBuilder.get('ConfirmPassword');
    // passwordMismatch - is an error that we create (custom)
    // confirmPasswordControl.errors=null
    // or if there are errors such as required confirmPasswordControl.errors={required:true}
    // or if there are errors such as passwordMismatch confirmPasswordControl.errors={passwordMismatch:true}
    if (confirmPasswordControl.errors == null || 'passwordMismatch' in confirmPasswordControl.errors) {
      if (formBuilder.get('Password').value != confirmPasswordControl.value)
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      else
        confirmPasswordControl.setErrors(null);
    }
  }

  register() {
    var body = {
      FirstName: this.registrationFormModel.value.FirstName,
      LastName: this.registrationFormModel.value.LastName,
      Email: this.registrationFormModel.value.Email,
      Password: this.registrationFormModel.value.Passwords.Password,
    };
    return this.http.post(this.registrationUrl, body);
  }
  // REGISTRATION VIA API END

  getAllRoles(): Observable<ApplicationRole[]> {
    return this.http.get<ApplicationRole[]>(this.allRolesUrl).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }

  getAllUnapprovedCashOuts(): Observable<CashOut[]> {
    return this.http.get<CashOut[]>(this.allUnapprovedCashOutsUrl).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }

  getAllApprovedCashOutsForUser(userId: string): Observable<CashOut[]> {
    return this.http.get<CashOut[]>(this.cashAllApprovedOutsForUserUrl + `${userId}`).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }

  getAllUsers(): Observable<ApplicationUser[]> {
    return this.http.get<ApplicationUser[]>(this.allUsersUrl).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }

  getPurchaseHistory(userId: string): Observable<CreditPackPurchase[]> {
    return this.http.get<CreditPackPurchase[]>(this.purchaseHistoryUrl + userId).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }

  getRentalHistory(userId: string): Observable<ParkingSpaceRental[]> {
    return this.http.get<ParkingSpaceRental[]>(this.rentalHistoryUrl + userId).pipe(
      tap(data => console.log()),
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
