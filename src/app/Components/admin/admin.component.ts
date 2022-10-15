import { Component, OnInit } from '@angular/core';
import { IOrderItem } from 'src/app/interfaces/iorder-item';
import { IProduct } from 'src/app/interfaces/iproduct';
import { OrderService } from 'src/app/Services/order/order.service';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {



  products: IProduct[] = [];
  orderItems: IOrderItem[] = [];
  searchVal: string = '';
  totalPrice: number = 0;
  constructor(private prodService: ProductService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.prodService.getProducts().subscribe(value=>{
      this.products = value;
    });
    this.orderService.getOrderItems().subscribe(value=>{
      this.orderItems = value;
    })
    this.orderService.getTotalPrice().subscribe(value => {
      this.totalPrice = value;
    })
  }


  filterProducts():void{
    if(this.searchVal.length > 0)
    this.prodService.filter(this.searchVal);
    else{
      this.prodService.getProducts().subscribe(value=>{
        this.products = value;
      });
    }
  }


  addOrderItem(prod: IProduct):void{
    const item: IOrderItem = {
      id: prod._id,
      name:prod.name,
      price: prod.price,
      quantity: 1
    }
    // this.orderItems.push(item);
    this.orderService.addNewItem(item);
  }
}
