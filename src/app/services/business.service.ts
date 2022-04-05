import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Business } from '../models/business';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class BusinessService {

  allBusinessesUrl = 'http://localhost:9090/fb/data/fetch-all';

  findBusinessByIdUrl = 'http://localhost:9090/fb/data/find-business-by-id';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  businesses: Business[] = [];

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  /** Get Businesses from server */
  getBusinesses(): Observable<Business[]> {
    return this.http.get<Business[]>(this.allBusinessesUrl)
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

  /*
  businessesList(): Observable<Business[]> {
		const url = `${this.allBusinessesUrl}/`;
		return this.http
			.get(url)
			.pipe(
			map((data: any) =>
				data.map(
					(item: any) =>
						new Business(data.businessId,
              data.businessName,
              data.businessTagline,
              data.businessAddressLine1,
              data.businessAddressLine2,
              data.businessCity,
              data.businessState,
              data.businessZip,
              data.businessCounty,
              data.businessCountry,
              data.businessPhone1,
              data.businessPhone2,
              data.businessEmail1,
              data.businessEmail2,
              data.businessWebsite,
              data.businessLocation)
					)
				)
			);
	}*/

  /*
  fetchBusiness(pvalue: string): Observable<Business> {
		const params = new HttpParams().set('businessid', pvalue);
		params.append('businessid', pvalue);
		const url = `${this.findBusinessByIdUrl}`;
		return this.http
				.get(url, {params: params})
				.pipe(map((data: any) => new Business(data.businessId,
													data.businessName,
                          data.businessTagline,
                          data.businessAddressLine1,
                          data.businessAddressLine2,
                          data.businessCity,
                          data.businessState,
                          data.businessZip,
                          data.businessCounty,
                          data.businessCountry,
                          data.businessPhone1,
                          data.businessPhone2,
                          data.businessEmail1,
                          data.businessEmail2,
                          data.businessWebsite,
                          data.businessLocation,
													)));
	}*/

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
