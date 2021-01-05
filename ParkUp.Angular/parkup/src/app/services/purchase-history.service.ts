import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { CreditPackPurchase } from '../models/CreditPackPurchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryService {
  private purchaseHistoryUrl = 'https://localhost:44315/api/users/purchase-history/';
  // TEMPORARY hardcoded user ID
  private userId = '19a0694b-57eb-4b0a-aca4-86d71e389d0f';

  constructor(private http: HttpClient) { }

  getPurchaseHistory(): Observable<CreditPackPurchase[]> {
    return this.http.get<CreditPackPurchase[]>(this.purchaseHistoryUrl + this.userId).pipe(
      tap(data => console.log('No of purchases: ' + data.length)),
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
