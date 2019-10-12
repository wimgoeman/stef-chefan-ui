import { Component, OnInit } from '@angular/core';
import { DefaultService, Pickup } from 'api-generated';
import * as moment from 'moment';
import { PickupFormData } from '../pickup-form-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private defaultService: DefaultService, private router: Router) { }

  ngOnInit() {
    this.defaultService.apiV1PickupsGet().subscribe({
      next: pickups => {
        console.log(`Got pickups: ${pickups}`)
        for (const pickup of pickups) {
          if (moment(pickup.date).isSame(moment(), 'day') && pickup.id) {
            this.router.navigate(['/pickups', pickup.id])
          }
        }
      },
      error: err => console.error(err)
    })
  }

  onCreate() {
    this.router.navigate(['/pickups', 'new'])
  }

}
