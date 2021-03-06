import { Component, OnInit } from '@angular/core';
import { Pickup } from 'api-generated';
import * as moment from 'moment';
import { PickupFormData } from '../pickup-form-data';
import { Router } from '@angular/router';
import { PickupsService } from 'api-generated/api/pickups.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public error: string = null

  constructor(private pickupsService: PickupsService, private router: Router) { }

  ngOnInit() {
    this.pickupsService.apiV1PickupsGet().subscribe({
      next: pickups => {
        for (const pickup of pickups) {
          if (moment(pickup.date).isSame(moment(), 'day') && pickup.id) {
            this.router.navigate(['/pickups', pickup.id])
          }
        }
      },
      error: err => {
        console.error(err.message)
        this.error = "Oops... something went wrong :("
      }
    })
  }

  onCreate() {
    this.router.navigate(['/pickups', 'new'])
  }

}
