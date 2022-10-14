import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  headersOptions;
  constructor(private HttpClient:HttpClient, private Router:Router) { 
    this.headersOptions = {

      headers: new HttpHeaders({

        'Content-Type': 'application/json'

      })

    }
  }
  login(user:any):void{
     this.HttpClient.post(`${environment.AuthApi}/login`,JSON.stringify(user),{headers:new HttpHeaders({

      'Content-Type': 'application/json'

    }),observe:"response"}).subscribe(value=>{
   if(value.status==200){
    localStorage.setItem("token",value.body?.toString()!)
   }

     })
  }
}
