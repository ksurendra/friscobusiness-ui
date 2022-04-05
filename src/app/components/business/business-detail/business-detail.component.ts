import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BusinessService } from 'src/app/services/business.service';
import { Business } from 'src/app/models/business';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {
  businessId: string = "";
  fetchedBusiness: Business | undefined;

  constructor(private route: ActivatedRoute,
    public businessService: BusinessService) { }

  ngOnInit(): void {
    console.log(this.route.queryParams);
    this.route.params.forEach((params: Params) => {
			console.log(params);
			if (params['id'] !== undefined) {
				this.businessId = params['id'];
				console.log('..fetching data for businessId=', this.businessId);
			} else {
				console.log('..error - param');
			}
		});

		this.fetchBusiness();
  }

  fetchBusiness() {
	  this.businessService.getBusiness(this.businessId).subscribe((business: Business) => {
			this.fetchedBusiness = business;
		});
	}

}
