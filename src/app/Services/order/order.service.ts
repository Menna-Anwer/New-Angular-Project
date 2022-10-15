import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrderItem } from 'src/app/interfaces/iorder-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderItems: BehaviorSubject<IOrderItem[]>;
  totalPrice: BehaviorSubject<number>;
  constructor(private httpClient: HttpClient) {
    this.orderItems = new BehaviorSubject<IOrderItem[]>([]);
    this.totalPrice = new BehaviorSubject<number>(0);
  }

  addNewItem(item: IOrderItem): void {
    let oldValues: IOrderItem[] = [...this.orderItems.value];
    let isExsists = oldValues.findIndex(el => el.id === item.id);
    if (isExsists > -1) {
      oldValues[isExsists].quantity += item.quantity;
      this.orderItems.next(oldValues);
      this.totalPrice.next(this.calcTotalPrice())

      return;
    }
    oldValues.push(item);
    this.orderItems.next(oldValues);
    this.totalPrice.next(this.calcTotalPrice())

  }

  getOrderItems(): BehaviorSubject<IOrderItem[]> {
    return this.orderItems;
  }

  incQtyOFItem(id: string, qty?: number): void {
    let oldValues: IOrderItem[] = [...this.orderItems.value];
    let index = oldValues.findIndex(el => el.id === id);
    if (index > -1) {
      if (qty != null) {
        oldValues[index].quantity = qty;
        this.orderItems.next(oldValues);
        this.totalPrice.next(this.calcTotalPrice())

        return;
      }
      oldValues[index].quantity += 1;
      this.orderItems.next(oldValues);
      this.totalPrice.next(this.calcTotalPrice())

    }
  }

  decQtyOFItem(id: string): void {
    let oldValues: IOrderItem[] = [...this.orderItems.value];
    let index = oldValues.findIndex(el => el.id === id);
    if (index > -1 && oldValues[index].quantity > 1) {
      oldValues[index].quantity -= 1;
      this.orderItems.next(oldValues);
      this.totalPrice.next(this.calcTotalPrice())
    } else {
      let newValues = oldValues.filter(el => el.id !== id);
      this.orderItems.next(newValues);
      this.totalPrice.next(this.calcTotalPrice())

    }
  }

  removeItem(id: string): void {
    let newValues = this.orderItems.value.filter(el => el.id !== id);
    this.orderItems.next(newValues);
    this.totalPrice.next(this.calcTotalPrice())
  }

  calcTotalPrice(): number {
    let totalPrice = 0;
    this.orderItems.value.forEach(el => {
      totalPrice += el.price * el.quantity;
    })
    return totalPrice;
  }

  getTotalPrice(): BehaviorSubject<number> {
    return this.totalPrice;
  }
}
