import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { UserMenuComponent } from "./user-menu/user-menu.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

import { AngularMaterialModule } from "./angular-material/angular-material.module";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ApiService } from "./service/api.service";
import { AuthService } from "./service/auth.service";
import { UserService } from "./service/user.service";
import { ConfigService } from "./service/config.service";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./interceptor/TokenInterceptor";
import { TableComponent } from "./post/table/table/table.component";
import { PostListComponent } from "./post/post-list/post-list/post-list.component";
import { NavbarAdminComponent } from './core/navbar-admin/navbar-admin.component';
import { NavbarUserComponent } from './core/navbar-user/navbar-user.component';
import { AddPostTemplateComponent } from './post/add-post-template/add-post-template.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserMenuComponent,
    LoginComponent,
    SignUpComponent,
    TableComponent,
    PostListComponent,
    NavbarAdminComponent,
    NavbarUserComponent,
    AddPostTemplateComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    AuthService,
    ApiService,
    UserService,
    ConfigService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
