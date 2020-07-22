import { Component, OnInit } from "@angular/core";
import { AuthentificationService } from "../services/authentification/authentification.service";
import { TokenStorageService } from "../services/authentification/token-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-layout",
  templateUrl: "./login-layout.component.html",
  styleUrls: ["./login-layout.component.css"]
})
export class LoginLayoutComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  roles: string[] = [];

  constructor(
    private authService: AuthentificationService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        //this.reloadPage();
        console.log(this.roles);
        if (this.roles[0] == "ROLE_RH") {
          this.router.navigate(["/RH"]);
        } else if (this.roles[0] == "ROLE_DIRECTEUR") {
          this.router.navigate(["/Directeur"]);
        } else if (this.roles[0] == "ROLE_CHEFSERVCE") {
          this.router.navigate(["/ChefService"]);
        } else if (
          this.roles[0] == "ROLE_CORRESPONDANT" ||
          this.roles[1] == "ROLE_CORRESPONDANT"
        ) {
          this.router.navigate(["/CORRESPONDANT"]);
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(this.roles);
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
