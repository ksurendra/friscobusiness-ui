import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Business } from '../models/business';
import { Category } from '../models/category';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class BusinessService {
  allBusinessesUrl = 'http://localhost:9090/fb/data/get-all-businesses';
  findBusinessByIdUrl = 'http://localhost:9090/fb/data/find-business-by-id';
  findBusinessesUrl = 'http://localhost:9090/fb/data/find-business';
  allCategoriesUrl = 'http://localhost:9090/fb/data/get-all-categories';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  businesses: Business[] = [];

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  /** Get Businesses from server
   * "category" param is optional.
  */
  getBusinesses(category: string): Observable<Business[]> {
    const url = `${this.allBusinessesUrl}`;
    console.log('category='+category);

    const params = new HttpParams().set('category', category);
		params.append('category', category);

    return this.http
      .get<Business[]>(url, {params: params})
      .pipe(
        tap(_ => this.log('fetched businesses')),
        catchError(this.handleError<Business[]>('getBusinesses', []))
      );
  }

  /** Get Businesses from server */
  getBusiness(id: string): Observable<Business> {
    console.log('get business with id = ' + id);
    const params = new HttpParams().set('businessid', id);
		params.append('businessid', id);
    const url = `${this.findBusinessByIdUrl}`;

    return this.http
      .get<Business>(url, {params: params})
      .pipe(
        tap(_ => this.log(`fetched business id=${id}`)),
        catchError(this.handleError<Business>(`getBusiness id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchBusinesses(term: string): Observable<Business[]> {
    console.log('BusinessService.searchBusinesses:'+term);

    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Business[]>(`${this.findBusinessesUrl}/?businessname=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found businesses matching "${term}"`) :
         this.log(`no businesses matching "${term}"`)),
      catchError(this.handleError<Business[]>('searchBusinesses', []))
    );
  }

  /** Get Businesses from server */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.allCategoriesUrl)
       .pipe(
         tap(_ => this.log('fetched categories')),
         catchError(this.handleError<Category[]>('getCategories', []))
       );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
