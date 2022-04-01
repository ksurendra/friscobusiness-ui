import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Business } from '../models/business';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  allBusinessesUrl = 'http://localhost:9090/fb/data/fetch-all';

  constructor(public http: HttpClient) { }

  businessesList(): Observable<Business[]> {
		const url = `${this.allBusinessesUrl}/`;
		return this.http
			.get(url)
			.pipe(
			map((data: any) =>
				data.map(
					(item: any) =>
						new Business(item.businessName,
									item.businessTagline
									)
					)
				)
			);
	}
}
