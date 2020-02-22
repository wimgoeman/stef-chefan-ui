import { Component, OnInit } from '@angular/core';
import { PickupsService, Order } from 'api-generated';
import { ActivatedRoute, ParamMap } from '@angular/router';

class ProductSummaryData {
  public id: String
  public name: String
  public count: number
}
class PickupDetailsData {
  public products: ProductSummaryData[]
}

@Component({
  selector: 'app-pickup-details',
  templateUrl: './pickup-details.component.html',
  styleUrls: ['./pickup-details.component.scss']
})
export class PickupDetailsComponent implements OnInit {
  public pickupDetailsData: PickupDetailsData
  public loading: Boolean = true
  public error: String = null

  constructor(private pickupsService: PickupsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('pickupId')
      this.pickupsService.apiV1PickupsPickupIDOrdersGet(id).subscribe((orders: Order[]) => {
        this.pickupDetailsData = new PickupDetailsData()
        this.pickupDetailsData.products = []
        for (let order of orders) {
          for (let item of order.items) {
            let found: ProductSummaryData = null
            for (let productSummary of this.pickupDetailsData.products) {
              if (productSummary.id == item.product.id) {
                found = productSummary
                break;
              }
            }

            if (found == null) {
              found = new ProductSummaryData()
              found.id = item.product.id
              found.name = item.product.name
              found.count = 0
              this.pickupDetailsData.products.push(found)
            }

            found.count += item.count
          }
        }
        this.loading = false
      })
    },
    (error) => {
      console.error(error.message)
      this.error = "Oops... something went wrong :("
    })    
  }

}
