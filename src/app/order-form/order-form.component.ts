import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OrderFormData, OrderItemFormData } from '../order-form-data';
import { PickupsService, ProductsService, Order, Product } from 'api-generated';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  public orderFormData: OrderFormData
  public loading = true
  public pickupId: string
  public orderId: string
  public products: Array<Product>
  public error: string = null

  constructor(private authService: AuthService, private productsService: ProductsService, private pickupsService: PickupsService, private router: Router, private route: ActivatedRoute) { }

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
          this.pickupsService.apiV1PickupsPickupIDOrdersOrderIDGet(this.pickupId, this.orderId).subscribe(
            (order: Order) => {
              this.orderFormData.overwriteWith(order)
              this.loading = false
            },
            (error) => {
              this.error = "Oops... something went wrong"
              console.error(error.message)
            })
        } else {
          this.orderFormData.eater = this.authService.user.displayName
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
      this.pickupsService.apiV1PickupsPickupIDOrdersPost(this.pickupId, order).subscribe(
        () => {
          this.router.navigate(['/pickups', this.pickupId])
        },
        (error) => {
          this.error = "Oops... something went wrong :("
          console.error(error.message)
        })

    } else {
      this.pickupsService.apiV1PickupsPickupIDOrdersOrderIDPut(this.pickupId, this.orderId, order).subscribe(
        () => {
          this.router.navigate(['/pickups', this.pickupId])
        },
        (error) => {
          this.error = "Oops... something went wrong :("
          console.error(error.message)
        })
    }
  }
}
