import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Post } from '../posts/post';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnInit{
  constructor(private http: HttpClient) { }
  ngOnInit(): void {}


  // stream pattern of api call 
  getPosts$ = this.http.get<Post[]>("https://jsonplaceholder.typicode.com/posts?userId=1")
  .pipe(
   shareReplay(1) // to add data to cach memmory
  );

  // getPosts(){
  //   return this.http.get<Post[]>("https://jsonplaceholder.typicode.com/posts?userId=1");
  // }

  addPost(post: Post){
    return this.http.post<Post>(`https://jsonplaceholder.typicode.com/posts`,post);
  }

  updatePost(id: number,post: Post){
    return this.http.put<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`, post);
  }
  
  deletePost(id: number){
    return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

}
