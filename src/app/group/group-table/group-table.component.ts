import { Component, Input, OnInit } from "@angular/core";
import { Group } from "../model/group.model";
import { GroupService } from "../service/group.service";

@Component({
  selector: "app-group-table",
  templateUrl: "./group-table.component.html",
  styleUrls: ["./group-table.component.css"],
})
export class GroupTableComponent implements OnInit {
  @Input() groups: Group[];

  constructor(private groupService: GroupService) {}

  ngOnInit() {}

  deleteGroup(groupId: number) {
    this.groupService.delete(groupId).subscribe((group) => {});
  }
}
