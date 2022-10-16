import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl , FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/iuser';
import { AuthServiceService } from './../../Services/auth-service.service';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  addUserForm: FormGroup;
  selectedType: string = 'admin'
  products: IUser[] = [];
  editMode:boolean =  false;
  constructor(private router: Router,private authServiceService:AuthServiceService) {
    this.addUserForm=new FormGroup({
      name: new FormControl('', [Validators.required,Validators.pattern("[A-Za-z]{3,}")]),
      email:new FormControl("",[Validators.required,Validators.pattern("[^ @]*@[^ @]*")]),
      image:new FormControl(""),
      type:new FormControl(""),
      imageName: new FormControl('', Validators.required),
      password: new FormControl('',[
        Validators.minLength(8),
        Validators.required]),
      repeatPassword: new FormControl('')
    },{validators:this.samePassword})
   }

  ngOnInit(): void {
  }
  addUser(){
    //  return this.addUserForm.value as IUser
    let formData: FormData = new FormData();
    formData.append('name', this.addUserForm.get('name')?.value)
    formData.append('email', this.addUserForm.get('email')?.value)
    formData.append('password', this.addUserForm.get('password')?.value),
    formData.append('image', this.addUserForm.get('image')?.value);
    formData.append('type', this.selectedType);
    this.authServiceService.signup(formData).subscribe(value => {
      console.log(value);
    })

  }
  change(event:any){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.addUserForm.patchValue({
        image: file
      })
    }
  }
 
  
   
  samePassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>{
    const pass = control.get('password');
    const rePass = control.get('repeatPassword');
   
    return pass && rePass && pass.value !== rePass.value ? {notSame: true} : null
  }
 

}
