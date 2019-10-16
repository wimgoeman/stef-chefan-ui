import { Component, OnInit, Input } from '@angular/core';
import { PickupFormData } from '../pickup-form-data';
import * as moment from 'moment';
import { Pickup, PickupsService } from 'api-generated';
import { OrderFormData } from '../order-form-data';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-pickup-form',
  templateUrl: './pickup-form.component.html',
  styleUrls: ['./pickup-form.component.scss']
})
export class PickupFormComponent implements OnInit {
  public pickupFormData: PickupFormData
  public loading = true
  public creating: boolean
  public ordersFormData: Array<OrderFormData> = []
  public error: string = null

  constructor(private pickupsService: PickupsService, private router: Router, private route: ActivatedRoute) {
  }

  onSave() {
    const pickup: Pickup = {
      date: this.pickupFormData.date.toISOString(),
      picker: this.pickupFormData.picker,
    }
    this.pickupsService.apiV1PickupsPost(pickup, 'body').subscribe(
      (pickup) => {
        this.pickupFormData.overwriteWith(pickup)
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.error(error.message)
        this.error = "Oops... something went wrong :("      
      }
    );
  }

  onClickRow(orderFormData: OrderFormData) {
    this.router.navigate(['/pickups', this.pickupFormData.id, 'orders', orderFormData.id])
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
        this.pickupsService.apiV1PickupsPickupIDGet(id).subscribe(
          (pickup: Pickup) => {
            this.pickupFormData = new PickupFormData()
            this.pickupFormData.overwriteWith(pickup)
            this.pickupsService.apiV1PickupsPickupIDOrdersGet(this.pickupFormData.id).subscribe((orders) => {
              for (const order of orders) {
                const orderFormData = new OrderFormData()
                orderFormData.overwriteWith(order)
                this.ordersFormData.push(orderFormData);
              }
              this.loading = false
            },
            (error) => {
              console.error(error.message)
              this.error = "Oops... something went wrong :("
            })
          },
          (error) => {
            console.error(error.message)
            this.error = "Oops... something went wrong :("
          })
      }
    })
  }
}
