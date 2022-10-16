import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from 'src/app/interfaces/iorder';
import { IOrderPop } from 'src/app/interfaces/iorder-pop';
import { OrderService } from 'src/app/Services/order/order.service';

@Component({
  selector: 'app-all-my-order',
  templateUrl: './all-my-order.component.html',
  styleUrls: ['./all-my-order.component.css']
})
export class AllMyOrderComponent implements OnInit {

  @Input() item: IOrderPop = {} as IOrderPop; 
  constructor(private orders: OrderService) { }

  ngOnInit(): void {
  }

  cancle(id: string): void{
    this.orders.cancle(id);
  }

}
