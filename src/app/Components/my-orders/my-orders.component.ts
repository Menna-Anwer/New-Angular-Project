import { Component, OnInit } from '@angular/core';
import { IOrderPop } from 'src/app/interfaces/iorder-pop';
import { OrderService } from 'src/app/Services/order/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  myOrders: IOrderPop[]
  constructor(private orders: OrderService) { 
    this.myOrders = [];
  }

  ngOnInit(): void {
    this.orders.getOrdersByUserId(localStorage.getItem('userId')!).subscribe(value => {
      this.myOrders = value;
    })
  }

}
