import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ParkingSpace } from '../models/ParkingSpace';
import { ParkingSpaceRental } from '../models/ParkingSpaceRental';
import { TakenParkingSpace } from '../models/TakenParkingSpace';
import { ParkingSpaceApproval } from '../models/ParkingSpaceApproval';

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
  private editParkingSpaceUrl = 'https://localhost:44315/api/parkingspaces/edit-parking-space';
  private getNearbyParkingSpacesUrl = 'https://localhost:44315/api/parkingspaces/nearby/';
  private takeParkingSpaceUrl = 'https://localhost:44315/api/parkingspaces/take';
  private leaveParkingSpaceUrl = 'https://localhost:44315/api/parkingspaces/leave';
  private takenParkingSpacesUrl = 'https://localhost:44315/api/parkingspaces/';
  private approveParkingSpaceUrl = 'https://localhost:44315/api/parkingspaces/approve';

  constructor(private http: HttpClient) { }

  approveParkingSpace(parkingSpaceApproval: ParkingSpaceApproval) {
    return this.http.post(this.approveParkingSpaceUrl, parkingSpaceApproval);
  }

  getNearbyParkingSpaces(latitude: string, longitude: string) {
    return this.http.get<ParkingSpace[]>(this.getNearbyParkingSpacesUrl + `${latitude}/${longitude}`).pipe(
      tap(data => console.log('No of nearby PS: ' + data.length)),
      catchError(this.handleError)
    );
  }

  getTakenParkingSpaces(userId: string) {
    return this.http.get<ParkingSpace[]>(this.takenParkingSpacesUrl + userId).pipe(
      tap(data => console.log('No of taken PS: ' + data.length)),
      catchError(this.handleError)
    );
  }

  takeParkingSpace(takenParkingSpace: TakenParkingSpace) {
    return this.http.post(this.takeParkingSpaceUrl, takenParkingSpace);
  }

  leaveParkingSpace(takenParkingSpace: TakenParkingSpace) {
    return this.http.post(this.leaveParkingSpaceUrl, takenParkingSpace);
  }

  addNewParkingSpace(newParkingSpace: ParkingSpace) {
    return this.http.post(this.newParkingSpaceUrl, newParkingSpace);
  }

  editParkingSpace(editedParkingSpace: ParkingSpace) {
    return this.http.post(this.editParkingSpaceUrl, editedParkingSpace);
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

  getAllOwnerTransactions(userId: string): Observable<ParkingSpaceRental[]> {
    return this.http.get<ParkingSpaceRental[]>(this.allOwnerTransactionsUrl + userId).pipe(
      tap(data => console.log('No of OWN trs: ' + data.length)),
      catchError(this.handleError)
    );
  }

  getAllOwnerParkingSpaces(userId: string): Observable<ParkingSpace[]> {
    return this.http.get<ParkingSpace[]>(this.allOwnerParkingSpacesUrl + userId).pipe(
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
