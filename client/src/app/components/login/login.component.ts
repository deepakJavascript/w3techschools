import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserServiceService} from '../../services/user-service.service';
import { Router } from '@angular/router';
import {User} from '../../models/user';;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  user = [];
  
  constructor(private formbuilder: FormBuilder,
    private userservice: UserServiceService,
    private router: Router,
    
    ) { }

    submitLogin(){
    const logincred = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this.userservice.userLogin(logincred)
    .subscribe(data => {
      if(!data.success){
       console.log('User name password not matched');
      }
      else{
        this.router.navigate(['/dashboard']);
      }
      
  },
  error => {
      console.log('Something went wrong');
  });
           
    }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
})
  }

}
