import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Area } from '../models/Area';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  private baseUrl = 'https://localhost:44315/api/';
  private areasForCityUrl = this.baseUrl + `areas/`;
  private newAreaUrl = this.baseUrl + `areas/add-new-area`;
  private removeAreaUrl = this.baseUrl + `areas/remove-area/`;
  private getSingleAreaUrl = this.baseUrl + `areas/get-single-area/`;
  private editAreaUrl = this.baseUrl + `areas/edit-area`;

  constructor(private http: HttpClient) { }

  removeArea(areaId: number) {
    return this.http.post(this.removeAreaUrl + `${areaId}`, {});
  }

  getAllAreasForCity(cityId: string): Observable<Area[]> {
    return this.http.get<Area[]>(this.areasForCityUrl + cityId).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }

  getAreaById(areaId: string) {
    return this.http.get<Area>(this.getSingleAreaUrl + `${areaId}`).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }

  editArea(editedArea: Area) {
    return this.http.post(this.editAreaUrl, editedArea);
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

  postNewArea(payload: Area) {
    return this.http.post(this.newAreaUrl, payload);
  }

}
