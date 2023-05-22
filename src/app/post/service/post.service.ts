import { Injectable } from "@angular/core";
import { Post } from "../model/post.model";
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
export class PostService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  postUrl = "http://localhost:8080/api/posts";

  user = this.userService.getMyInfo();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.postUrl + "/all");
  }

  add(newPost) {
    newPost.userUsername = this.userName();
    return this.http.post(this.postUrl + "/create", JSON.stringify(newPost), {
      headers: this.headers,
      responseType: "text",
    });
  }

  delete(postId: number): Observable<number> {
    console.log(this.postUrl + "/?id=" + postId);
    return this.http.delete<number>(this.postUrl + "/?id=" + postId);
  }

  edit(post) {
    return this.http.put(this.postUrl + "/edit", JSON.stringify(post), {
      headers: this.headers,
      responseType: "text",
    });
  }

  userName() {
    const user = this.userService.currentUser;
    return user.username;
  }
}
