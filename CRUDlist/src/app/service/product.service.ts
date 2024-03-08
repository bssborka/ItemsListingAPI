import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../enviroments/enviroment';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  myAppUrl: string;
  myApiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = "";
    this.myApiUrl = 'http://localhost:5243/api/Products/';
   }

   getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
   } 
   getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.myApiUrl + id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}

saveProduct(product:any): Observable<Product> {
    return this.http.post<Product>(this.myApiUrl, JSON.stringify(product), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}

updateProduct(id: number, product:any): Observable<Product> {
    return this.http.put<Product>(this.myApiUrl + id, JSON.stringify(product), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}

deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.myApiUrl + id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}

errorHandler(error:any) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  
  return throwError(errorMessage);
}
}
