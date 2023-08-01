export interface OrderedItem {
    name: string,
    price: number,
    quantity: number
}

export interface OrderResponseItem{
    orderId: string,
    total: number,
    items: OrderedItem[]
}

