import { Component, OnInit } from '@angular/core';
import { DefaultService, Pickup } from 'api-generated';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private todaysPickup: Pickup = null;

  constructor(private defaultService: DefaultService) { }

  ngOnInit() {
    this.defaultService.apiV1PickupsGet('body').subscribe({
      next: pickups => {
        console.log(`Got pickups: ${pickups}`)
        for (const pickup of pickups) {
          if (moment(pickup.date).isSame(moment(), 'day')) {
            this.todaysPickup = pickup;
          }
        }
      },
      error: err => console.error(err)
    })
  }

}
