import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMapedUser } from '../interfaces/imaped-user';
import { environment } from './../../environments/environment';
import { IUser } from 'src/app/interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  headersOptions;
  users: BehaviorSubject<IMapedUser[]>;
  selectedUser: BehaviorSubject<string>;
  constructor(private httpClient:HttpClient, private router:Router) { 
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.users = new BehaviorSubject<IMapedUser[]>([]);
    this.selectedUser = new BehaviorSubject<string>('');
  }
  signup(data:any):Observable<IUser>{
    return this.httpClient.post<IUser>(`${environment.AuthApi}/register`,data)
  }
  login(user:any):Observable<any>{
     return this.httpClient.post<any>(`${environment.AuthApi}/login`,JSON.stringify(user),{headers:new HttpHeaders({
      'Content-Type': 'application/json'
    }),observe:"response"})
  }

  getUsers(): void{
    this.httpClient.get<IMapedUser[]>(`${environment.AuthApi}`).subscribe(value => {
      this.users.next(value);
      this.selectedUser.next(value[0].id);
    })
  }

  allUsers(): BehaviorSubject<IMapedUser[]>{
    return this.users;
  }

  getSelectedUser(): BehaviorSubject<string>{
    return this.selectedUser;
  }

  setSelectedUser(id: string):void{
    this.selectedUser.next(id);
    
  }
}
