import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/iproduct';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  
  @Input() item: IProduct = {} as IProduct;
  constructor() { }

  ngOnInit(): void {
  }

}
