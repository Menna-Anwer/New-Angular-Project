import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interfaces/icategory';
import { CategoryService } from 'src/app/Services/category/category.service';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit {

  categories: ICategory[] = [];
  selectedCat: string = ''
  constructor(private catService: CategoryService) { }

  ngOnInit(): void {
    this.catService.getCategories().subscribe(value => {
      this.categories = value;
    });
    this.catService.getSelectedCat().subscribe(value => {
      this.selectedCat = value;
    })
  }

  setSelectedCat():void{
    this.catService.setSelectedCat(this.selectedCat);
  }

}
