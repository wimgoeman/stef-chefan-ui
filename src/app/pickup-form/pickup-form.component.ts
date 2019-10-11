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
  @Input() private pickupFormData: PickupFormData;
  private submitted: boolean

  constructor(private defaultService: DefaultService) { 
  }

  onSave() {
    const pickup : Pickup = {
      date: this.pickupFormData.date.toISOString(),
      picker: this.pickupFormData.picker,
    }
    this.defaultService.apiV1PickupsPost(pickup, 'body').subscribe({
      next: (pickup) => this.processSaveResult(pickup)
    });
  }

  processSaveResult(pickup: Pickup) {
    this.pickupFormData.overwriteWith(pickup)
    this.submitted = true
  }

  ngOnInit(): void {
    this.submitted = false
  }
}
