import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/interfaces/iproduct';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: BehaviorSubject<IProduct[]>
  constructor(private httpclient: HttpClient) {
    this.products = new BehaviorSubject<IProduct[]>([]);
   }

  getProducts():BehaviorSubject<IProduct[]>{
    this.httpclient.get<IProduct[]>(`${environment.ProductsApi}`).subscribe(value => {
      console.log(55);
      console.log(value);
      this.products.next(value);
    })
    return this.products;
  }

  filter(name: string):void{
    this.httpclient.get<IProduct[]>(`${environment.ProductsApi}/filter?name=${name}`).subscribe(value=>{
      this.products.next(value);
    })
  }
}
