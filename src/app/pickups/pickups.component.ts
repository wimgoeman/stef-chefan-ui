import { Component, OnInit } from '@angular/core';
import { Pickup } from '../pickup';
import * as moment from 'moment';

@Component({
  selector: 'app-pickups',
  templateUrl: './pickups.component.html',
  styleUrls: ['./pickups.component.scss']
})
export class PickupsComponent implements OnInit {

  pickup: Pickup = {
    id: '123456789',
    picker: 'Michael Jackson',
    date: moment(),
    status: 0
  }

  constructor() { }

  ngOnInit() {
  }

}
