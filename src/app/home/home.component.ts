import { Component, OnInit } from '@angular/core';
import { DefaultService, Pickup } from 'api-generated';
import * as moment from 'moment';
import { PickupFormData } from '../pickup-form-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private pickupData: PickupFormData = null;

  constructor(private defaultService: DefaultService) { }

  ngOnInit() {
    this.defaultService.apiV1PickupsGet().subscribe({
      next: pickups => {
        console.log(`Got pickups: ${pickups}`)
        for (const pickup of pickups) {
          if (moment(pickup.date).isSame(moment(), 'day')) {
            this.pickupData = new PickupFormData()
            this.pickupData.overwriteWith(pickup)
          }
        }
      },
      error: err => console.error(err)
    })
  }

  onCreate() {
    this.pickupData = new PickupFormData();
  }

}
