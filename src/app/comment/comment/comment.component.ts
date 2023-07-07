import { Component, Input, OnInit } from "@angular/core";
import { CommentService } from "src/app/service/comment.service";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"],
})
export class CommentComponent implements OnInit {
  @Input() commentId: any;

  comments: any;

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.commentService
      .getCommentReplies(this.commentId)
      .subscribe((comments) => (this.comments = comments));
  }
}
