import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { UserService } from "../services/authentification/user.service";
import { AuthentificationService } from "../services/authentification/authentification.service";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.css"]
})
export class ProfilComponent implements OnInit {
  form: any = {};
  pass2: String;
  nom: String;
  prenom: String;
  grade: String;
  dep: String;
  email: String;
  mobile: number;
  sexe: String;
  passwordDuplique = false;

  errorMessage = "";
  constructor(
    private location: Location,
    private AuthentificationService: AuthentificationService,
    private UserService: UserService
  ) {}
  gotoHome() {
    this.location.back();
  }

  ngOnInit(): void {
    this.UserService.showProfile().subscribe(res => {
      console.log(res["personnel"]);
      this.nom = res["personnel"].nom;
      this.prenom = res["personnel"].prenom;
      this.grade = res["personnel"].grade.nom_grade;
      this.dep = res["personnel"].departement.nom_dept;
      this.email = res["personnel"].email;
      this.mobile = res["personnel"].telephone;
      this.sexe = res["personnel"].sexe;
    });
  }
  onSubmit() {
    var error: any;
    console.log(this.form.password);
    console.log(this.pass2);
    if (this.form.password == this.pass2) {
      this.passwordDuplique == false;

      this.AuthentificationService.updatePassword(this.form).subscribe(
        data => {
          console.log(data);
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
    } else {
      console.log("true");
      this.passwordDuplique == true;
    }
  }
}
