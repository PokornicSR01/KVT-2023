import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService, UserService } from "../service";
import { Subject } from "rxjs/Subject";
import { takeUntil } from "rxjs/operators";

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  title = "Sign up";
  form: FormGroup;

  submitted = false;

  notification: DisplayMessage;

  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: DisplayMessage) => {
        this.notification = params;
      });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.form = this.formBuilder.group({
      username: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ]),
      ],
      firstName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
      lastName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {
    this.notification = undefined;
    this.submitted = true;

    this.authService.signup(this.form.value).subscribe(
      (data) => {
        console.log(data);
        this.authService.login(this.form.value).subscribe(() => {
          this.userService.getMyInfo().subscribe();
        });
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        this.submitted = false;
        console.log("Sign up error");
        this.notification = {
          msgType: "error",
          msgBody: error["error"].message,
        };
      }
    );
  }
}
