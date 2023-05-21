import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { AddPostTemplateComponent } from "./post/add-post-template/add-post-template.component";
import { AddGroupTemplateComponent } from "./group/add-group-template/add-group-template.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignUpComponent,
  },
  {
    path: "posts/add",
    component: AddPostTemplateComponent,
  },
  {
    path: "groups/add",
    component: AddGroupTemplateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
