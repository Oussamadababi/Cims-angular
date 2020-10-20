import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RHService } from "../../../services/RH/rhservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropDownEditor } from "./drop-down-editor";

@Component({
  selector: "app-list-sites",
  templateUrl: "./list-sites.component.html",
  styleUrls: ["./list-sites.component.css"]
})
export class ListSitesComponent implements OnInit {
  id: number;
  gouvernorats: any;
  site: object = {
    id_affectation: "",
    nomSite: "",
    nom_etablissement_fr: "",
    nom_etablissement_ar: "",
    nature_etablissement_fr: "",
    nature_etablissement_ar: "",
    qualite_direction_fr: "",
    qualite_direction_ar: "",
    gouvernorat: { idGouvernorat: "" }
  };
  message: string;
  rowData: any;
  constructor(
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.Rhservice.listerSite().subscribe(res => {
      console.log(res);
      this.rowData = res;
      console.log(this.site["gouvernorat"].idGouvernorat);
    });
    this.Rhservice.listerGouvernorats().subscribe(data => {
      this.gouvernorats = data;
    });

  }
  add() {
    console.log(this.site["gouvernorat"].idGouvernorat);
    console.log(this.site["gouvernorat"].idGouvernorat);
    console.log(this.site["gouvernorat"].idGouvernorat);
    if (this.site["nomSite"] != "") {
      if (this.site["gouvernorat"].idGouvernorat != "") {
        if (this.site["nom_etablissement_fr"] != "") {
          if (this.site["nom_etablissement_ar"] != "") {
            if (this.site["nature_etablissement_fr"] != "") {
              if (this.site["nature_etablissement_ar"] != "") {
                if (this.site["qualite_direction_fr"] != "") {
                  if (this.site["qualite_direction_ar"] != "") {
                    /*      for (let prop in this.site) {
                            /*   if (typeof this.site[prop] == "string") {
                                 if (!this.site[prop]) return alert(prop + " is Required");
                               } else {
                                 if (this.site[prop] == {}) return alert(prop + "is Required");
                               }
                  }*/
                    this.Rhservice.addSite(this.site, this.site["gouvernorat"].idGouvernorat).subscribe(res => {
                      console.log(res);
                      this.ngOnInit();
                      this._snackBar.open("Site ajouté avec succés", "OK", {
                        duration: 2000,
                        panelClass: ["green-snackbar"]
                      });
                    }, err => {
                      this.message = err.error.message;
                      this.dialog.open(DialogError, {
                        data: this.message
                      });
                      this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })

                    });
                  }
                  else {
                    this._snackBar.open(
                      "Veuillez sélectionner la qualité direction en Ar du site",
                      "OK",
                      {
                        duration: 2000,
                        panelClass: ["red-snackbar"]
                      }
                    );

                  }
                }
                else {
                  this._snackBar.open(
                    "Veuillez sélectionner la qualité direction en Fr du site",
                    "OK",
                    {
                      duration: 2000,
                      panelClass: ["red-snackbar"]
                    }
                  );


                }
              }
              else {
                this._snackBar.open(
                  "Veuillez sélectionner la nature etablissement en Ar du site",
                  "OK",
                  {
                    duration: 2000,
                    panelClass: ["red-snackbar"]
                  }
                );


              }
            }
            else {
              this._snackBar.open(
                "Veuillez sélectionner la nature etablissement en Fr du site",
                "OK",
                {
                  duration: 2000,
                  panelClass: ["red-snackbar"]
                }
              );


            }
          }
          else {
            this._snackBar.open(
              "Veuillez sélectionner le nom etablissement en Ar du site",
              "OK",
              {
                duration: 2000,
                panelClass: ["red-snackbar"]
              }
            );


          }
        }
        else {
          this._snackBar.open(
            "Veuillez sélectionner le nom etablissement en fr du site",
            "OK",
            {
              duration: 2000,
              panelClass: ["red-snackbar"]
            }
          );


        }

      } else {
        this._snackBar.open(
          "Veuillez sélectionner le gouvernorat du site",
          "OK",
          {
            duration: 2000,
            panelClass: ["red-snackbar"]
          }
        );
      }
    } else {
      this._snackBar.open("Veuillez insérer le nom du site", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }

  getId(event) {
    this.id = event.data["id_affectation"];
    console.log(event.data["id_affectation"]);
    console.log(this.id);
  }
  edit(event) {
    if (
      this.Rhservice.updateSite(event.data["idSite"], event.data).subscribe(
        res => {
          console.log("Site modifié");
          this.ngOnInit();
          this._snackBar.open("Site modifié avec succés", "OK", {
            duration: 2000
          });
        }, err => {
          this.message = err.error.message;
          this.dialog.open(DialogError, {
            data: this.message
          });
          this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })

        }
      )
    ) {

    }
  }
  delete() {
    if (this.id != null) {
      this.dialog.open(DialogConfirmation, {
        data: this.id
      });
      this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })
    } else {
      this._snackBar.open("Veuillez sélectionner le site à supprimer", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  columnDefs = [

    {
      headerName: "Nom",
      field: "nomSite",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 300
    },
    {
      headerName: "Nom Etablissement Fr",
      field: "nom_etablissement_fr",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 350
    },
    {
      headerName: "Nom Etablissement Ar",
      field: "nom_etablissement_ar",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 350
    },
    {
      headerName: "Nature etablissement fr",
      field: "nature_etablissement_fr",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 350
    },
    {
      headerName: "Qualite direction fr",
      field: "qualite_direction_fr",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 350
    },
    {
      headerName: "Gouvernorat",
      field: "gouvernorat.nomGouv",
      valueSetter: function (params) {
        params.data.gouvernorat.idGouv = params.newValue;
        console.log(params);
        return true;
      },
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 320,
      cellEditorFramework: DropDownEditor,
      cellEditorParams: {
        options: [
        ]


      }
      ,
      valueParser: function (params) {
        return Number(params.newValue);
      }



    }
  ];
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
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  Action() {
    if (this.id != null) {
      this.Rhservice.deleteSite(this.id).subscribe(res => {
        console.log("Site Supprimé");
        this.dialogRef.close();
      }, err => {
        this.message = err.error.message;
      });
    }
  }
}

////
@Component({
  selector: 'dialog-error',
  templateUrl: 'dialog-error.html',
})
export class DialogError implements OnInit {
  message: string;

  constructor(
    public dialogRef: MatDialogRef<DialogError>,
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public msg: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.message = this.msg;
  }


}