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

  constructor(private http: HttpClient) { }

  getAllParkingSpacesForArea(areaId: string): Observable<ParkingSpace[]> {
    return this.http.get<ParkingSpace[]>(this.parkingSpacesForAreaUrl + areaId + '/search/').pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
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
