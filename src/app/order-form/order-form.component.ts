import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OrderFormData } from '../order-form-data';
import { DefaultService, Order } from 'api-generated';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  private orderFormData: OrderFormData
  private loading = true
  private pickupId: string
  private orderId: string

  constructor(private defaultService: DefaultService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.pickupId = paramMap.get("pickupId")
      this.orderId = paramMap.get("orderId")
      this.orderFormData = new OrderFormData()
      if (this.orderId != 'new') {
        this.defaultService.apiV1PickupsPickupIDOrdersGet(this.pickupId).subscribe((orders: Array<Order>) => {
          const order = orders.find((order) => order.id == this.orderId)
          if (order) {
            this.orderFormData.overwriteWith(order)
          }
          this.loading = false
        })
      } else {
        this.loading = false
      }
    })
  }

  onSave() {
    const order : Order = {
      id: this.orderId || null,
      eater: this.orderFormData.eater,
      items: []
    }
    this.defaultService.apiV1PickupsPickupIDOrdersPost(this.pickupId, order).subscribe(() => {
      this.router.navigate(['/pickups', this.pickupId])
    })
  }
}
