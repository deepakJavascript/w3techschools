import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserServiceService} from '../../services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  users = [];

  constructor(
    private formbuilder: FormBuilder,
    private userservice: UserServiceService
  ) { }

  //On submit the form

  submitRegister(){
    //alert('hello');

    const regVal = {

      name:this.registerForm.get('name').value,
      email:this.registerForm.get('email').value,
      contact:this.registerForm.get('contact').value,
      password:this.registerForm.get('password').value,
    }

    this.userservice.registerUser(regVal)
    .subscribe(data =>{

      if(!data){
        console.log('User not registered');
      }
      else{
        console.log('User registered');
      }
      let users = this.userservice.getUsers()
    .subscribe(data => this.users = data);

   this.registerForm.reset({

    name:'',
    email:'',
    contact:'',
    password:''
   })
    });
  }

  // Delete User

  delUser(id){
this.userservice.deleteUser(id)
.subscribe(()=>{
  let users = this.userservice.getUsers()
    .subscribe(data => this.users = data);
});
  }

  

  ngOnInit() {
    this.registerForm = this.formbuilder.group({

      name:['', Validators.required],
      email:['', Validators.required],
      contact:['', Validators.required],
      password:['', Validators.required]
    });

    let users = this.userservice.getUsers()
    .subscribe(data => this.users = data);
  }

}
