import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, Comment, Category } from './pkg/post';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  postsUrl = 'https://myreddit-backend.herokuapp.com/api/posts';
  categoryUrl = 'https://myreddit-backend.herokuapp.com/api/category';
  // postsUrl = '/api/posts';
  // categoryUrl = '/api/category';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(this.postsUrl);
  }

  getById(category: string, id: string) {
    const url = `${this.postsUrl}/${category}/${id}`;
    return this.http.get<any>(url);
  }

  getByCategory(category: string) {
    if (category == '') {
      return this.http.get<any>(this.postsUrl);
    }
    const url = `${this.postsUrl}/${category}`;
    return this.http.get<any>(url);
  }

  create(category: string, title: string, text: string) {
    const body: Post = { category: category, title: title, text: text };
    return this.http.post<any>(this.postsUrl, body);
  }

  createCategory(name: string, description: string) {
    const url = `/category`;
    const body: Category = { name: name, description: description };
    return this.http.post<any>(this.categoryUrl, body);
  }

  getCategories() {
    return this.http.get<any>(this.categoryUrl);
  }

  newComment(msg: string, postId: string) {
    const url = `${this.postsUrl}/${postId}`;
    const comment: Comment = { body: msg };
    return this.http.post<any>(url, comment);
  }

  deleteComment(postId: string, commentId: string) {
    const url = `${this.postsUrl}/${postId}/${commentId}`;
    return this.http.delete<any>(url);
  }

  deletePost(postId: string) {
    const url = `${this.postsUrl}/${postId}`;
    return this.http.delete<any>(url);
  }

  like(category: string, postId: string) {
    const url = `${this.postsUrl}/${category}/${postId}/like`;
    return this.http.get<any>(url);
  }
}
