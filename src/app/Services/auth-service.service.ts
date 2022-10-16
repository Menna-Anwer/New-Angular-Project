import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMapedUser } from '../interfaces/imaped-user';
import { environment } from './../../environments/environment';
import { IUser } from 'src/app/interfaces/iuser';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private jwtHelper = new JwtHelperService();
  users: BehaviorSubject<IMapedUser[]>;
  fullUsers: BehaviorSubject<IUser[]>;
  selectedUser: BehaviorSubject<string>;
  loggedUser: BehaviorSubject<IUser>;
  isUser: BehaviorSubject<boolean>;
  constructor(private httpClient:HttpClient, private router:Router) { 
    this.users = new BehaviorSubject<IMapedUser[]>([]);
    this.selectedUser = new BehaviorSubject<string>('');
    this.fullUsers = new BehaviorSubject<IUser[]>([]);
    this.loggedUser = new BehaviorSubject<IUser>({}as IUser);
    this.isUser = new BehaviorSubject<boolean>(true);
  }
  signup(data:any):void{
    if(this.jwtHelper.isTokenExpired(localStorage.getItem('token')!)){
      this.router.navigateByUrl('/login');
      return ;
    }
    this.httpClient.post<IUser>(`${environment.AuthApi}/register`,data).subscribe(value => {
      let oldValues = this.fullUsers.value;
      oldValues.push(value);
      this.fullUsers.next(oldValues);
    })
  }
  login(user:any):void{
    this.httpClient.post<any>(`${environment.AuthApi}/login`,JSON.stringify(user),{headers:new HttpHeaders({
      'Content-Type': 'application/json'
    }),observe:"response"}).subscribe(value => {
      if (value.status == 200) {
        let body = { ...value.body! }
        this.loggedUser.next(body.user);
        localStorage.setItem("token", body.token);
        localStorage.setItem("userId", body.user._id);
        if(body.user.type === 'user'){
          this.isUser.next(true);
        }else{
          this.isUser.next(false);
        }
        this.router.navigateByUrl('/home');
      }
    })
  }

  getLoggedUser(): BehaviorSubject<IUser>{
    return this.loggedUser;
  }
  getUsers(): void{
    if(this.jwtHelper.isTokenExpired(localStorage.getItem('token')!)){
      this.router.navigateByUrl('/login');
      return ;
    }
    this.httpClient.get<IMapedUser[]>(`${environment.AuthApi}`,{headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')!
    })}).subscribe(value => {
      this.users.next(value);
      this.selectedUser.next(value[0]._id);
    })
  }

  

  updateUser(data: any, id: string):void{
    if(this.jwtHelper.isTokenExpired(localStorage.getItem('token')!)){
      this.router.navigateByUrl('/login');
      return ;
    }
    this.httpClient.put<any>(`${environment.AuthApi}/${id}`,data,{headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')!
    })}).subscribe(value => {
      let oldValues = this.fullUsers.value;
      let index = oldValues.findIndex(el => el._id === id);
      oldValues[index] = value;
      this.fullUsers.next(oldValues);
    })
  }

  deleteUser(id: string):void{
    if(this.jwtHelper.isTokenExpired(localStorage.getItem('token')!)){
      this.router.navigateByUrl('/login');
      return ;
    }
    this.httpClient.delete<any>(`${environment.AuthApi}/${id}`,{headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')!
    })}).subscribe(value => {
      let newValues = this.fullUsers.value.filter(el => el._id !== id);
      this.fullUsers.next(newValues);
    })
  }
  allUsers(): BehaviorSubject<IMapedUser[]>{
    return this.users;
  }

  getFullUsers():BehaviorSubject<IUser[]>{
    if(this.jwtHelper.isTokenExpired(localStorage.getItem('token')!)){
      this.router.navigateByUrl('/login');
      return new BehaviorSubject<IUser[]>([]);
    }
    this.httpClient.get<IUser[]>(`${environment.AuthApi}`,{headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')!
    })}).subscribe(value => {
      this.fullUsers.next(value);
    })
    return this.fullUsers;
  }
  getSelectedUser(): BehaviorSubject<string>{
    return this.selectedUser;
  }

  setSelectedUser(id: string):void{
    this.selectedUser.next(id);
    
  }

  loadSavedUser(id:string):void{
    this.httpClient.get<IUser>(`${environment.AuthApi}/user/${id}`).subscribe(value => {
      this.loggedUser.next(value);
      console.log(this.loggedUser.value);
      
      if(value.type === 'user'){
        this.isUser.next(true);
      }else{
        this.isUser.next(false)
      }
    })
  }

  getIsUser():BehaviorSubject<boolean>{
    return this.isUser;
  }

  isLogged(): boolean{
    const token = localStorage.getItem('token')!;
    console.log(typeof(token));
    
    if(token === null){
      return false;
    }
    else if(this.jwtHelper.isTokenExpired(token)){
      return false;
    }else{
      return true;
    }
  }

  logout():void{
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
