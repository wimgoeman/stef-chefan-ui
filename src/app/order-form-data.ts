import { Order, Product } from 'api-generated'

export class OrderItemFormData {
    productId: string = null
    count: number = 0
    comment: string = ''
}

export class OrderFormData {
    id: string = null
    eater: string = ''
    price: string = '0.00'
    payed: boolean = false
    items: Map<string, OrderItemFormData> = new Map<string, OrderItemFormData>()

    addProductEntries(products: Array<Product>) {
        for (const product of products) {
            if (!this.items.has(product.id)) {
                this.items.set(product.id, {
                    productId: product.id,
                    count: 0,
                    comment: ''
                })
            }
        }
    }

    overwriteWith(order: Order) {
        this.id = order.id
        this.eater = order.eater
        this.price = order.price
        this.payed = order.payed
        if (order.items) {
            for (const item of order.items) {
                const formOrderItem = this.items.get(item.product.id);
                if (formOrderItem) {
                    // Items may not have been loaded. This info is only written in case #addProductEntries was invoked before
                    formOrderItem.count = item.count
                    formOrderItem.comment = item.comment
                }
            }
        }   
    }
}
