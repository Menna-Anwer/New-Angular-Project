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
  headersOptions;
  users: BehaviorSubject<IMapedUser[]>;
  fullUsers: BehaviorSubject<IUser[]>;
  selectedUser: BehaviorSubject<string>;
  loggedUser: BehaviorSubject<IUser>;
  constructor(private httpClient:HttpClient, private router:Router) { 
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.users = new BehaviorSubject<IMapedUser[]>([]);
    this.selectedUser = new BehaviorSubject<string>('');
    this.fullUsers = new BehaviorSubject<IUser[]>([]);
    this.loggedUser = new BehaviorSubject<IUser>({}as IUser);
  }
  signup(data:any):Observable<IUser>{
    return this.httpClient.post<IUser>(`${environment.AuthApi}/register`,data)
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
        this.router.navigateByUrl('/home');
      }
    })
  }

  getUsers(): void{
    this.httpClient.get<IMapedUser[]>(`${environment.AuthApi}`).subscribe(value => {
      this.users.next(value);
      this.selectedUser.next(value[0]._id);
    })
  }

  

  updateUser(data: any, id: string):void{
    this.httpClient.put<any>(`${environment.AuthApi}/${id}`,data).subscribe(value => {
      let oldValues = this.fullUsers.value;
      let index = oldValues.findIndex(el => el._id === id);
      oldValues[index] = value;
      this.fullUsers.next(oldValues);
    })
  }

  deleteUser(id: string):void{
    this.httpClient.delete<any>(`${environment.AuthApi}/${id}`).subscribe(value => {
      let newValues = this.fullUsers.value.filter(el => el._id !== id);
      this.fullUsers.next(newValues);
    })
  }
  allUsers(): BehaviorSubject<IMapedUser[]>{
    return this.users;
  }

  getFullUsers():BehaviorSubject<IUser[]>{
    this.httpClient.get<IUser[]>(`${environment.AuthApi}`).subscribe(value => {
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

  isLogged(): boolean{
    const token = localStorage.getItem('token')!;
    console.log(typeof(token));
    
    if(token === null){
      console.log(1);
      return false;
    }
    else if(this.jwtHelper.isTokenExpired(token)){
      console.log(2);
      return false;
    }else{
      console.log(3);
      return true;
    }
  }

  logout():void{
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
