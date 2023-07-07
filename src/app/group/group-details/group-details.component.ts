import { Component, OnInit } from "@angular/core";
import { GroupService } from "../service/group.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/service";
import { CommentService } from "src/app/service/comment.service";

@Component({
  selector: "app-group-details",
  templateUrl: "./group-details.component.html",
  styleUrls: ["./group-details.component.css"],
})
export class GroupDetailsComponent implements OnInit {
  loggedUser?: any;

  group?: any;
  groupRequests: any;
  groupMembers: any;
  groupAdmins: any;
  groupPosts: any;
  id = Number(this.route.snapshot.paramMap.get("id"));

  post = {};
  form: FormGroup;

  suspend = {};
  suspendForm: FormGroup;
  suspending = false;

  selectedPost: any;
  watchingComments = false;
  comments: any;

  commenting = false;
  comment = {};
  formComment: FormGroup;

  reply = {};
  formReply: FormGroup;
  replies: any;
  watchingReplies = false;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.getGroup();
    this.getGroupRequests();
    this.getGroupAdmins(this.id);
    this.getGroupMembers(this.id);
    this.getGroupPosts(this.id);
    this.getLoggedUser();

    this.form = this.formBuilder.group({
      content: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });

    this.suspendForm = this.formBuilder.group({
      content: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });

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

  getGroup(): void {
    this.groupService
      .getGroup(this.id)
      .subscribe((group) => (this.group = group));
  }

  sendGroupRequest(): void {
    this.groupService.sendGroupRequest(this.id).subscribe();
  }

  promoteMember(memberId: number): void {
    this.groupService.promoteMember(this.id, memberId).subscribe();
  }

  getGroupRequests(): void {
    this.groupService
      .getGroupRequests(this.id)
      .subscribe((groupRequests) => (this.groupRequests = groupRequests));
  }

  suspendGroup(): void {
    this.suspending = true;
  }

  approveRequest(requestId: number): void {
    this.groupService.approveRequest(requestId).subscribe();
  }

  declineRequest(requestId: number): void {
    this.groupService.declineRequest(requestId).subscribe();
  }

  getGroupAdmins(groupId: number): void {
    this.groupService
      .getGroupAdmins(groupId)
      .subscribe((groupAdmins) => (this.groupAdmins = groupAdmins));
  }

  getGroupPosts(groupId: number): void {
    this.groupService
      .getGroupsPosts(groupId)
      .subscribe((groupPosts) => (this.groupPosts = groupPosts));
  }

  getGroupMembers(groupId: number): void {
    this.groupService
      .getGroupsMembers(groupId)
      .subscribe((groupMembers) => (this.groupMembers = groupMembers));
  }

  onSubmit(): void {
    this.groupService.addGroupPost(this.form.value, this.id).subscribe();
  }

  onSubmitSuspend(): void {
    this.groupService.suspendGroup(this.form.value, this.id).subscribe();
  }

  getLoggedUser(): void {
    const user = this.userService.currentUser;
    this.loggedUser = user.username;
  }

  isGroupAdmin(): boolean {
    let userIsAdmin = false;

    this.groupAdmins.forEach((admin) => {
      if (admin.username === this.loggedUser) {
        userIsAdmin = true;
      }
    });

    return userIsAdmin;
  }

  isAdmin(): boolean {
    let userIsAdmin = false;
    let currentUser = this.userService.currentUser;
    if (currentUser.role == "ADMIN") {
      userIsAdmin = true;
    }
    return userIsAdmin;
  }

  isUserAdmin(username: string): boolean {
    let userIsAdmin = false;

    this.groupAdmins.forEach((admin) => {
      if (admin.username === username) {
        userIsAdmin = true;
      }
    });

    return userIsAdmin;
  }

  isMember(): boolean {
    let userIsMember = false;

    this.groupMembers.forEach((member) => {
      if (member.username === this.loggedUser) {
        userIsMember = true;
      }
    });

    return userIsMember;
  }

  onSeeComments(post, postId) {
    this.selectedPost = post;
    this.watchingComments = true;
    this.commentService.getPostComments(postId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  onSubmitReply(commentId) {
    this.commentService
      .reply(this.formReply.value, commentId)
      .subscribe((result) => {});
  }

  onSubmitComment(postId) {
    this.commentService
      .create(this.formComment.value, postId)
      .subscribe((result) => {});
  }

  deleteGroup(groupId: number) {
    this.groupService.delete(groupId).subscribe((group) => {});
  }
}
