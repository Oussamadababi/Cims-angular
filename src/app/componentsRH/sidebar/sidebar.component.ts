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
    title: "Liste des personnels",
    icon: "account_box",
    class: "",
    etat: false,
    click: "Nothing()",
    children: []
  },
  {
    path: "List_Sites",
    title: "Liste des sites",
    icon: "local_hospital",
    class: "",
    etat: false,
    click: "Nothing()",
    children: []
  },
  {
    path: "List_Grades",
    title: "Liste des grades",
    icon: "grade",
    class: "",
    etat: false,
    click: "Nothing()",
    children: []
  },
  {
    path: "List_Departements",
    title: "Liste des Departements",
    icon: "apartment",
    class: "",
    etat: false,
    click: "Nothing()",
    children: []
  },
  {
    path: "Gestion_Conge",
    title: "GestionConge",
    icon: "content_paste",
    class: "",
    click: "ShowChildren()",
    etat: false,
    children: [
      {
        path: "ConsulterSolde",
        title: "ConsulterSolde",
        icon: "done_all"
      },

    ]
  },

  {
    path: "Absence",
    title: "Absence",
    icon: "content_paste",
    class: "",
    click: "",
    etat: false,
    children: []
  },
  {
    path: "RecuperationSoldeRepos",
    title: "RecuperationSoldeRepos",
    icon: "content_paste",
    class: "",
    click: "",
    etat: false,
    children: []
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
    if (route.title == "GestionConge") {
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
