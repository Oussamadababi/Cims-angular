import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class PersonnelService {
  constructor(private http: HttpClient) { }
  getAffPparPersonnel() {
    return this.http.get(
      "http://localhost:8082/api/listAffectation_P_Personnel"
    );
  }
  getMission(idMission: number) {
    return this.http.get("http://localhost:8082/api/getMission/" + idMission);
  }
  updateMission(idMission: number, Mission: object) {
    return this.http.put(
      "http://localhost:8082/api/updateMission/" + idMission,
      Mission
    );
  }
  updateOrdreMission(idOrdre: number, OrdreMission: object) {
    return this.http.put(
      "http://localhost:8082/api/updateOrdreM/" + idOrdre,
      OrdreMission
    );
  }
  getMissionsparAffect(idAffect: number) {
    return this.http.get(
      "http://localhost:8082/api/listMissionAffectation/" + idAffect
    );
  }
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
  DashlisterMissParAffecP(): Observable<any> {
    return this.http.get("http://localhost:8082/api/listerMissParAffecP");
  }
  DashlisterMissParMois(): Observable<any> {
    return this.http.get("http://localhost:8082/api/listerMissParMois");
  }
  nbrMissionAccomplie() {
    return this.http.get("http://localhost:8082/api/nbrMissionAccomplie");
  }
  nbrMissionNonAccomplie() {
    return this.http.get("http://localhost:8082/api/nbrMissionNonAccomplie");
  }
  demandeConge(Conge: object, personnel_id: number) {
    return this.http.post("http://localhost:8082/api/demanderConge/" + personnel_id, Conge);
  }
  listCongeParPersonnel(personnel_id: number) {
    return this.http.get(
      "http://localhost:8082/api/listcongeparPersonnel/" + personnel_id
    );
  }
  deleteConge(idConge: number) {
    return this.http.delete(
      "http://localhost:8082/api/deleteConge/" + idConge
    );
  }
  congeparPersonnelenattenteCompte(personnel_id: number) {
    return this.http.get("http://localhost:8082/api/congeparpersonnelCompte/" + personnel_id);
  }
  ajouterAnnulationConge(conge_id: number) {
    return this.http.post("http://localhost:8082/api/ajouterAConge/" + conge_id, {});
  }
  annulationCongeparPersonnel(personnel_id: number) {
    return this.http.get("http://localhost:8082/api/AnulationConge/" + personnel_id);
  }

}
