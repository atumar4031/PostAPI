import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './post';
import { PostsService } from '../service/posts.service';
import { Subject, Subscription, catchError, of } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  // subscriptions
  addSubscription!: Subscription 
  updateSubscription!: Subscription 
  getSubscription!: Subscription 
  deleteSubscription!: Subscription 
  posts: Post[] = []
  error$ = new Subject<String>()
  getError$ = this.error$.asObservable();
  constructor(private postService: PostsService) { }

  post$ = this.postService.getPosts$.pipe(
    catchError(err => {
      console.log(err);
      this.error$.next(err.message)
      return of([])
    })
  )

  ngOnInit(): void {
    // this.getPosts();
  }

  getPosts() {
    this.postService.getPosts$.subscribe(posts => {
      this.posts = posts
    });
  }

  addPost() {
    const post = {
      id: 101,
      title: 'Angular',
      body: 'Getting started',
      userId: 1
    }

    this.addSubscription = this.postService.addPost(post).subscribe(p => {
      this.posts = [...this.posts, p]
    });

  }

  updatePost() {
    const post = {
      id: 1,
      title: 'Java',
      body: 'Java spring framework',
      userId: 1
    }

   this.updateSubscription =  this.postService.updatePost(1, post).subscribe(p => {
      const index = this.posts.findIndex(post => post.id === p.id);
      if (index !== -1) {
        this.posts[index] = p;
      }
    });
    console.log(this.posts)
  }

  showPost(post: Post){
    console.log("DEATAILS ", post)
  }

  deletePost(post: Post){
    this.deleteSubscription = this.postService.deletePost(post.id).subscribe(() => {
      this.posts = this.posts.filter(p => p.id !== post.id)

    });
  }
  
  ngOnDestroy(): void {
    if(this.addSubscription){
      this.addSubscription.unsubscribe();
    }
    // if(this.getSubscription){
    //   this.getSubscription.unsubscribe();
    // }
    if(this.updateSubscription){
      this.updateSubscription.unsubscribe();
    }
    if(this.deleteSubscription){
      this.deleteSubscription.unsubscribe();
    }
  }

}
