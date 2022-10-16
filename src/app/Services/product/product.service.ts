import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/iproduct';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  headersOptions;
  products: BehaviorSubject<IProduct[]>
  private jwtHelper = new JwtHelperService();
  token: string;
  constructor(private httpclient: HttpClient, private router: Router) {
    this.products = new BehaviorSubject<IProduct[]>([]);
    this.token = localStorage.getItem('token')!
    this.headersOptions = {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    };
   }

   isExpired(){
    if(this.jwtHelper.isTokenExpired(this.token)){
      this.router.navigateByUrl('/login');
      return
    }
   }

  getProducts():BehaviorSubject<IProduct[]>{
    this.isExpired();
    this.httpclient.get<IProduct[]>(`${environment.ProductsApi}`, this.headersOptions).subscribe(value => {
      this.products.next(value);
    })
    return this.products;
  }

  addProduct(data: any): void{
    this.isExpired();
    this.httpclient.post<IProduct>(`${environment.ProductsApi}`,data,this.headersOptions).subscribe(value => {
      let oldValues = this.products.value;
      oldValues.push(value);
      this.products.next(oldValues);
    });
  }

  updateProduct(data: any,id: string):void{
    this.isExpired();
    this.httpclient.put<any>(`${environment.ProductsApi}/${id}`,data,this.headersOptions).subscribe(value => {
      let oldValues = this.products.value;
      let index = oldValues.findIndex(el => el._id === id);
      oldValues[index] = value;
      this.products.next(oldValues);
    });
  }
  filter(name: string):void{
    this.isExpired();
    this.httpclient.get<IProduct[]>(`${environment.ProductsApi}/filter?name=${name}`,this.headersOptions).subscribe(value=>{
      this.products.next(value);
    })
  }

  deleteProduct(id: string): void{
    this.isExpired();
    this.httpclient.delete<any>(`${environment.ProductsApi}/${id}`,this.headersOptions).subscribe(value => {
      let newValues = this.products.value.filter(el => el._id !== id);
      this.products.next(newValues);
    })
  }
}
