import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // Define API
  apiURL = 'http://localhost:3000';
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

  searchById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/Employee/' + id);
  }

  searchByDOB(dob: any, dob1: any): Observable<Employee> {
    let myParams = { DOB_gte: dob, DOB_lte: dob1 };
    let urlParameters = Object.entries(myParams)
      .map((e) => e.join('='))
      .join('&');
    console.log(this.apiURL + '/Employee?' + urlParameters);
    return this.http.get<Employee>(this.apiURL + '/Employee?' + urlParameters);
  }
}
