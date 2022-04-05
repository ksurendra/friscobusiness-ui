import { Component, OnInit } from '@angular/core';
import { from, throwError, Subject } from 'rxjs';
import { map, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BusinessService } from 'src/app/services/business.service';
import { Business } from 'src/app/models/business';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  businesses: Business[] = [];

  constructor(public businessService: BusinessService) { }

  ngOnInit() {
    console.log('...Calling Business Service:');

    this.getAllBusinesses();
  }

  public getAllBusinesses() {
    this.businessService.getBusinesses().subscribe((businesses: Business[]) => {
			this.businesses = businesses;

      console.log(this.businesses);

			// Set for pagination
			//this.model.pageLength = 10;
			//this.model.totalDataLength = this.filteredPapersForPagination.length;
			//this.selectPage(1);
		});
  }

}
