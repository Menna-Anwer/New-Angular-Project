import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl , FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/iuser';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  addUserForm: FormGroup;
  constructor() {
    this.addUserForm=new FormGroup({
      name: new FormControl('', [Validators.required,Validators.pattern("[A-Za-z]{3,}")]),
      email:new FormControl("",[Validators.required,Validators.pattern("[^ @]*@[^ @]*")]),
      image:new FormControl(""),
      password: new FormControl('',[
        Validators.minLength(8),
        Validators.required]),
      repeatPassword: new FormControl('')
    },{validators:this.samePassword})
   }

  ngOnInit(): void {
  }
  addUser(){
     return this.addUserForm.value as IUser
  }
  samePassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>{
    const pass = control.get('password');
    const rePass = control.get('repeatPassword');
   
    return pass && rePass && pass.value !== rePass.value ? {notSame: true} : null
  }


}
