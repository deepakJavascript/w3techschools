import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  editForm:FormGroup;
  currentUrl;
  post;

  constructor(private currentroute: ActivatedRoute, 
    private postservice: PostService,
    private fb: FormBuilder
    ) {

      this.createEditForm();
     }


     createEditForm(){
       this.editForm = this.fb.group({
         title:['', Validators.required],
         content:['', Validators.required]
       })
     }

  ngOnInit() {

    this.currentUrl = this.currentroute.snapshot.params;
    console.log(this.currentUrl.id);
    this.postservice.getSinglePost(this.currentUrl.id)
    .subscribe(data => this.post = data);

  }

  

}
