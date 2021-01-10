import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Area } from '../models/Area';
import { ParkingSpace } from '../models/ParkingSpace';
import { ParkingSpaceRental } from '../models/ParkingSpaceRental';

@Injectable({
  providedIn: 'root'
})
export class ParkingSpacesService {
  private parkingSpacesForAreaUrl = 'https://localhost:44315/api/parkingspaces/';
  private allOwnerParkingSpacesUrl = 'https://localhost:44315/api/owners/all-spaces/';
  private allOwnerTransactionsUrl = 'https://localhost:44315/api/owners/all-transactions/';
  private allUnapprovedParkingSpacesUrl = 'https://localhost:44315/api/parkingspaces/unapproved';
  private newParkingSpaceUrl = 'https://localhost:44315/api/parkingspaces/add-new-parking-space';
  private removeParkingSpaceUrl = 'https://localhost:44315/api/parkingspaces/remove-parking-space/';
  private getSingleParkingSpaceUrl = 'https://localhost:44315/api/parkingspaces/get-single-parking-space/';

  // TEMPORARY user id
  userId = '19a0694b-57eb-4b0a-aca4-86d71e389d0f';

  constructor(private http: HttpClient) { }

  addNewParkingSpace(newParkingSpace: ParkingSpace) {
    return this.http.post(this.newParkingSpaceUrl, newParkingSpace);
  }

  removeParkingSpace(parkingSpaceId: string) {
    console.log(`PS service removing PS ${parkingSpaceId}`);
    return this.http.post(this.removeParkingSpaceUrl + `${parkingSpaceId}`, {});
  }

  getParkingSpaceById(parkingSpaceId: string) {
    return this.http.get<ParkingSpace>(this.getSingleParkingSpaceUrl + `${parkingSpaceId}`).pipe(
      tap(data => console.log('Single PS: ' + data.Name)),
      catchError(this.handleError)
    );
  }

  getAllUnapprovedParkingSpaces(): Observable<ParkingSpace[]> {
    return this.http.get<ParkingSpace[]>(this.allUnapprovedParkingSpacesUrl).pipe(
      tap(data => console.log('No of unapproved PS: ' + data.length)),
      catchError(this.handleError)
    );
  }

  getAllOwnerTransactions(): Observable<ParkingSpaceRental[]> {
    return this.http.get<ParkingSpaceRental[]>(this.allOwnerTransactionsUrl + this.userId).pipe(
      tap(data => console.log('No of OWN trs: ' + data.length)),
      catchError(this.handleError)
    );
  }

  getAllOwnerParkingSpaces(): Observable<ParkingSpace[]> {
    return this.http.get<ParkingSpace[]>(this.allOwnerParkingSpacesUrl + this.userId).pipe(
      tap(data => console.log('No of OWN PS: ' + data.length)),
      catchError(this.handleError)
    );
  }

  getAllParkingSpacesForArea(areaId: string): Observable<ParkingSpace[]> {
    return this.http.get<ParkingSpace[]>(this.parkingSpacesForAreaUrl + areaId + '/search/').pipe(
      tap(data => console.log('No of PS: ' + data.length)),
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
