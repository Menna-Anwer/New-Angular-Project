import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthServiceService } from './../../Services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup;
  constructor(private AuthServiceService:AuthServiceService) { 
    this.userLoginForm=new FormGroup({
      email:new FormControl(""),
      password : new FormControl("")
    })
  }

  ngOnInit(): void {
  }

  login(){
    this.AuthServiceService.login(this.userLoginForm.value)
  }

}
