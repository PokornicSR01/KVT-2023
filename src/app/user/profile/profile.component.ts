import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "src/app/service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user = this.userService.currentUser;
  userGroups?: any;
  friendRequests?: any;
  friends?: any;
  userForm = {};
  form: FormGroup;
  editing = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.findUserGroups();
    this.findUserFriendRequests();
    this.findUserFriends();

    this.form = this.formBuilder.group({
      firstName: [
        this.user.firstName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
      lastName: [
        this.user.lastName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ]),
      ],
      description: [
        this.user.description,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ]),
      ],
    });
  }

  onSubmit() {
    this.userService.changeProfile(this.form.value).subscribe();
  }

  editProfile() {
    this.editing = true;
  }

  findUserGroups() {
    this.userService
      .findUserGroups(this.user.id)
      .subscribe((userGroups) => (this.userGroups = userGroups));
  }

  findUserFriendRequests() {
    this.userService
      .findUserFriendRequests(this.user.id)
      .subscribe((friendRequests) => (this.friendRequests = friendRequests));
  }

  findUserFriends() {
    this.userService
      .findUserFriends(this.user.id)
      .subscribe((friends) => (this.friends = friends));
  }

  approveFriendRequest(requestId: number) {
    this.userService.approveFriendRequest(requestId).subscribe();
  }

  declineFriendRequest(requestId: number) {
    this.userService.declineFriendRequest(requestId).subscribe();
  }
}
