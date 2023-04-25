import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Business } from '../models/business';
import { Category } from '../models/category';
import { MessageService } from './message.service';

const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json' ,
    'Access-Control-Allow-Origin': '*' 
  })
};

const allBusinessesUrl = 'http://localhost:8080/friscobusiness/business/all';
const findBusinessByIdUrl = 'http://localhost:8080/friscobusiness/business';

//const allBusinessesUrl = 'https://frisco-business.uc.r.appspot.com/friscobusiness/business/all';
//const findBusinessByIdUrl = 'https://frisco-business.uc.r.appspot.com/friscobusiness/business/';
const findBusinessesUrl = 'http://localhost:9090/fb/data/find-business';
const allCategoriesUrl = 'http://localhost:9090/fb/data/get-all-categories';

@Injectable({ providedIn: 'root' })
export class BusinessService {

  businesses: Business[] = [];

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getAllBusinesses(): Observable<Business[]> {
    const url = `${allBusinessesUrl}`;
    
    const httpParams = new HttpParams();
    const options = { params: httpParams, Headers: httpHeaders };

    this.http.get(url, options).subscribe(response => {console.log(response)});
  
    return this.http
      .get<Business[]>(url, options)
      .pipe(
        tap(_ => this.log('..fetched businesses')),
        catchError(this.handleError<Business[]>('getAllBusinesses', []))
      );
  }

  /** Get Businesses from server
   * "category" param is optional.
  */
  getBusinesses(category: string): Observable<Business[]> {
    const url = `${allBusinessesUrl}`;
    console.log('category='+category);

    const httpParams = new HttpParams().set('category', category);
		httpParams.append('category', category);

    const options = { params: httpParams, Headers: httpHeaders };

    return this.http
      .get<Business[]>(url, options)
      .pipe(
        tap(_ => this.log('fetched businesses')),
        catchError(this.handleError<Business[]>('getBusinesses', []))
      );
  }

  /** Get Businesses from server */
  getBusiness(id: string): Observable<Business> {
    console.log('Business Service: get business with id = ' + id);
    const params = new HttpParams();
		params.set('businessid', id);

    //params.append('businessid', id);
    //const url = `${findBusinessByIdUrl}`;
    const url = `${findBusinessByIdUrl}/${params.toString()}`;
    const url2 = `${findBusinessByIdUrl}/${id}`;

    //.get<Business>(url, {params: params})

    return this.http
      .get<Business>(url2)
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
    return this.http.get<Business[]>(`${findBusinessesUrl}/?businessname=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found businesses matching "${term}"`) :
         this.log(`no businesses matching "${term}"`)),
      catchError(this.handleError<Business[]>('searchBusinesses', []))
    );
  }

  /** Get Businesses from server */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(allCategoriesUrl)
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
