import { Order } from 'api-generated'

export class OrderItemFormData {
    productId: string = null

}

export class OrderFormData {
    id: string = null
    eater: string = ''
    price: string = '0.00'
    payed: boolean = false
    items: Map<string, number> = new Map<string, number>()

    overwriteWith(order: Order) {
        this.id = order.id
        this.eater = order.eater
        this.price = order.price
        this.payed = order.payed
        if (order.items) {
            for (const item of order.items) {
         
                //this.items.set(item.product.id, item.)
            }
        }
    }
}
