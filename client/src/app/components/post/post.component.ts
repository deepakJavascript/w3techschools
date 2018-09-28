import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postForm: FormGroup;
  disable = false;
    
  constructor(private fb:FormBuilder,
  private postservice: PostService,
  private router: Router
  ) { }

  submitForm(){
      console.log(this.postForm.value); 

      const formval = {
        title:this.postForm.get('title').value,
        content:this.postForm.get('content').value,
      }
      this.postservice.addPost(formval)
      .subscribe(data => {
        if(!data){
         console.log('Post not added');
        }
        else{
          console.log('Post added successfully');
          this.disable = true;
          setTimeout(() =>{
            this.router.navigate(['/post-list']);
          }, 300);
          
        }
      })

      
  }


  ngOnInit() {
    this.postForm = this.fb.group({
    title:['', Validators.required],
    content:['', Validators.required]
    })
    
  }

}
