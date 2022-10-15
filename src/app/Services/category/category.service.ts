import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICategory } from 'src/app/interfaces/icategory';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: BehaviorSubject<ICategory[]>;
  selectedCat: BehaviorSubject<string>;
  constructor(private httpClient: HttpClient) {
    this.categories = new BehaviorSubject<ICategory[]>([]);
    this.selectedCat = new BehaviorSubject<string>('');
   }

   getCategories(): BehaviorSubject<ICategory[]>{
    this.httpClient.get<ICategory[]>(`${environment.CategoriesApi}`).subscribe(value => {
      this.categories.next(value);
      this.selectedCat.next(value[0]._id)
    });
    return this.categories;
   }

   getSelectedCat():BehaviorSubject<string>{
    return this.selectedCat;
   }
   setSelectedCat(id: string):void{
    this.selectedCat.next(id);
   }
}
