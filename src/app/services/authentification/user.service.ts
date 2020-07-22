import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const API_URL = "http://localhost:8082/api/test/";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPersonnelBoard(): Observable<any> {
    return this.http.get(API_URL + "CORRESPONDANT", { responseType: "text" });
  }

  getRHBoard(): Observable<any> {
    return this.http.get(API_URL + "RH", { responseType: "text" });
  }

  getchefServiceBoard(): Observable<any> {
    return this.http.get(API_URL + "chefService", { responseType: "text" });
  }

  getdirecteurBoard(): Observable<any> {
    return this.http.get(API_URL + "directeur", { responseType: "text" });
  }

  showProfile() {
    return this.http.get("http://localhost:8082/api/auth/profil");
  }
}
