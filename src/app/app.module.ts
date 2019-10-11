import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { ApiModule } from '../../api-generated/api.module';
import { AppComponent } from './app.component';
import { PickupFormComponent } from './pickup-form/pickup-form.component';
import { MomentDateAdapter } from './moment-date-adapter';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DefaultService, Configuration } from 'api-generated';

@NgModule({
  declarations: [
    AppComponent,
    PickupFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    ApiModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: NgbDateAdapter,
      useClass: MomentDateAdapter
    },
    {
      provide: DefaultService,
      useFactory: (httpClient: HttpClient) => new DefaultService(httpClient, "http://localhost:8080", new Configuration({})),
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
