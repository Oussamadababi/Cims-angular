import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(private http: HttpClient) { }
  getNotifById() {
    return this.http.get("http://localhost:8082/api/listNotification");
  }
  makeNotificationsTrue() {
    return this.http.put("http://localhost:8082/api/updateNotification", {});
  }
}
