import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Area } from '../models/Area';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  private areasForCityUrl = `https://localhost:44315/api/areas/`;

  constructor(private http: HttpClient) { }

  getAllAreasForCity(cityId: string): Observable<Area[]> {
    return this.http.get<Area[]>(this.areasForCityUrl + cityId).pipe(
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
