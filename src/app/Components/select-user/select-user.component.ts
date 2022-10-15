import { Component, OnInit } from '@angular/core';
import { IMapedUser } from 'src/app/interfaces/imaped-user';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnInit {

  users: IMapedUser[] = [];
  selectedUser: string = '';
  constructor(private auth: AuthServiceService) { }

  ngOnInit(): void {
    this.auth.getUsers();
    this.auth.allUsers().subscribe(value=>{
      this.users = value
    });
    this.auth.getSelectedUser().subscribe(value=>{
      this.selectedUser = value;
    })
  }

  setSelectedUser():void{
    this.auth.setSelectedUser(this.selectedUser);
  }

}
