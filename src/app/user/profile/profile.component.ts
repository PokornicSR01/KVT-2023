import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "src/app/service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user = this.userService.currentUser;

  constructor(private userService: UserService) {}

  ngOnInit() {
    console.log(this.user);
  }
}
