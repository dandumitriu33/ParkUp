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
  private newAreaUrl = `https://localhost:44315/api/areas/add-new-area`;
  private removeAreaUrl = `https://localhost:44315/api/areas/remove-area/`;
  private getSingleAreaUrl = 'https://localhost:44315/api/areas/get-single-area/';
  private editAreaUrl = 'https://localhost:44315/api/areas/edit-area';

  constructor(private http: HttpClient) { }

  removeArea(areaId: number) {
    console.log(`areas service removing area ${areaId}`);
    return this.http.post(this.removeAreaUrl + `${areaId}`, {});
  }

  getAllAreasForCity(cityId: string): Observable<Area[]> {
    return this.http.get<Area[]>(this.areasForCityUrl + cityId).pipe(
      tap(data => console.log('No of Areas: ' + data.length)),
      catchError(this.handleError)
    );
  }

  getAreaById(areaId: string) {
    return this.http.get<Area>(this.getSingleAreaUrl + `${areaId}`).pipe(
      tap(data => console.log('Single Area: ' + data.Name)),
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
