import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../models/user';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  authToken;
  user;

  constructor(private http: HttpClient

    ) { }

registerUser(regdata){
  return this.http.post('http://localhost:3000/user/register', regdata);
}

getUsers():Observable<User[]>{
  return this.http.get<User[]>('http://localhost:3000/user/users');
}
deleteUser(userid){
  return this.http.delete('http://localhost:3000/user/user/'+userid);
}


userLogin(logincred){

  return this.http.post<any>('http://localhost:3000/user/login', logincred)

  .pipe(map(user => {
    // login successful if there's a jwt token in the response
    if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    else{
      console.log('User not found');
    }

    return user;
}));
  
}

logOut(){
  localStorage.removeItem('currentUser');
}




}
