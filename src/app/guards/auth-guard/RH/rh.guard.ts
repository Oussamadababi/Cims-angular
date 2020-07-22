import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "../../../services/authentification/token-storage.service";
@Injectable({
  providedIn: "root"
})
export class RhGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let token = sessionStorage.getItem("auth-token");
    if (token == null && this.tokenStorage.getUser().roles == "ROLE_RH") {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
