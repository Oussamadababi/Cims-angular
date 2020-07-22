import { Component, OnInit } from "@angular/core";
import { AffPValideesComponent } from "../../layouts/Directeur-layout/AffectationsPartiellesDirecteur/aff-pvalidees/aff-pvalidees.component";

declare const $: any;
declare interface children {
  path: string;
  title: string;
  icon: string;
}
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children: children[];
  etat: boolean;
  click: string;
}
export const ROUTES: RouteInfo[] = [
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
    path: "Affectations_Totales",
    title: "Les affectations totales",
    icon: "content_paste",
    class: "",
    etat: false,
    click: "Nothing()",
    children: []
  },
  {
    path: "Affectations_partielles",
    title: "Les affectations partielles",
    icon: "content_paste",
    class: "",
    click: "ShowChildren()",
    etat: false,
    children: [
      {
        path: "Affectations_partiellesV",
        title: "Affectations Validées",
        icon: "done_all"
      },
      {
        path: "Affectations_partiellesR",
        title: "Affectations Refusées",
        icon: "close"
      }
    ]
  }
];

@Component({
  selector: "app-sidebarDirecteur",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  childItems: any[];
  ShowChildren(route: any) {
    if (route.title == "Les affectations partielles") {
      route.etat = !route.etat;
    }
  }
  Nothing() {
    console.log("");
  }
  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.childItems = ROUTES.filter(childItem => childItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
