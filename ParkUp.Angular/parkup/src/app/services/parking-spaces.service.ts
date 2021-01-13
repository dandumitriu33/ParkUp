import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ParkingSpace } from '../models/ParkingSpace';
import { ParkingSpaceRental } from '../models/ParkingSpaceRental';
import { TakenParkingSpace } from '../models/TakenParkingSpace';
import { ParkingSpaceApproval } from '../models/ParkingSpaceApproval';
import { ForceFreeParkingSpace } from '../models/ForceFreeParkingSpace';

@Injectable({
  providedIn: 'root'
})
export class ParkingSpacesService {
  private baseUrl = `https://localhost:44315/api/`;
  private parkingSpacesForAreaUrl = this.baseUrl + `parkingspaces/`;
  private allOwnerParkingSpacesUrl = this.baseUrl + `owners/all-spaces/`;
  private allOwnerTransactionsUrl = this.baseUrl + `owners/all-transactions/`;
  private allUnapprovedParkingSpacesUrl = this.baseUrl + `parkingspaces/unapproved`;
  private newParkingSpaceUrl = this.baseUrl + `parkingspaces/add-new-parking-space`;
  private removeParkingSpaceUrl = this.baseUrl + `parkingspaces/remove-parking-space/`;
  private getSingleParkingSpaceUrl = this.baseUrl + `parkingspaces/get-single-parking-space/`;
  private editParkingSpaceUrl = this.baseUrl + `parkingspaces/edit-parking-space`;
  private getNearbyParkingSpacesUrl = this.baseUrl + `parkingspaces/nearby/`;
  private takeParkingSpaceUrl = this.baseUrl + `parkingspaces/take`;
  private leaveParkingSpaceUrl = this.baseUrl + `parkingspaces/leave`;
  private takenParkingSpacesUrl = this.baseUrl + `parkingspaces/`;
  private approveParkingSpaceUrl = this.baseUrl + `parkingspaces/approve`;
  private forceFreeParkingSpaceUrl = this.baseUrl + `parkingspaces/force-free`;

  constructor(private http: HttpClient) { }

  approveParkingSpace(parkingSpaceApproval: ParkingSpaceApproval) {
    return this.http.post(this.approveParkingSpaceUrl, parkingSpaceApproval);
  }

  getNearbyParkingSpaces(latitude: string, longitude: string) {
    return this.http.get<ParkingSpace[]>(this.getNearbyParkingSpacesUrl + `${latitude}/${longitude}`).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }

  getTakenParkingSpaces(userId: string) {
    return this.http.get<ParkingSpace[]>(this.takenParkingSpacesUrl + userId).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }

  takeParkingSpace(takenParkingSpace: TakenParkingSpace) {
    return this.http.post(this.takeParkingSpaceUrl, takenParkingSpace);
  }

  leaveParkingSpace(takenParkingSpace: TakenParkingSpace) {
    return this.http.post(this.leaveParkingSpaceUrl, takenParkingSpace);
  }

  forceFreeParkingSpace(forceFreeParkingSpaceDTO: ForceFreeParkingSpace) {
    return this.http.post(this.forceFreeParkingSpaceUrl, forceFreeParkingSpaceDTO);
  }

  addNewParkingSpace(newParkingSpace: ParkingSpace) {
    return this.http.post(this.newParkingSpaceUrl, newParkingSpace);
  }

  editParkingSpace(editedParkingSpace: ParkingSpace) {
    return this.http.post(this.editParkingSpaceUrl, editedParkingSpace);
  }

  removeParkingSpace(parkingSpaceId: string) {
    return this.http.post(this.removeParkingSpaceUrl + `${parkingSpaceId}`, {});
  }

  getParkingSpaceById(parkingSpaceId: string) {
    return this.http.get<ParkingSpace>(this.getSingleParkingSpaceUrl + `${parkingSpaceId}`).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }

  getAllUnapprovedParkingSpaces(): Observable<ParkingSpace[]> {
    return this.http.get<ParkingSpace[]>(this.allUnapprovedParkingSpacesUrl).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }

  getAllOwnerTransactions(userId: string): Observable<ParkingSpaceRental[]> {
    return this.http.get<ParkingSpaceRental[]>(this.allOwnerTransactionsUrl + userId).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }

  getAllOwnerParkingSpaces(userId: string): Observable<ParkingSpace[]> {
    return this.http.get<ParkingSpace[]>(this.allOwnerParkingSpacesUrl + userId).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }

  getAllParkingSpacesForArea(areaId: string): Observable<ParkingSpace[]> {
    return this.http.get<ParkingSpace[]>(this.parkingSpacesForAreaUrl + areaId + '/search/').pipe(
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
