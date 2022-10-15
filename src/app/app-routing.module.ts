import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { LoginComponent } from './Components/login/login.component';
import { UserComponent } from './Components/user/user.component';

const routes: Routes = [
  {path:"",component:LayoutComponent,children:[
    {path: "", redirectTo: "home", pathMatch: "full"},
   {path:"home",component:AdminComponent},
   {path:"user",component:UserComponent},
  ]},
  {path:"login",component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
