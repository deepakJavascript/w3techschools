import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../../services/user-service.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  returnUrl:string;
  isLogin: boolean;

  constructor(
    private userservice:UserServiceService,
    private route:Router,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    
  }

logout(){
  this.userservice.logOut();
  setTimeout(() =>{
    //this.route.navigate(['/login']);
    // get return url from route parameters or default to '/'
    this.returnUrl = this.router.snapshot.queryParams['returnUrl'] || '/';
  }, 2000);
}

  
}
