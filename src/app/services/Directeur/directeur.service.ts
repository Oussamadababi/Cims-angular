import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DirecteurService {
  constructor(private http: HttpClient) {}
  listerPersonnel() {
    return this.http.get("http://localhost:8082/api/listPersonnels");
  }
  listerPersonnelAyantAffT() {
    return this.http.get("http://localhost:8082/api/list_T_Personnel");
  }
  //---------------------------------------------------------------------------
  listerSite() {
    return this.http.get("http://localhost:8082/api/listSites");
  }
  getSitesParGouv(idGouv: number, id_personnel: number) {
    return this.http.get(
      "http://localhost:8082/api/listSiteGP/" + idGouv + "/" + id_personnel
    );
  }
  //------------------------------------------------------------------------------------------
  listerGouvernorats() {
    return this.http.get("http://localhost:8082/api/listGouvernorats");
  }
  //---------------------------------------------------------------------------
  //list aff p validee
  listerAffPValidees() {
    return this.http.get(
      "http://localhost:8082/api/listAffectation_P_Validees"
    );
  }
  MissAcc() {
    return this.http.get(
      "http://localhost:8082/api/listMissionAffectationAccomplie/"
    );
  }
  //list aff p refusées
  listerAffPRefusées() {
    return this.http.get(
      "http://localhost:8082/api/listAffectation_P_Refusees"
    );
  }
  //list aff p en attente
  listerAffPEnAttente() {
    return this.http.get(
      "http://localhost:8082/api/listAffectation_P_EnAttente"
    );
  }

  addAffP(AffectationPartielle: object) {
    return this.http.post(
      "http://localhost:8082/api/addAffectation_P",
      AffectationPartielle
    );
  }
  updateAffectationP(idAffect: number, AffectationPartielle: object) {
    return this.http.put(
      "http://localhost:8082/api/updateAffectation_P/" + idAffect,
      AffectationPartielle
    );
  }
  deleteAffectationP(idAffect: number) {
    return this.http.delete(
      "http://localhost:8082/api/deleteAffectation_P/" + idAffect
    );
  }
  //-----------------------------------------------------------------------------------------------
  listerAffTot() {
    return this.http.get("http://localhost:8082/api/listAffectation_T");
  }

  //Ordre affectation ---------------------------------------------------------------------------
  getOrdreOfAff(idAffect: number) {
    return this.http.get("http://localhost:8082/api/getOrdreOfAff/" + idAffect);
  }
  pdfAffReport(idO_Aff: number) {
    const headers = new HttpHeaders();
    return this.http.get("http://localhost:8082/api/pdfreport/" + idO_Aff, {
      responseType: "blob"
    });
  }
  getOrdreOfMiss(idMission: number) {
    return this.http.get(
      "http://localhost:8082/api/getOrdreOfMiss/" + idMission
    );
  }
  pdfmissionReport(idO_Miss: number) {
    const headers = new HttpHeaders();
    return this.http.get(
      "http://localhost:8082/api/missionReport/" + idO_Miss,
      {
        responseType: "blob"
      }
    );
  }
  ///////////
  getJours(id_personnel: number, dateD: Date, dateF: Date) {
    return this.http.get(
      "http://localhost:8082/api/listJours/" +
        id_personnel +
        "/" +
        dateD +
        "/" +
        dateF
    );
  }
}
