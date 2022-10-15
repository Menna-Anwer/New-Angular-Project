import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { AdminComponent } from './Components/admin/admin.component';
import { UserComponent } from './Components/user/user.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { ProductComponent } from './Components/product/product.component';
import { AllProductsComponent } from './Components/all-products/all-products.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    NavbarComponent,
    LayoutComponent,
    ProductComponent,
    AllProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
