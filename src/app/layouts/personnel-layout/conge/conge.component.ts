import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MomentUtcDateAdapter } from "../../chef-service-layout/AffectationsPartiellesCS/datePicker";
import { HttpClient } from "@angular/common/http";
import { PersonnelService } from "../../../services/Personnel/personnel.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";
import { TokenStorageService } from 'app/services/authentification/token-storage.service';
import { RHService } from 'app/services/RH/rhservice.service';


@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css'],
  providers: [

    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter }
  ]
})
export class CongeComponent implements OnInit {

  constructor(private http: HttpClient,
    private PersonnelService: PersonnelService,
    private _snackBar: MatSnackBar,
    private Rhservice: RHService,
    public dialog: MatDialog,
    private tokenStorage: TokenStorageService) { }
  rowData: any;
  rowData1: any;
  id: number;

  personnel: object =
    {
      soldeRepos: "",
      soldeReposN_1: "",
      soldeReposN_2: "",
      soldeCompensation: "",
      soldeExceptionnel: ""

    }
  ngOnInit(): void {
    this.PersonnelService.listCongeParPersonnel(this.tokenStorage.getUser().id).subscribe(res => {
      console.log(res);
      this.rowData = res;
    });
    this.PersonnelService.annulationCongeparPersonnel(this.tokenStorage.getUser().id).subscribe(res => {
      console.log(res);
      this.rowData1 = res;
    });
    this.Rhservice.getPersonnel(this.tokenStorage.getUser().id).subscribe(res => {
      var y: any = res;
      console.log("hhhh");
      this.personnel = y;
    });
  }
  columnDefs = [
    {
      headerName: "numdemande",
      field: "id",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "typedeconge",
      field: "typedeconge",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "datedebut",
      field: "datedebut",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "datefin",
      field: "datefin",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "etat",
      field: "etat",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    }
  ]
  localeText = {
    // Set Filter
    selectAll: 'Séléctionner tout',
    selectAllSearchResults: 'Select All Search Results',
    searchOoo: 'Chercher...',
    blanks: 'Blanks',
    noMatches: 'No matches.',

    // Number Filter & Text Filter
    filterOoo: 'Filtre...',
    equals: 'égale à',
    notEqual: 'différent à',

    // Number Filter
    lessThan: 'Less than',
    greaterThan: 'Greater than',
    lessThanOrEqual: 'Less than or equal',
    greaterThanOrEqual: 'Greater than or equal',
    inRange: 'In range',
    inRangeStart: 'à',
    inRangeEnd: 'De',

    // Text Filter
    contains: 'Contient',
    notContains: 'Ne contient pas',
    startsWith: 'Commence avec',
    endsWith: 'Se termine par',

    // Date Filter
    dateFormatOoo: 'Yyyy-mm-dd',

    // Filter Conditions
    andCondition: 'ET',
    orCondition: 'OU',

    // Filter Buttons
    applyFilter: 'Appliquer',
    resetFilter: 'Réinitialiser',
    clearFilter: 'Effacer',
    cancelFilter: 'Annuler',

    // Side Bar
    columns: 'Colonnes',
    filters: 'Filtres',

    // columns tool panel
    pivotMode: 'Pivot Mode',
    groups: 'Row Groups',
    rowGroupColumnsEmptyMessage: 'Drag here to set row groups',
    values: 'Valeures',
    valueColumnsEmptyMessage: 'Drag here to aggregate',
    pivots: 'Labels des colonnes',
    pivotColumnsEmptyMessage: 'Drag here to set column labels',

    // Header of the Default Group Column
    group: 'Groupe',

    // Other
    loadingOoo: 'Chargement...',
    noRowsToShow: 'Table vide',
    enabled: 'Activé',

    // Menu
    pinColumn: 'Pin Column',
    pinLeft: 'Pin Left',
    pinRight: 'Pin Right',
    noPin: 'No Pin',
    valueAggregation: 'Value Aggregation',
    autosizeThiscolumn: 'Autosize This Column',
    autosizeAllColumns: 'Autosize All Columns',
    groupBy: 'Group by',
    ungroupBy: 'Un-Group by',
    resetColumns: 'Reset Columns',
    expandAll: 'Expand All',
    collapseAll: 'Close All',
    copy: 'Copy',
    ctrlC: 'Ctrl+C',
    copyWithHeaders: 'Copy With Headers',
    paste: 'Paste',
    ctrlV: 'Ctrl+V',
    export: 'Export',
    csvExport: 'CSV Export',
    excelExport: 'Excel Export (.xlsx)',
    excelXmlExport: 'Excel Export (.xml)',

    // Enterprise Menu Aggregation and Status Bar
    sum: 'Sum',
    min: 'Min',
    max: 'Max',
    none: 'None',
    count: 'Count',
    avg: 'Average',
    filteredRows: 'Filtrés',
    selectedRows: 'Séléctionnés',
    totalRows: 'Toutes les lignes',
    totalAndFilteredRows: 'Lignes',
    page: 'Page',
    more: 'Plus',
    to: 'à',
    of: 'de',
    next: 'Suivant',
    last: 'Dérnier',
    first: 'Premier',
    previous: 'Précédent',

    // Enterprise Menu (Charts)
    pivotChartAndPivotMode: 'Pivot Chart & Pivot Mode',
    pivotChart: 'Pivot Chart',
    chartRange: 'Chart Range',

    columnChart: 'Column',
    groupedColumn: 'Grouped',
    stackedColumn: 'Stacked',
    normalizedColumn: '100% Stacked',

    barChart: 'Bar',
    groupedBar: 'Grouped',
    stackedBar: 'Stacked',
    normalizedBar: '100% Stacked',

    pieChart: 'Pie',
    pie: 'Pie',
    doughnut: 'Doughnut',

    line: 'Line',

    xyChart: 'X Y (Scatter)',
    scatter: 'Scatter',
    bubble: 'Bubble',

    areaChart: 'Area',
    area: 'Area',
    stackedArea: 'Stacked',
    normalizedArea: '100% Stacked',

    histogramChart: 'Histogram',

    // Charts
    pivotChartTitle: 'Pivot Chart',
    rangeChartTitle: 'Range Chart',
    settings: 'Settings',
    data: 'Data',
    format: 'Format',
    categories: 'Categories',
    defaultCategory: '(None)',
    series: 'Series',
    xyValues: 'X Y Values',
    paired: 'Paired Mode',
    axis: 'Axis',
    navigator: 'Navigator',
    color: 'Color',
    thickness: 'Thickness',
    xType: 'X Type',
    automatic: 'Automatic',
    category: 'Category',
    number: 'Number',
    time: 'Time',
    xRotation: 'X Rotation',
    yRotation: 'Y Rotation',
    ticks: 'Ticks',
    width: 'Width',
    height: 'Height',
    length: 'Length',
    padding: 'Padding',
    spacing: 'Spacing',
    chart: 'Chart',
    title: 'Title',
    titlePlaceholder: 'Chart title - double click to edit',
    background: 'Background',
    font: 'Font',
    top: 'Top',
    right: 'Right',
    bottom: 'Bottom',
    left: 'Left',
    labels: 'Labels',
    size: 'Size',
    minSize: 'Minimum Size',
    maxSize: 'Maximum Size',
    legend: 'Legend',
    position: 'Position',
    markerSize: 'Marker Size',
    markerStroke: 'Marker Stroke',
    markerPadding: 'Marker Padding',
    itemSpacing: 'Item Spacing',
    itemPaddingX: 'Item Padding X',
    itemPaddingY: 'Item Padding Y',
    layoutHorizontalSpacing: 'Horizontal Spacing',
    layoutVerticalSpacing: 'Vertical Spacing',
    strokeWidth: 'Stroke Width',
    offset: 'Offset',
    offsets: 'Offsets',
    tooltips: 'Tooltips',
    callout: 'Callout',
    markers: 'Markers',
    shadow: 'Shadow',
    blur: 'Blur',
    xOffset: 'X Offset',
    yOffset: 'Y Offset',
    lineWidth: 'Line Width',
    normal: 'Normal',
    bold: 'Bold',
    italic: 'Italic',
    boldItalic: 'Bold Italic',
    predefined: 'Predefined',
    fillOpacity: 'Fill Opacity',
    strokeOpacity: 'Line Opacity',
    histogramBinCount: 'Bin count',
    columnGroup: 'Column',
    barGroup: 'Bar',
    pieGroup: 'Pie',
    lineGroup: 'Line',
    scatterGroup: 'X Y (Scatter)',
    areaGroup: 'Area',
    histogramGroup: 'Histogram',
    groupedColumnTooltip: 'Grouped',
    stackedColumnTooltip: 'Stacked',
    normalizedColumnTooltip: '100% Stacked',
    groupedBarTooltip: 'Grouped',
    stackedBarTooltip: 'Stacked',
    normalizedBarTooltip: '100% Stacked',
    pieTooltip: 'Pie',
    doughnutTooltip: 'Doughnut',
    lineTooltip: 'Line',
    groupedAreaTooltip: 'Area',
    stackedAreaTooltip: 'Stacked',
    normalizedAreaTooltip: '100% Stacked',
    scatterTooltip: 'Scatter',
    bubbleTooltip: 'Bubble',
    histogramTooltip: 'Histogram',
    noDataToChart: 'No data available to be charted.',
    pivotChartRequiresPivotMode: 'Pivot Chart requires Pivot Mode enabled.',
  }
  etat: any
  onOptionsSelected(event) {
    console.log("hhhhh");
    console.log(this.conge["typedeconge"]);
    if ((this.conge["typedeconge"] == "conge_repos") || (this.conge["typedeconge"] == "conge_compensation") || (this.conge["typedeconge"] == "conge_exceptionnel") || (this.conge["typedeconge"] == "conge_maladie")) {
      this.etat = true;
    }
    else if ((this.conge["typedeconge"] == "mise_a_pied") || (this.conge["typedeconge"] == "detachement")) {
      this.etat = "other";
    }
    else {
      this.etat = false;
    }
    console.log(this.etat);

  }

  conge2: object;
  conge: object = {
    id: "",
    typedeconge: "",
    datedebut: "",
    numDeJour: "",
    numDeMois: "",
    personnel: { personnel_id: "" }
  };
  add() {
    this.conge2 = this.PersonnelService.congeparPersonnelenattenteCompte(this.tokenStorage.getUser().id).subscribe(res => { });
    //if (this.conge2 == null) {
    if ((this.personnel["soldeRepos"]) != 0 || (this.personnel["soldeReposN_1"]) != 0 || (this.personnel["soldeReposN_2"]) != 0 || (this.personnel["soldeCompensation"]) != 0 || (this.personnel["soldeExceptionnel"]) != 0)
      if (this.conge["typedeconge"] != "") {
        if (this.conge["datedebut"] != "") {
          if (this.conge["numDeJour"] != "") {
            this.PersonnelService.demandeConge(this.conge, this.tokenStorage.getUser().id).subscribe(res => {
              this.ngOnInit();
              console.log(res);
              console.log(this.conge["personnel"].personnel_id);
              this._snackBar.open("demandeConge ajouté avec succés", "OK", {
                duration: 2000,
                panelClass: ["green-snackbar"]
              });
            });
          }
        }
      }
      else {
        this._snackBar.open(
          "Veuillez insérer datedebut du conge ",
          "OK",
          {
            duration: 2000,
            panelClass: ["red-snackbar"]
          }
        );
      }

    else {
      this._snackBar.open(
        "Solde insuffisant ",
        "OK",
        {
          duration: 2000,
          panelClass: ["red-snackbar"]
        }
      );
    }



  }

  /* } else {
     this._snackBar.open(
       "il y a une demande encours ",
       "OK",
       {
         duration: 2000,
         panelClass: ["red-snackbar"]
       }
     );
 
   }*/


  delete() {
    if (this.id != null) {
      this.dialog.open(DialogConfirmation, {
        data: this.id
      });
      this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })
    } else {
      this._snackBar.open("Veuillez sélectionner le personnel à supprimer", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }

  }
  AnnulationConge: any;
  annulation: boolean;
  getId(event) {
    this.id = event.data["id"];
    console.log(event.data["id"]);
    console.log(this.id);
    this.AnnulationConge = this.Rhservice.annulationCongeenAttente(this.id).subscribe(res => {
      console.log(res);
      if (res == null) {
        this.annulation = false;
      }
      else
        this.annulation = true;

    });
  }
  ajouterAnuulationConge() {
    //console.log("aaaaaaaaaa" + this.id);


    console.log("oooooooooooooooooooo" + this.AnnulationConge);
    if (this.annulation == false) {
      this.Rhservice.ajouterAnnulationConge(this.id).subscribe(res => {
        this.ngOnInit();
        console.log(res);

        if (res != null) {
          this._snackBar.open("demande Annulation Conge ajouté avec succés", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar"]

          });
        }
        else {
          this._snackBar.open("Verifier la début du congé ?", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar"]
          });


        }
      });


    }
    else {
      this._snackBar.open("Il existe deja une demande d'annulation", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  columnAnnulationConge = [
    {
      headerName: "numdemande",
      field: "id",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "datedemande",
      field: "datedemande",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "etat",
      field: "etat",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "Conge_id",
      field: "conge.id",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    }
  ]


}
@Component({
  selector: 'dialog-confirmation',
  templateUrl: 'dialog-confirmation.html',
})
export class DialogConfirmation implements OnInit {
  message: string;
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmation>,
    private http: HttpClient,
    private PersonnelService: PersonnelService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public id: number) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  Action() {
    if (this.id != null) {
      this.PersonnelService.deleteConge(this.id).subscribe(res => {
        console.log("congee Supprimé");
        this.dialogRef.close();
      }, err => {
        this.message = err.error.message;
      });
    }
  }
}