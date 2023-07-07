import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "src/app/service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-friend-profile",
  templateUrl: "./friend-profile.component.html",
  styleUrls: ["./friend-profile.component.css"],
})
export class FriendProfileComponent implements OnInit {
  user = this.userService.currentUser;
  userProfile?: any;
  userGroups?: any;
  userPosts?: any;
  userFriends?: any;
  id = Number(this.route.snapshot.paramMap.get("id"));

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.findUserProfile();
    this.findUserGroups();
    this.findUserPosts();
    this.findUserFriends();
  }

  sendFriendRequest() {
    this.userService.sendFriendRequest(this.id).subscribe();
  }

  findUserGroups() {
    this.userService
      .findUserGroups(this.id)
      .subscribe((userGroups) => (this.userGroups = userGroups));
  }

  findUserFriends() {
    this.userService
      .findUserFriends(this.id)
      .subscribe((friends) => (this.userFriends = friends));
  }

  findUserPosts() {
    this.userService
      .findUserPosts(this.id)
      .subscribe((posts) => (this.userPosts = posts));
  }

  findUserProfile() {
    this.userService
      .findUserById(this.id)
      .subscribe((user) => (this.userProfile = user));
  }

  areFriends() {
    let areFriends = false;

    this.userFriends.forEach((friend) => {
      if (friend.username === this.user.username) {
        areFriends = true;
      }
    });

    return areFriends;
  }
}
