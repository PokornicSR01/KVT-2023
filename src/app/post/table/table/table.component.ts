import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../../model/post.model";
import { PostService } from "../../service/post.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { CommentService } from "src/app/service/comment.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  @Input() posts: Post[];
  editing = false;
  form: FormGroup;
  returnUrl: string;
  notification: any;
  selectedPost: any;

  commenting = false;
  comment = {};
  formComment: FormGroup;
  comments: any;
  watchingComments = false;

  reply = {};
  formReply: FormGroup;
  replies: any;
  watchingReplies = false;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.formComment = this.formBuilder.group({
      commentText: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });

    this.formReply = this.formBuilder.group({
      commentText: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });
  }

  deletePost(postId: number) {
    this.postService.delete(postId).subscribe((post) => {});
  }

  editPost(postId, postContent) {
    this.editing = true;

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

    this.form = this.formBuilder.group({
      id: postId,
      content: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });
    this.form.get("content").setValue(postContent);
  }

  createComment(postId: number) {
    this.commentService
      .create(this.formComment, postId)
      .subscribe((result) => {});
  }

  startCommenting() {
    this.commenting = true;
  }

  onSubmitComment(postId) {
    this.commentService
      .create(this.formComment.value, postId)
      .subscribe((result) => {});
  }

  onSubmitReply(commentId) {
    this.commentService
      .reply(this.formReply.value, commentId)
      .subscribe((result) => {});
  }

  onSubmit() {
    this.postService.edit(this.form.value).subscribe((result) => {});
  }

  onSeeComments(post, postId) {
    this.selectedPost = post;
    this.watchingComments = true;
    this.commentService.getPostComments(postId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  seeReplies(commentId) {
    this.watchingReplies = true;
    this.commentService.getCommentReplies(commentId).subscribe((replies) => {
      this.replies = replies;
    });
  }
}
