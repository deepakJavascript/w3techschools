import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import {Observable} from 'rxjs';  // Angular 5/RxJS 5.5 syntax


@Injectable({
  providedIn: 'root'
})
export class PostService {

  //domain = "http://localhost:3000/";

  constructor(private http: HttpClient) { }
//Add post 
  addPost(post){
    return this.http.post('http://localhost:3000/api/post', post);
    }
//Get All post

  getPost(): Observable<Post[]>{
    return this.http.get<Post[]>('http://localhost:3000/api/posts');
  }
//Delete Post by id
  deletePost(postid){
    return this.http.delete('http://localhost:3000/api/post/'+postid);
  }

  //Edit Post by id

editPost(id){
  return this.http.put('http://localhost:3000/api/post', id);
}

//Get single Post
getSinglePost(postid){
  return this.http.get('http://localhost:3000/api/post/'+postid);
}
}
