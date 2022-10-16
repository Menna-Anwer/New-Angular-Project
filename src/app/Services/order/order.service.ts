import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrder } from 'src/app/interfaces/iorder';
import { IOrderItem } from 'src/app/interfaces/iorder-item';
import { IOrderPop } from 'src/app/interfaces/iorder-pop';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private jwtHelper = new JwtHelperService();
  orderItems: BehaviorSubject<IOrderItem[]>;
  totalPrice: BehaviorSubject<number>;
  orders: BehaviorSubject<IOrderPop[]>;
  headersOptions;
  token: string;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.orderItems = new BehaviorSubject<IOrderItem[]>([]);
    this.totalPrice = new BehaviorSubject<number>(0);
    this.orders = new BehaviorSubject<IOrderPop[]>([]);
    this.token = localStorage.getItem('token')!
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      })
    };
  }

  isExpired(data:any){
    if(this.jwtHelper.isTokenExpired(this.token)){
      this.router.navigateByUrl('/login');
      return data
    }
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



  getOrders(): BehaviorSubject<IOrderPop[]>{
    this.isExpired(new BehaviorSubject<IOrderPop[]>([]))
    this.httpClient.get<IOrderPop[]>(`${environment.OrderApi}`,this.headersOptions).subscribe(value => {
      this.orders.next(value);
    });
    return this.orders;
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

  addOrder(order:IOrder): void{
    this.isExpired('void');
    this.httpClient.post<IOrder>(`${environment.OrderApi}`,JSON.stringify(order),this.headersOptions).subscribe(value =>{
      console.log(value);
    })
  }

  reset(): void{
    this.orderItems.next([]);
    this.totalPrice.next(0);
  }
}
