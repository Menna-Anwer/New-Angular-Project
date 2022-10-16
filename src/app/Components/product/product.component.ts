import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CategoryService } from 'src/app/Services/category/category.service';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  selectedCat: string = ''
  products: IProduct[] = [];
  editMode: boolean = false;
  updatedItem: IProduct = {} as IProduct;
  constructor(private catService: CategoryService, private prodService: ProductService) { 
    this.productForm = new FormGroup({
      name: new FormControl('',Validators.required),
      price: new FormControl('', Validators.required),
      imageName: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.catService.getSelectedCat().subscribe(value => {
      this.selectedCat = value;
    });
    this.prodService.getProducts().subscribe(value => {
      this.products = value;
    })
  }

  change(event:any){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.productForm.patchValue({
        image: file
      })
    }
  }
  submit():void{
    // let data = {...this.productForm.value};
    let formData: FormData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('image', this.productForm.get('image')?.value);
    formData.append('categoryId', this.selectedCat);
    this.prodService.addProduct(formData).subscribe(value => {
      this.reset();
    })
    
  }

  reset(): void{
    this.productForm.reset()
  }

  edit(item: IProduct): void{
    this.editMode = true;
    this.updatedItem = item
    this.productForm.controls['name'].setValue(item.name);
    this.productForm.controls['price'].setValue(item.price);
    this.selectedCat = item.categoryId;
  }


  update(): void{
    let formData: FormData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('categoryId', this.selectedCat);
    if(this.productForm.get('image')!.value !== ''){
      formData.append('image', this.productForm.get('image')?.value);
      
    }else{
      formData.append('imageUrl', this.updatedItem.image);
    }
    // formData.forEach((k,v) =>{ console.log(v); console.log(k)})
    this.prodService.updateProduct(formData, this.updatedItem._id)
    this.reset();
  }

  delete(id:string):void{
    this.prodService.deleteProduct(id);
  }
}
