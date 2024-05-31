import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit{

  @Input() posts: Post[] | null = []

  @Output() postDetail = new EventEmitter<Post>();
  @Output() deleteDetail = new EventEmitter<Post>();

  constructor(){}

  ngOnInit(): void {}

  showPost(post: Post){
    this.postDetail.emit(post);
  }
 
  deletePost(post: Post){
    this.deleteDetail.emit(post);
  }



}
