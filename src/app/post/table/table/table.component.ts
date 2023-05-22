import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../../model/post.model";
import { PostService } from "../../service/post.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  @Input() posts: Post[];
  editing = false;
  form: FormGroup;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  returnUrl: string;
  notification: any;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  deletePost(postId: number) {
    this.postService.delete(postId).subscribe((post) => {});
  }

  editPost(postId, postContent) {
    this.editing = true;

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

  onSubmit() {
    this.postService.edit(this.form.value).subscribe((result) => {});
  }
}
