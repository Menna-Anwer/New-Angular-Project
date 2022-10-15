import { Component, Input, OnInit } from '@angular/core';
import {faMinus, faPlus, faXmark} from '@fortawesome/free-solid-svg-icons'
import { IOrderItem } from 'src/app/interfaces/iorder-item';
import { OrderService } from 'src/app/Services/order/order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  faXmark = faXmark;
  faPlus = faPlus;
  faMinus = faMinus;

  @Input() item: IOrderItem
  constructor(private orderServicr: OrderService) { 
    this.item = {} as IOrderItem
  }

  ngOnInit(): void {
  }

  increase():void{
    this.orderServicr.incQtyOFItem(this.item.id);
  }

  decrease():void{
    this.orderServicr.decQtyOFItem(this.item.id);
  }

  remove():void{
    this.orderServicr.removeItem(this.item.id);
  }

  changeQty():void{
    if(this.item.quantity === 0 || this.item.quantity == null){
      this.remove();
    }else{
    this.orderServicr.incQtyOFItem(this.item.id, this.item.quantity);
    }
    
  }
}
