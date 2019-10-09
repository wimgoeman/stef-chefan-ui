import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PickupFormComponent } from './pickup-form/pickup-form.component';
import { MomentDateAdapter } from './moment-date-adapter';

@NgModule({
  declarations: [
    AppComponent,
    PickupFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: NgbDateAdapter,
      useClass: MomentDateAdapter
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
