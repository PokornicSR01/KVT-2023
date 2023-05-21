import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../../model/post.model";
import { PostService } from "../../service/post.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  @Input() posts: Post[];

  constructor(private postService: PostService) {}

  ngOnInit() {}

  deletePost(postId: number) {
    this.postService.delete(postId).subscribe((post) => {
    });
  }
}
