import { Component, OnInit } from '@angular/core';
import { Pickup } from '../pickup';
import * as moment from 'moment';

@Component({
  selector: 'app-pickup-form',
  templateUrl: './pickup-form.component.html',
  styleUrls: ['./pickup-form.component.scss']
})
export class PickupFormComponent {

  pickup: Pickup;
  //orders: Order[];
  submitted = false

  constructor() { 
    this.pickup = new Pickup();
    this.pickup.date = moment()
    this.pickup.id = '123456-egwguh'
    this.pickup.picker = 'Michael Jackson'
    this.pickup.status = 0
  }

  onSubmit() {
    this.submitted = true
  }
}
