import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Category } from '../pkg/post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    public auth: AuthService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.getCategories();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.postService.getCategories().subscribe(
      (res) => {
        this.categories = res;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  replaceString(s: string) {
    s = s.split('-').join(' ');
    s = s.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase());
    return s;
  }
}
