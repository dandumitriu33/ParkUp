import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { City } from '../models/City';


@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private allCitiesUrl = 'https://localhost:44315/api/cities';
  private newCityUrl = 'https://localhost:44315/api/cities';
  private deleteCityUrl = 'https://localhost:44315/api/cities';
  private getSingleCityUrl = 'https://localhost:44315/api/cities/get-single-city/';

  constructor(private http: HttpClient) { }

  addCity(newCity: City) {
    return this.http.post(this.newCityUrl, newCity);
  }

  deleteCity(cityId: number) {
    return this.http.delete(this.deleteCityUrl + `/${cityId}`);
  }

  getAllCities():Observable<City[]> {
    return this.http.get<City[]>(this.allCitiesUrl).pipe(
      tap(data => console.log('No of cities: ' + data.length)),
      catchError(this.handleError)
    );
  }

  getCityById(cityId: string) {
    return this.http.get<City>(this.getSingleCityUrl + `${cityId}`).pipe(
      tap(data => console.log('Single City: ' + data.Name)),
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
