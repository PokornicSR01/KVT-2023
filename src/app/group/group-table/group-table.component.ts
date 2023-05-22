import { Component, Input, OnInit } from "@angular/core";
import { Group } from "../model/group.model";
import { GroupService } from "../service/group.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-group-table",
  templateUrl: "./group-table.component.html",
  styleUrls: ["./group-table.component.css"],
})
export class GroupTableComponent implements OnInit {
  @Input() groups: Group[];
  editing = false;
  form: FormGroup;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  notification: any;
  returnUrl: string;

  constructor(
    private groupService: GroupService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  deleteGroup(groupId: number) {
    this.groupService.delete(groupId).subscribe((group) => {
      this.router.navigate([""]);
    });
  }

  editGroup(groupId, groupName, groupDesc) {
    this.editing = true;

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.form = this.formBuilder.group({
      id: groupId,
      name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
      description: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });
    this.form.get("name").setValue(groupName);
    this.form.get("description").setValue(groupDesc);
  }

  onSubmit() {
    this.groupService.edit(this.form.value).subscribe((result) => {});
  }
}
