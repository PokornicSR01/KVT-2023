import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GroupService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  postUrl = "http://localhost:8080/api/groups";

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.postUrl + "/all");
  }

  add(newGroup) {
    return this.http.post(this.postUrl + "/create", JSON.stringify(newGroup), {
      headers: this.headers,
      responseType: "text",
    });
  }

  delete(groupId: number): Observable<number> {
    return this.http.delete<number>(this.postUrl + "/?id=" + groupId);
  }
}
