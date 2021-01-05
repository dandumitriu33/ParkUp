import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Area } from '../models/Area';
import { ParkingSpace } from '../models/ParkingSpace';

@Injectable({
  providedIn: 'root'
})
export class ParkingSpacesService {
  private parkingSpacesForAreaUrl = 'https://localhost:44315/api/parkingspaces/';
  private allOwnerParkingSpacesUrl = 'https://localhost:44315/api/owners/all-spaces/';

  // TEMPORARY user id
  userId = '19a0694b-57eb-4b0a-aca4-86d71e389d0f';

  constructor(private http: HttpClient) { }

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
