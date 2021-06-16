import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Post } from '../pkg/post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService, private route: ActivatedRoute) {
    route.params.subscribe((res) => {
      const category = this.route.snapshot.paramMap.get('category') || '';
      this.postService.getByCategory(category).subscribe(
        (res) => {
          this.posts = res;
        },
        (err) => {
          console.log(err.error);
        }
      );
    });
  }

  ngOnInit(): void {}
}
