import { Injectable } from "@angular/core";
import {
  HttpClientModule,
  HttpParams,
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { ApiService, ConfigService, UserService } from "src/app/service";
import { HeaderComponent } from "src/app/header/header.component";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  commentUrl = "http://localhost:8080/api/comments";
  postUrl = "http://localhost:8080/api/posts";

  constructor(private http: HttpClient, private router: Router) {}

  create(newComment, postId) {
    return this.http.post(
      this.commentUrl + `/${postId}/create`,
      JSON.stringify(newComment),
      {
        headers: this.headers,
        responseType: "text",
      }
    );
  }

  reply(newComment, commentId) {
    return this.http.post(
      this.commentUrl + `/${commentId}/reply`,
      JSON.stringify(newComment),
      {
        headers: this.headers,
        responseType: "text",
      }
    );
  }

  getCommentReplies(commentId): Observable<any[]> {
    return this.http.get<any[]>(this.commentUrl + `/${commentId}/replies`);
  }

  getPostComments(postId): Observable<any[]> {
    return this.http.get<any[]>(this.postUrl + `/${postId}/comments`);
  }
}
