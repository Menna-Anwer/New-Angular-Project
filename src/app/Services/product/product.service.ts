import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/iproduct';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  headersOptions;
  products: BehaviorSubject<IProduct[]>
  constructor(private httpclient: HttpClient) {
    this.products = new BehaviorSubject<IProduct[]>([]);
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
   }

  getProducts():BehaviorSubject<IProduct[]>{
    this.httpclient.get<IProduct[]>(`${environment.ProductsApi}`).subscribe(value => {
      this.products.next(value);
    })
    return this.products;
  }

  addProduct(data: any): Observable<any>{
    return this.httpclient.post<any>(`${environment.ProductsApi}`,data);
  }

  updateProduct(data: any,id: string){
    return this.httpclient.put<any>(`${environment.ProductsApi}/${id}`,data).subscribe(value => {
      let oldValues = this.products.value;
      let index = oldValues.findIndex(el => el._id === id);
      oldValues[index] = value;
      this.products.next(oldValues);
    });
  }
  filter(name: string):void{
    this.httpclient.get<IProduct[]>(`${environment.ProductsApi}/filter?name=${name}`).subscribe(value=>{
      this.products.next(value);
    })
  }

  deleteProduct(id: string): void{
    this.httpclient.delete<any>(`${environment.ProductsApi}/${id}`).subscribe(value => {
      let newValues = this.products.value.filter(el => el._id !== id);
      this.products.next(newValues);
    })
  }
}
