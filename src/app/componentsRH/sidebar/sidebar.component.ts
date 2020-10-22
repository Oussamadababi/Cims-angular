import { Component, OnInit } from "@angular/core";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  etat: boolean;
  click: string;
  children: children[];
}
declare interface children {
  path: string;
  title: string;
  icon: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "dashboard", title: "Dashboard", icon: "dashboard", class: "", etat: false,
    click: "",
    children: []
  },

  {
    path: "List_AffectationsTotales",
    title: "Les Affectations Totales",
    icon: "content_paste",
    class: "",
    etat: false,
    click: "Nothing()",
    children: []
  },
  {
    path: "List_AffectationsPartielles",
    title: "Les Affectations Partielles",
    icon: "content_paste",
    class: "",
    etat: false,
    click: "Nothing()",
    children: []
  },
  {
    path: "List_Personnels",
    title: "Gérer les personnels",
    icon: "account_box",
    class: "",
    etat: false,
    click: "Nothing()",
    children: []
  },
  {
    path: "",
    title: "Parametrage",
    icon: "local_hospital",
    class: "",
    etat: false,
    click: "ShowChildren()",
    children: [
      {
        path: "List_Sites",
        title: "Gérer les sites",
        icon: "local_hospital"
      },
      {
        path: "List_Grades",
        title: "Gérer les grades",
        icon: "local_hospital"
      },
      {
        path: "List_Departements",
        title: "Gérer les Departements",
        icon: "local_hospital"
      }


    ]
  },
  {
    path: "Gestion_Conge",
    title: "Gestion Conge",
    icon: "content_paste",
    class: "",
    click: "ShowChildren()",
    etat: false,
    children: [
      {
        path: "ConsulterSolde",
        title: "Consulter Solde",
        icon: "done_all"
      },
      {
        path: "SoldeCompensation",
        title: "Ajouter Solde-Compensation",
        icon: "done_all"
      }


    ]
  },

  {
    path: "Absence",
    title: "Gérer L'Absence",
    icon: "content_paste",
    class: "",
    click: "ShowChildren()",
    etat: false,
    children: [
      {
        path: "AbsencePersonnelSJ",
        title: "Absence Sans justification",
        icon: "done_all"
      }
    ]
  },
  {
    path: "Retard",
    title: "les Retards",
    icon: "alarm",
    class: "",
    click: "ShowChildren()",
    etat: false,
    children: [{
      path: "ListeRetardPersonnel",
      title: "Liste Des Retards des personnels",
      icon: "done_all"
    }]
  },
  {
    path: "RecuperationSoldeRepos",
    title: "Recuperation Solde Repos",
    icon: "content_paste",
    class: "",
    click: "",
    etat: false,
    children: [
      {
        path: "UpdateSolde",
        title: "Transférer le solde repos",
        icon: "done_all"
      }

    ]
  }

];

@Component({
  selector: "app-sidebarRH",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  ShowChildren(route: any) {
    if (route.title == "Gestion Conge") {
      route.etat = !route.etat;
    }
    if (route.title == "Gérer L'Absence") {
      route.etat = !route.etat;
    }
    if (route.title == "les Retards") {
      route.etat = !route.etat;
    }
    if (route.title == "Parametrage") {
      route.etat = !route.etat;
    }
    if (route.title == "Recuperation Solde Repos") {
      route.etat = !route.etat;
    }

  }
  Nothing() {
    console.log("");
  }

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
