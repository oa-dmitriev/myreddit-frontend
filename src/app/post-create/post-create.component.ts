import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { Category } from '../pkg/post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  form: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {
    this.form = this.fb.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      text: ['', Validators.required],
    });
    this.postService.getCategories().subscribe(
      (res) => {
        this.categories = res;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  ngOnInit(): void {}

  create() {
    const val = this.form.value;
    console.log('category: ', val.category);
    console.log('title: ', val.title);
    console.log('text: ', val.text);

    this.postService.create(val.category, val.title, val.text).subscribe(
      (res) => {
        console.log('Success');
        this.router.navigate(['/posts']);
      },
      (err) => console.log('failure')
    );
  }
  replaceString(s: string) {
    s = s.split('-').join(' ');
    s = s.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase());
    return s;
  }
}
