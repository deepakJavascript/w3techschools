import { Component, OnInit } from '@angular/core';
import {PostService} from  '../../services/post.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

   posts = [] ;

  constructor(private postservice: PostService,
  private router: Router
  ) { }

  //Delete Post Method
  delPost(id){
   
this.postservice.deletePost(id)
.subscribe(data =>{
  this.postservice.getPost()
  .subscribe(data => this.posts = data);
});
}

//Edit Post data
postEdit(id){
  console.log(id);
  this.postservice.editPost(id)
  .subscribe(data => {
//this.router.navigate(['/post-list']);
  })
}

  ngOnInit() {
this.postservice.getPost()
.subscribe(data => this.posts = data);

  }

}
