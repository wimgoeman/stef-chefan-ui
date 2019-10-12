import { Component, OnInit, Input } from '@angular/core';
import { PickupFormData } from '../pickup-form-data';
import * as moment from 'moment';
import { DefaultService, Pickup } from 'api-generated';
import { OrderFormData } from '../order-form-data';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-pickup-form',
  templateUrl: './pickup-form.component.html',
  styleUrls: ['./pickup-form.component.scss']
})
export class PickupFormComponent implements OnInit {
  private pickupFormData: PickupFormData
  private loading = true
  private creating: boolean
  private ordersFormData: Array<OrderFormData>

  constructor(private defaultService: DefaultService, private router: Router, private route: ActivatedRoute) {
  }

  onSave() {
    const pickup: Pickup = {
      date: this.pickupFormData.date.toISOString(),
      picker: this.pickupFormData.picker,
    }
    this.defaultService.apiV1PickupsPost(pickup, 'body').subscribe(
      (pickup) => {
        this.pickupFormData.overwriteWith(pickup)
        this.router.navigateByUrl('/');
      }
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get("id")
      if (id == 'new') {
        this.creating = true;
        this.pickupFormData = new PickupFormData()
        this.loading = false
      } else {
        this.creating = false;
        this.defaultService.apiV1PickupsGet('body').subscribe((pickups: Array<Pickup>) => {
          for (const pickup of pickups) {
            if (pickup.id != id) continue;

            this.pickupFormData = new PickupFormData()
            this.pickupFormData.overwriteWith(pickup)

            this.defaultService.apiV1PickupsPickupIDOrdersGet(this.pickupFormData.id).subscribe((orders) => {
              for (const order of orders) {
                const orderFormData = new OrderFormData()
                orderFormData.overwriteWith(order)
                this.ordersFormData.push(orderFormData);
              }
              this.loading = false
            })
          }
        })
      }
    })
  }
}
