import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, Comment } from './pkg/post';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  postsUrl = '/api/posts';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(this.postsUrl);
  }

  getById(category: string, id: string) {
    const url = `${this.postsUrl}/${category}/${id}`;
    return this.http.get<any>(url);
  }

  getByCategory(category: string) {
    const url = `${this.postsUrl}/${category}`;
    return this.http.get<any>(url);
  }

  create(category: string, title: string, text: string) {
    const body: Post = { category: category, title: title, text: text };
    return this.http.post<any>(this.postsUrl, body);
  }

  newComment(msg: string, postId: string) {
    const url = `${this.postsUrl}/${postId}`;
    const comment: Comment = { body: msg };
    return this.http.post<any>(url, comment);
  }

  deleteComment(postId: string, commentId: string) {
    const url = `${this.postsUrl}/${postId}/${commentId}`
    return this.http.delete<any>(url)
  }

  like(category: string, postId: string) {
    const url = `${this.postsUrl}/${category}/${postId}/like`
    return this.http.get<any>(url)
  }
}
