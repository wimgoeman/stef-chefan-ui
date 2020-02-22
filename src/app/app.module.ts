import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { ApiModule } from '../../api-generated/api.module';
import { AppComponent } from './app.component';
import { PickupFormComponent } from './pickup-form/pickup-form.component';
import { MomentDateAdapter } from './moment-date-adapter';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { Configuration, ProductsService, PickupsService } from 'api-generated';
import { OrderFormComponent } from './order-form/order-form.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { PickupDetailsComponent } from './pickup-details/pickup-details.component';


@NgModule({
  declarations: [
    AppComponent,
    PickupFormComponent,
    HomeComponent,
    OrderFormComponent,
    LoginComponent,
    PickupDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    ApiModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
    ],
  providers: [
    AngularFireAuthGuard,
    {
      provide: NgbDateAdapter,
      useClass: MomentDateAdapter
    },
    {
      provide: PickupsService,
      useFactory: (httpClient: HttpClient) => new PickupsService(httpClient, environment.apiUrl, null),
      deps: [HttpClient]
    },
    {
      provide: ProductsService,
      useFactory: (httpClient: HttpClient) => new ProductsService(httpClient, environment.apiUrl, null),
      deps: [HttpClient]
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
