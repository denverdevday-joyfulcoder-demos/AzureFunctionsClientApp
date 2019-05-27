import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CalculationComponent } from './calculation/calculation.component';
import { RatingComponent } from './rating/rating.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'rating', component: RatingComponent, canActivate: [AuthenticationGuard] },
  { path: 'calculation', component: CalculationComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
