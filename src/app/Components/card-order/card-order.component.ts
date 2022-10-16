import { Component, OnInit } from '@angular/core';
import { IOrderPop } from 'src/app/interfaces/iorder-pop';
import { OrderService } from 'src/app/Services/order/order.service';

@Component({
  selector: 'app-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.css']
})
export class CardOrderComponent implements OnInit {


  orders: IOrderPop[] = [];
  constructor(private orderServ: OrderService) { }

  ngOnInit(): void {
    this.orderServ.getOrders().subscribe(value => {
      this.orders = value;
      console.log(this.orders.length);
      
    })
  }

}
