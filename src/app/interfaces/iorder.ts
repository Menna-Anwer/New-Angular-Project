export interface IOrder {
    _id: string,
    date: Date,
    creatorId: string,
    notes?: string,
    items: 
        {
            prodId: string,
            qty: number
        }[]
    ,
    status: string,
    totalPrice: number
}
