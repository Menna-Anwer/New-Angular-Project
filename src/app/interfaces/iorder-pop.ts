import { IProduct } from "./iproduct"
import { IUser } from "./iuser"

export interface IOrderPop {
    _id: string,
    date: Date,
    creatorId: IUser,
    notes?: string,
    items: 
        {
            prodId: IProduct,
            qty: number
        }[]
    ,
    status: string,
    totalPrice: number
}
