import { Component, OnInit } from "@angular/core";
import { Post } from "../../model/post.model";
import { PostService } from "../../service/post.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit {
  postList: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getAll().subscribe((posts) => (this.postList = posts));
  }
}
