import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { State } from './components/State';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // Define API
  apiURL = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';
  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    }),
  };

  getStates(): Observable<State> {
    return this.http.get<State>(this.apiURL);
  }
}
