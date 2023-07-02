import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { ConfigService } from "./config.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  currentUser;

  constructor(private apiService: ApiService, private config: ConfigService) {}

  getMyInfo() {
    return this.apiService.get(this.config.whoami_url).pipe(
      map((user) => {
        this.currentUser = user;
        return user;
      })
    );
  }

  getAll() {
    return this.apiService.get(this.config.users_url);
  }

  changePassword(user) {
    return this.apiService.put(
      "http://localhost:8080/api/users/changePassword",
      JSON.stringify(user)
    );
  }

  findUserProfile(username: string) {
    return this.apiService
      .get("http://localhost:8080/api/users/" + username + "/profile")
      .subscribe();
  }
}
