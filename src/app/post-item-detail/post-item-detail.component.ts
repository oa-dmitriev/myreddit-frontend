import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Post } from '../pkg/post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-item-detail',
  templateUrl: './post-item-detail.component.html',
  styleUrls: ['./post-item-detail.component.css'],
})
export class PostItemDetailComponent implements OnInit {
  post?: Post;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    const category = this.route.snapshot.paramMap.get('category') || '';
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.postService.getById(category, id).subscribe(
      (res) => {
        this.post = res;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  leaveComment(comment: any) {
    const commentMessage = comment.value || '';
    const postId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Comment: ', comment.value, postId);
    if (commentMessage != '' && postId != '') {
      this.postService.newComment(commentMessage, postId).subscribe(
        (res) => {
          this.post = res;
        },
        (err) => {
          console.log(err);
        }
      );
    }
    comment.value = '';
  }

  deleteComment(commentId: string) {
    const postId = this.route.snapshot.paramMap.get('id') || '';
    if (commentId != '' && postId != '') {
      this.postService.deleteComment(postId, commentId).subscribe(
        (res) => {
          this.post = res
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
