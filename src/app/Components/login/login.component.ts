import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from './../../Services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup;
  constructor(private AuthServiceService: AuthServiceService, private router: Router) {

    this.userLoginForm = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    })
  }

  ngOnInit(): void {
  }
  
  login() {
    this.AuthServiceService.login(this.userLoginForm.value).subscribe(value => {
      if (value.status == 200) {
        let body = { ...value.body! }
        localStorage.setItem("token", body.token);
        localStorage.setItem("userId", body.userId);
        this.router.navigateByUrl('/home');
      }

    })
  }

}
