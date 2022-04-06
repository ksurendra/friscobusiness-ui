import { Component, OnInit } from '@angular/core';
import { from, throwError, Subject } from 'rxjs';
import { map, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
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
  category: string = "";

  constructor(private route: ActivatedRoute,
    public businessService: BusinessService) { }

  ngOnInit() {
    console.log(this.route.queryParams);
    this.route.params.forEach((params: Params) => {
			console.log(params);
			if (params['category'] !== undefined) {
        this.category = params['category'];
				console.log('..fetching data for category=', );
			} else {
				console.log('..error - param');
			}
		});

    this.getAllBusinesses();
    this.getAllCategories();
  }

  public getAllBusinesses() {
    this.businessService.getBusinesses(this.category).subscribe((businesses: Business[]) => {
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
