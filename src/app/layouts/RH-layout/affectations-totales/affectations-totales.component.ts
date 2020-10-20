import { Component, OnInit, Inject } from "@angular/core";
import { RHService } from "../../../services/RH/rhservice.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { DropDownEditorSite } from "./drop-down-site";

@Component({
  selector: "app-affectations-totales",
  templateUrl: "./affectations-totales.component.html",
  styleUrls: ["./affectations-totales.component.css"]
})
export class AffectationsTotalesComponent implements OnInit {
  message: string;
  id: number;
  rowDataT: any;
  site: any[] = [
    {
      idSite: "",
      nomSite: "",
      gouvernorat: {
        idGouv: ""
      }
    }
  ];
  gouvselecter: any;
  personnel: any;
  gouvernorat: any[] = [
    {
      idGouv: "",
      nomGouv: ""
    }
  ];
  AffectationTotale: object = {
    idAffectT: "",
    site: { idSite: "" },
    personnel: { id_personnel: "" }
  };
  constructor(
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.Rhservice.listerAffTot().subscribe(res => {
      console.log(res);
      this.rowDataT = res;
    });

    this.Rhservice.listPersonnelsSansAffecT().subscribe(data => {
      this.personnel = data;
      console.dir(data);
    });
    this.Rhservice.listerGouvernorats().subscribe(data => {
      var x: any = data;
      this.gouvernorat = x;
      console.log(this.gouvernorat[0]);
    });
  }
  onOptionsSelected() {
    this.Rhservice.getSitesParGouv(this.gouvselecter).subscribe(res => {
      var y: any = res;
      this.site = y;
    });
  }
  addT() {
    if (this.AffectationTotale["personnel"].id_personnel != "") {
      if (this.AffectationTotale["site"].idSite != "") {
        this.Rhservice.addAffTot(this.AffectationTotale).subscribe(res => {
          console.log(this.AffectationTotale);
          this.ngOnInit();
          this._snackBar.open("Affectation totale ajoutée avec succés", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar"]
          });
        });

      } else {
        this._snackBar.open("Veuillez sélectionner le site ", "OK", {
          duration: 2000,
          panelClass: ["red-snackbar"]
        });
      }
    } else {
      this._snackBar.open("Veuillez sélectionner le personnel", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  getId(event) {
    this.id = event.data["idAffectT"];
    //console.log(event.data["idAffectT"]);
    //console.log(this.id);
  }
  edit(event) {
    this.Rhservice.updateAffTot(event.data["idAffectT"], event.data).subscribe(
      res => {
        console.log("Affectation modifiée");
        this.ngOnInit();
        this._snackBar.open("Affectation totale modifiée avec succés", "OK", {
          duration: 2000
        });
      }, err => {
        this.message = err.error.message;
        this.dialog.open(DialogError, {
          data: this.message
        });


      }
    );
  }
  delete() {
    if (this.id != null) {
      this.dialog.open(DialogConfirmation, {
        data: this.id
      });
      this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })
    } else {
      this._snackBar.open(
        "Veuillez sélectionner l'affectation à supprimer",
        "OK",
        {
          duration: 2000,
          panelClass: ["red-snackbar"]
        }
      );
    }
  }
  columnDefsT = [
    {
      headerName: "Personnel",
      colId: "personnel.nom & personnel.prenom",
      valueGetter: function (params) {
        return params.data.personnel.nom + " " + params.data.personnel.prenom;
      },
      sortable: true,
      filter: true,
      minWidth: 400
    },
    {
      headerName: "Site",
      field: "site.nomSite",
      valueSetter: function (params) {
        params.data.site.idSite = params.newValue;
        console.log(params);
        return true;
      },
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 300,
      cellEditorFramework: DropDownEditorSite,
      cellEditorParams: {
        options: [
        ]


      }
      ,
      valueParser: function (params) {
        return Number(params.newValue);
      }
    },
    {
      headerName: "Gouvernorat",
      field: "site.gouvernorat.nomGouv",
      sortable: true,
      filter: true,
      editable: false,
      minWidth: 300
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
    @Inject(MAT_DIALOG_DATA) public id: number) { }

  onNoClick(): void {
    this.dialogRef.close();

  }
  ngOnInit(): void {
  }
  Action() {
    if (this.id != null) {
      this.Rhservice.deleteAffTot(this.id).subscribe(res => {
        console.log("Affectation Supprimée");
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