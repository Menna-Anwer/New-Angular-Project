import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUser:boolean = false;
  logedUser: IUser ;
  constructor(private authServ:AuthServiceService) { 
    this.logedUser = {} as IUser
  }


  ngOnInit(): void {
    this.authServ.getIsUser().subscribe(value=>{
      this.isUser=value
    })
    this.authServ.getLoggedUser().subscribe(value => {
      this.logedUser = value;
    })
  }
  logout():void{
    this.authServ.logout();
  }
}
