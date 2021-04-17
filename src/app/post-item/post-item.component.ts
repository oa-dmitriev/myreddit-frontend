import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Post } from '../pkg/post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
})
export class PostItemComponent implements OnInit {
  @Input() post?: Post;
  heartClass = 'fa-heart-o';

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.getUserId().subscribe((id) => {
      this.post?.votes?.forEach((user) => {
        if (user.id === id) {
          this.heartClass = 'fa-heart';
        }
      });
    });
  }

  toggleLike(category: string, postId: string) {
    if (this.auth.isLoggedIn()) {
      this.postService.like(category, postId).subscribe(
        (res) => {
          if (res.like && this.auth.isLoggedIn()) {
            this.heartClass = 'fa-heart';
          } else {
            this.heartClass = 'fa-heart-o';
          }
          this.post = res.post;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
