import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICategory } from 'src/app/interfaces/icategory';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: BehaviorSubject<ICategory[]>;
  selectedCat: BehaviorSubject<string>;
  private jwtHelper = new JwtHelperService();
  token: string;
  headersOptions;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.categories = new BehaviorSubject<ICategory[]>([]);
    this.selectedCat = new BehaviorSubject<string>('');
    this.token = localStorage.getItem('token')!
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      })
    };
  }

  isExpired(data: any) {
    if (this.jwtHelper.isTokenExpired(this.token)) {
      this.router.navigateByUrl('/login');
      return data
    }
  }

  getCategories(): BehaviorSubject<ICategory[]> {
    this.isExpired(new BehaviorSubject<ICategory[]>([]));
    this.httpClient.get<ICategory[]>(`${environment.CategoriesApi}`, this.headersOptions).subscribe(value => {
      this.categories.next(value);
      this.selectedCat.next(value[0]._id)
    });
    return this.categories;
  }

  getSelectedCat(): BehaviorSubject<string> {
    return this.selectedCat;
  }
  setSelectedCat(id: string): void {
    this.selectedCat.next(id);
  }

  addCategory(name: string): void {
    this.isExpired('');
    this.httpClient.post<any>(`${environment.CategoriesApi}`, JSON.stringify({ name: name }), this.headersOptions).subscribe(value => {
      let oldValues = this.categories.value;
      oldValues.push(value);
      this.categories.next(oldValues);
    })
  }
}
