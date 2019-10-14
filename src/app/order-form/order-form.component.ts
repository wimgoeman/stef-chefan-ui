import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OrderFormData, OrderItemFormData } from '../order-form-data';
import { PickupsService, ProductsService, Order, Product } from 'api-generated';

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
  private products: Array<Product>

  constructor(private productsService: ProductsService, private pickupsService: PickupsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.pickupId = paramMap.get("pickupId")
      this.orderId = paramMap.get("orderId")

      // Load products
      this.productsService.apiV1ProductsGet().subscribe((products) => {
        this.products = products

        this.orderFormData = new OrderFormData()
        this.orderFormData.addProductEntries(products)
        if (this.orderId != 'new') {
          this.pickupsService.apiV1PickupsPickupIDOrdersOrderIDGet(this.pickupId, this.orderId).subscribe((order: Order) => {
            this.orderFormData.overwriteWith(order)
            this.loading = false
          })
        } else {
          this.loading = false
        }
      })
    })
  }

  onSave() {
    const order: Order = {
      id: this.orderId || null,
      eater: this.orderFormData.eater,
      items: []
    }
    for (const key of this.orderFormData.items.keys()) {
      const orderItemFormData = this.orderFormData.items.get(key)
      if (orderItemFormData.count > 0) {
        order.items.push({
          product: { id: orderItemFormData.productId },
          count: orderItemFormData.count,
          comment: orderItemFormData.comment,
        })
      }
    }
    if (this.orderId == 'new') {
      this.pickupsService.apiV1PickupsPickupIDOrdersPost(this.pickupId, order).subscribe(() => {
        this.router.navigate(['/pickups', this.pickupId])
      })
    } else {
      this.pickupsService.apiV1PickupsPickupIDOrdersOrderIDPut(this.pickupId, this.orderId, order).subscribe(() => {
        this.router.navigate(['/pickups', this.pickupId])
      })
    }
  }
}
