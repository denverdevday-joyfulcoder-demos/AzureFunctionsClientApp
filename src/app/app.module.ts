import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MsAdalAngular6Module, AuthenticationGuard } from 'microsoft-adal-angular6';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RatingComponent } from './rating/rating.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { environment } from 'src/environments/environment';
import { InsertAuthTokenInterceptor } from './services/insert-auth-token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MsAdalAngular6Module.forRoot({
      tenant: environment.adalConfig.tenant,
      clientId: environment.adalConfig.clientId,
      redirectUri: window.location.origin,
      endpoints: {
        api: environment.adalConfig.clientId
      },
      navigateToLoginRequestUrl: true,
      cacheLocation: 'localStorage'
    })
  ],
  providers: [
    AuthenticationGuard,
    { provide: HTTP_INTERCEPTORS, useClass: InsertAuthTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
