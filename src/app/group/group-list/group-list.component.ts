import { Component, OnInit } from "@angular/core";
import { Group } from "../model/group.model";
import { GroupService } from "../service/group.service";

@Component({
  selector: "app-group-list",
  templateUrl: "./group-list.component.html",
  styleUrls: ["./group-list.component.css"],
})
export class GroupListComponent implements OnInit {
  groupList: Group[] = [];

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.getGroups();
  }

  getGroups(): void {
    this.groupService.getAll().subscribe((groups) => (this.groupList = groups));
  }
}
