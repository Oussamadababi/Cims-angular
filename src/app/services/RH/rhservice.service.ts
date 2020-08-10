import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class RHService {
  constructor(private http: HttpClient) { }

  listerSite() {
    return this.http.get("http://localhost:8082/api/listSites");
  }
  updateSite(idSite: number, site: object) {
    return this.http.put(
      "http://localhost:8082/api/updateSite/" + idSite,
      site
    );
  }
  addSite(site: object) {
    return this.http.post("http://localhost:8082/api/addSite", site);
  }
  deleteSite(idSite: number) {
    return this.http.delete("http://localhost:8082/api/deleteSite/" + idSite);
  }
  getSitesParGouv(idGouv: number) {
    return this.http.get("http://localhost:8082/api/listSiteG/" + idGouv);
  }

  //--------------------------------------------------------------------------------------------------------------
  listerGrades() {
    return this.http.get("http://localhost:8082/api/listGrades");
  }
  updateGrade(id_grade: number, grade: object) {
    return this.http.put(
      "http://localhost:8082/api/updateGrade/" + id_grade,
      grade
    );
  }
  addGrade(grade: object) {
    return this.http.post("http://localhost:8082/api/addGrade", grade);
  }
  deleteGrade(id_grade: number) {
    return this.http.delete(
      "http://localhost:8082/api/deleteGrade/" + id_grade
    );
  }
  //---------------------------------------------------------------------------------------

  listerPersonnel() {
    return this.http.get("http://localhost:8082/api/listPersonnels");
  }
  updatePersonnel(id_personnel: number, personnel: object) {
    return this.http.put(
      "http://localhost:8082/api/updatePersonnel/" + id_personnel,
      personnel
    );
  }
  addPersonnel(personnel: object) {
    return this.http.post("http://localhost:8082/api/addPersonnel", personnel);
  }
  deletePersonnel(id_personnel: number) {
    return this.http.delete(
      "http://localhost:8082/api/deletePersonnel/" + id_personnel
    );
  }
  //---------------------------------------------------------------------------
  listerDepartements() {
    return this.http.get("http://localhost:8082/api/listDepartements");
  }
  updateDepartement(id_dept: number, departement: object) {
    return this.http.put(
      "http://localhost:8082/api/updateDepartement/" + id_dept,
      departement
    );
  }
  addDepartement(departement: object) {
    return this.http.post(
      "http://localhost:8082/api/addDepartement",
      departement
    );
  }
  deleteDepartement(id_dept: number) {
    return this.http.delete(
      "http://localhost:8082/api/deleteDepartement/" + id_dept
    );
  }
  //------------------------------------------------------------------------------------------
  listerGouvernorats() {
    return this.http.get("http://localhost:8082/api/listGouvernorats");
  }

  //-------------------------------------------------------------------------------------------

  listerAffP() {
    return this.http.get(
      "http://localhost:8082/api/listMissionAffectationAccomplie/"
    );
  }
  //-----------------------------------------------------------------------------------------------
  listerAffTot() {
    return this.http.get("http://localhost:8082/api/listAffectation_T");
  }
  addAffTot(AffectationTotale: object) {
    return this.http.post(
      "http://localhost:8082/api/addAffectation_T",
      AffectationTotale
    );
  }
  listPersonnelsSansAffecT() {
    return this.http.get("http://localhost:8082/api/listPersonnelsSansAffecT");
  }
  updateAffTot(idAffectT: number, AffectationTotale: object) {
    return this.http.put(
      "http://localhost:8082/api/updateAffectation_T/" + idAffectT,
      AffectationTotale
    );
  }
  deleteAffTot(idAffectT: number) {
    return this.http.delete(
      "http://localhost:8082/api/deleteAffectation_T/" + idAffectT
    );
  }
  //------------------------------------------------------------------------------------------------
  DashAffpardate(): Observable<any> {
    return this.http.get("http://localhost:8082/api/listerAffpardate");
  }

  getNbrMissionToday() {
    return this.http.get("http://localhost:8082/api/getNbrMissionToday");
  }

  getNbrAffectValidee() {
    return this.http.get("http://localhost:8082/api/getNbrAffectValidee");
  }

  getNbrAffectRefusee() {
    return this.http.get("http://localhost:8082/api/getNbrAffectRefusee");
  }

  getNbrPersonnel() {
    return this.http.get("http://localhost:8082/api/getNbrPersonnel");
  }

  DashAffparGouv(): Observable<any> {
    return this.http.get("http://localhost:8082/api/listerAffparGouv");
  }
  ////
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
  ////////////////////////////////////////////////////////////////////
  ajouterConge(Conge: object, personnel_id: number) {
    return this.http.post("http://localhost:8082/api/ajouterConge/" + personnel_id, Conge);
  }
  listConge() {
    return this.http.get(
      "http://localhost:8082/api/listconge"
    );
  }
  deleteConge(idConge: number) {
    return this.http.delete(
      "http://localhost:8082/api/deleteConge/" + idConge
    );
  }
  updateConge(id_conge: number, Conge: object) {
    return this.http.put(
      "http://localhost:8082/api/updateConge/" + id_conge,
      Conge
    );
  }
  ///////////////////////////////////////////////////////////////////////
  ajouterAbsence(personnel_id: number, datedejour: Date) {
    return this.http.put("http://localhost:8082/api/ListeAbsence/" + personnel_id + "/" + datedejour, {}
    );

  }
  getListeAbsenceParDate(datedejour: Date) {
    return this.http.get("http://localhost:8082/api/listAbsenceParJour/" + datedejour);
  }
  deletePersonnelFromListeAbsence(personnel_id: number, datedejour: Date) {
    return this.http.put(
      "http://localhost:8082/api/supprimerPersonnelDeLaListe/" + personnel_id + "/" + datedejour, {}
    );
  }
  ajouterAnnulationConge(conge_id: number) {
    return this.http.post("http://localhost:8082/api/ajouterAConge/" + conge_id, {});
  }
  congeparPersonnelenattente(personnel_id: number) {
    return this.http.get("http://localhost:8082/api/congeparpersonnel/" + personnel_id);
  }
  annulationCongeenAttente(personnel_id: number) {
    return this.http.get("http://localhost:8082/api/AnulationCongeenattente/" + personnel_id);
  }
  listAnnulationConge() {
    return this.http.get(
      "http://localhost:8082/api/listannulationconge"
    );
  }
  AccepterAConge(idAConge: number) {
    return this.http.put(
      "http://localhost:8082/api/accepterAnnulationConge/" + idAConge, {}
    );
  }
  RefusererAConge(idAConge: number) {
    return this.http.put(
      "http://localhost:8082/api/refuserAnnulationConge/" + idAConge, {}
    );
  }
  RefusererConge(idConge: number) {
    return this.http.put(
      "http://localhost:8082/api/refuserConge/" + idConge, {}
    );
  }
  AccepterConge(idConge: number) {
    return this.http.put(
      "http://localhost:8082/api/accepterConge/" + idConge, {}
    );
  }

}
