import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { AllUsersComponent } from './Components/all-users/all-users.component';
import { CardOrderComponent } from './Components/card-order/card-order.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { LoginComponent } from './Components/login/login.component';
import { MyOrdersComponent } from './Components/my-orders/my-orders.component';
import { ProductComponent } from './Components/product/product.component';
import { AuthGuard } from './guards/auth/auth.guard';


const routes: Routes = [
  {path:"",component:LayoutComponent,children:[
    {path: "", redirectTo: "home", pathMatch: "full"},
   {path:"home",component:AdminComponent, canActivate: [AuthGuard]},
   {path:"user",component:AllUsersComponent,canActivate: [AuthGuard]},
   {path:"order",component:CardOrderComponent,canActivate: [AuthGuard]},
   {path:"myorders",component:MyOrdersComponent},
   {path:"product",component:ProductComponent,canActivate: [AuthGuard]},
  ]},
  {path:"login",component:LoginComponent},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
