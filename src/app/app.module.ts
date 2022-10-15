import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { AdminComponent } from './Components/admin/admin.component';
import { UserComponent } from './Components/user/user.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LayoutComponent } from './Components/layout/layout.component';

import { ProductComponent } from './Components/product/product.component';
import { AllProductsComponent } from './Components/all-products/all-products.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderItemComponent } from './Components/order-item/order-item.component';
import { SelectUserComponent } from './Components/select-user/select-user.component';
import { UOrderComponent } from './Components/uorder/uorder.component';
import { ListOrderComponent } from './Components/list-order/list-order.component';
import { CardOrderComponent } from './Components/card-order/card-order.component';
import { AllUsersComponent } from './Components/all-users/all-users.component';
import { UFormComponent } from './Components/uform/uform.component';
import { AddProductComponent } from './Components/add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    NavbarComponent,
    LayoutComponent,

    ProductComponent,
    AllProductsComponent,

    OrderItemComponent,
    SelectUserComponent,
    UOrderComponent,
    ListOrderComponent,
    CardOrderComponent,
    AllUsersComponent,
    UFormComponent,
    AddProductComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
