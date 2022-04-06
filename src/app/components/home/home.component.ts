import { Component, OnInit } from '@angular/core';
import { from, throwError, Subject } from 'rxjs';
import { map, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BusinessService } from 'src/app/services/business.service';
import { Business } from 'src/app/models/business';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  businesses: Business[] = [];
  categories: Category[] = [];

  constructor(public businessService: BusinessService) { }

  ngOnInit() {
    this.getAllBusinesses();
    this.getAllCategories();
  }

  public getAllBusinesses() {
    this.businessService.getBusinesses().subscribe((businesses: Business[]) => {
			this.businesses = businesses;

			// Set for pagination
			//this.model.pageLength = 10;
			//this.model.totalDataLength = this.filteredPapersForPagination.length;
			//this.selectPage(1);
		});
  }

  public getAllCategories() {
    this.businessService.getCategories().subscribe((categories: Category[]) => {
			this.categories = categories;

			// Set for pagination
			//this.model.pageLength = 10;
			//this.model.totalDataLength = this.filteredPapersForPagination.length;
			//this.selectPage(1);
		});
  }

}
