import { Component, OnInit, Input } from '@angular/core';
import { PickupFormData } from '../pickup-form-data';
import * as moment from 'moment';
import { DefaultService, Pickup } from 'api-generated';

@Component({
  selector: 'app-pickup-form',
  templateUrl: './pickup-form.component.html',
  styleUrls: ['./pickup-form.component.scss']
})
export class PickupFormComponent implements OnInit {

  @Input() apiPickup: Pickup;
  private pickup: PickupFormData;
  private submitted = false

  constructor() { 
  }

  onSubmit() {
    this.submitted = true
  }

  ngOnInit(): void {
    this.pickup = new PickupFormData();
    if (this.apiPickup != null) {
      this.pickup.date = moment(this.apiPickup.date)
      this.pickup.picker = this.apiPickup.picker
      this.pickup.status = this.apiPickup.status
    }
  }
}
