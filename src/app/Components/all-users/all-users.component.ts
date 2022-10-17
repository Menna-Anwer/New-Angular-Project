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
  users: IUser[] = [];
  editMode:boolean =  false;
  updatesUser: IUser = {} as IUser;
  constructor(private router: Router,private authServiceService:AuthServiceService) {
    this.addUserForm=new FormGroup({
      name: new FormControl('', [Validators.required,Validators.pattern("[A-Za-z]{3,}")]),
      email:new FormControl("",[Validators.required,Validators.pattern("[^ @]*@[^ @]*")]),
      image:new FormControl("",Validators.required),
      type:new FormControl(this.selectedType,Validators.required),
      imageName: new FormControl('', Validators.required),
      password: new FormControl('',[
        Validators.minLength(8),
        Validators.required]),
      repeatPassword: new FormControl('',Validators.required)
    },{validators:this.samePassword}); 
   }

  ngOnInit(): void {
    this.authServiceService.getFullUsers().subscribe(value => {
      this.users = value;
    })
  }
  addUser():void{
    let formData: FormData = new FormData();
    formData.append('name', this.addUserForm.get('name')?.value)
    formData.append('email', this.addUserForm.get('email')?.value)
    formData.append('password', this.addUserForm.get('password')?.value),
    formData.append('image', this.addUserForm.get('image')?.value);
    formData.append('type', this.selectedType);
    this.authServiceService.signup(formData);
    this.reset();
  }
  change(event:any):void{
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.addUserForm.patchValue({
        image: file
      })
    }
  }
 
  reset():void{
    this.addUserForm.controls['image'].setValue("");
    this.addUserForm.reset();
    console.log(this.addUserForm.controls['image'].value);
    
  }
   
  edit(user: IUser):void{
    this.editMode = true;
    this.updatesUser = user;
    this.addUserForm.controls['name'].setValue(user.name);
    this.addUserForm.controls['email'].setValue(user.email);
    this.addUserForm.controls['type'].setValue(user.type);
    this.addUserForm.controls['password'].setValue(user.password);
    this.addUserForm.controls['repeatPassword'].setValue(user.password);
  }


  update(): void{
    let formData: FormData = new FormData();
    formData.append('name', this.addUserForm.get('name')?.value);
    formData.append('email', this.addUserForm.get('email')?.value);
    formData.append('type', this.addUserForm.get('type')?.value);
    formData.append('password', this.addUserForm.get('password')?.value);
    if(this.addUserForm.get('image')!.value !== null && this.addUserForm.get('image')!.value !== ''){
    formData.append('image', this.addUserForm.get('image')?.value);
    }else{
    formData.append('imageUrl', this.updatesUser.image);
    }
    this.authServiceService.updateUser(formData, this.updatesUser._id);
    console.log(this.addUserForm.get('image')?.value);
    this.reset();
  }

  delete(id: string):void{
    this.authServiceService.deleteUser(id);
  }
  samePassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>{
    const pass = control.get('password');
    const rePass = control.get('repeatPassword');
   
    return pass && rePass && pass.value !== rePass.value ? {notSame: true} : null
  }
 

}
