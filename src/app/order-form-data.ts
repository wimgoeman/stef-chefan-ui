import { Order } from 'api-generated'

export class OrderFormData {
    id: string = null
    eater: string = ''
    price: number = 0

    overwriteWith(order: Order) {
        this.id = order.id
        this.eater = order.eater
        this.price = order.price
    }
}
