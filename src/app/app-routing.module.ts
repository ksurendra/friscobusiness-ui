import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BusinessDetailComponent } from './components/business/business-detail/business-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'business-detail', component: BusinessDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
