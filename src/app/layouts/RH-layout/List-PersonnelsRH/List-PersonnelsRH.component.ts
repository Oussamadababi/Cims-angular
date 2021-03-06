import { Component, OnInit, forwardRef, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RHService } from "../../../services/RH/rhservice.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MomentUtcDateAdapter } from "../../chef-service-layout/AffectationsPartiellesCS/datePicker";
import { DropDownEditorDept } from "./drop-down-dept";
import { DropDownEditorGrade } from "./drop-down-grade";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: "app-list-personnels",
  templateUrl: "./List-PersonnelsRH.component.html",
  styleUrls: ["./List-PersonnelsRH.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ListPersonnelsComponent)
    },
    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter }
  ]
})
export class ListPersonnelsComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  message: string;
  today: number = Date.now();
  id: number;
  grade: any;
  site: any;
  departement: any;
  addpers: boolean;
  gouvselecter: any;
  divselect: any;
  idAfffff: any;
  idfonction: any;
  id_grade: any;

  personnel: object = {
    id_personnel: "",
    nom: "",
    prenom: "",
    sexe: "",
    telephone: "",
    departement: { id_dept: "" },
    email: "",
    date_recrutement: "",
    matricule: "",
    matricule_CNRPS: "",
    matricule_CNSS: "",
    prenom_AR: "",
    poste_Occupe: "",
    date_Promotion: "",
    soldeRepos: "",
    date_Naissance: "",
    adresse: "",
    affectation: { affectation_id: "" },
    fonction: { id_fonction: "" },
    division: { id_division: "" },
    nom_AR: "",
    grade: { id_grade: "" },
    date_fonction: ""



  };
  grades: any;
  sites: any;
  fonction: any;
  divisions: any;
  services: any;
  attributfonction: object = {
    type_fonction: ""
  };
  attributAffectation: object = {
    nature: "",
    qualite: "",
    gouvernorat: ""
  };


  rowData: any;
  constructor(
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.addpers = false;
    this.Rhservice.listerPersonnel().subscribe(res => {
      console.log(res);
      this.rowData = res;
    });
    this.Rhservice.listerGrades().subscribe(
      data => {
        this.grades = data;
        console.dir(data);
      },
      err => {
        console.log(err);
      }
    );
    this.Rhservice.listerSite().subscribe(
      data => {
        this.sites = data;
        console.dir(data);
      },
      err => {
        console.log(err);
      }
    );

    this.Rhservice.listerDepartements().subscribe(data => {
      /* this.departement = data;
       console.dir(data);*/
      var x: any = data;
      this.departement = x;
      console.log(this.departement[0]);
    });
    this.Rhservice.listFonctions().subscribe(data => {
      this.fonction = data;
      console.dir(data);
    });

  }

  onOptionsSelected() {
    this.Rhservice.listDivisions(this.gouvselecter).subscribe(res => {
      var y: any = res;
      this.divisions = y;
    });


  }
  onOptionsSelected1() {
    this.Rhservice.listService(this.divselect).subscribe(res => {
      console.log('' + this.divselect);
      var y: any = res;
      this.services = y;
    });
  }
  onOptionSAffectation() {
    console.log(this.sites);
    this.Rhservice.listAttparAff(this.idAfffff).subscribe(res => {
      var y: any = res;
      console.log(res);
      console.log(this.attributAffectation);
      this.attributAffectation = y;
    });
  }
  onOptionFonction() {
    this.Rhservice.getAttFonction(this.idfonction).subscribe(res => {
      var y: any = res;
      console.log(res);
      console.log(this.attributfonction);
      this.attributfonction = y;
    });
  }

  add() {
    if (this.personnel["nom"] != "") {
      if (this.personnel["prenom"] != "") {
        if (this.personnel["nom_AR"] != "") {
          if (this.personnel["prenom_AR"] != "") {
            if (this.personnel["sexe"] != "") {
              if (this.personnel["date_Naissance"] != "") {
                if (this.personnel["adresse"] != "") {
                  if (this.personnel["telephone"] != "") {
                    if (this.personnel["email"] != "") {
                      if (this.personnel["date_recrutement"] != "") {
                        if (this.personnel["matricule"] != "") {
                          if (this.personnel["matricule_CNSS"] != "") {
                            if (this.personnel["matricule_CNRPS"] != "") {
                              if (this.personnel["date_Promotion"] != "") {
                                if (this.personnel["poste_Occupe"] != "") {
                                  if (this.personnel["soldeRepos"] != "") {
                                    if (this.id_grade != "") {
                                      if (this.idAfffff != "") {
                                        if (this.gouvselecter != "") {
                                          if (this.divselect != "") {
                                            if (this.personnel["division"].id_division != "") {
                                              if (this.idfonction != "") {
                                                if (this.personnel["date_fonction"] != "") {
                                                  if (this.personnel["date_Naissance"] < this.personnel["date_recrutement"]) {
                                                    if (this.personnel["date_recrutement"] < this.today) {
                                                      if (this.personnel["date_Promotion"] < this.today) {
                                                        if (this.personnel["date_fonction"] < this.today) {
                                                          this.Rhservice.addPersonnel2(this.personnel, this.id_grade, this.idfonction, this.gouvselecter, this.idAfffff, this.divselect, this.personnel["division"].id_division).subscribe(res => {
                                                            console.log(res);
                                                            this.ngOnInit();

                                                            this._snackBar.open("Personnel ajouté avec succés", "OK", {
                                                              duration: 2000,
                                                              panelClass: ["green-snackbar"]
                                                            });
                                                          }, err => {
                                                            this.message = err.error.message;
                                                            this.dialog.open(DialogError, {
                                                              data: this.message
                                                            });

                                                          });
                                                        }
                                                        else {
                                                          this._snackBar.open(
                                                            "Vérifier la date de fonction par rapport au date d'aujourd'hui SVP!  ",
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
                                                          "Vérifier la date de promotion par rapport au date d'aujourd'hui SVP!  ",
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
                                                        "Vérifier la date de recrutement par rapport au date d'aujourd'hui SVP!  ",
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
                                                      "Vérifier la date de naissance par rapport au date de recrutement SVP!  ",
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
                                                    "Veuillez Selectionner une date de fonction  ",
                                                    "OK",
                                                    {
                                                      duration: 2000,
                                                      panelClass: ["red-snackbar"]
                                                    }
                                                  );


                                                }

                                              } else {
                                                this._snackBar.open(
                                                  "Veuillez une Fonction  ",
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
                                                "Veuillez une Division    ",
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
                                              "Veuillez une Division  ",
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
                                            "Veuillez une Structure  ",
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
                                          "Veuillez une Affectation  ",
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
                                        "Veuillez selectionner une grade  ",
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
                                      "Veuillez insérer la Solde initial du personnel ",
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
                                    "Veuillez insérer la poste occupé du personnel ",
                                    "OK",
                                    {
                                      duration: 2000,
                                      panelClass: ["red-snackbar"]
                                    }
                                  );

                                }

                              } else {
                                this._snackBar.open(
                                  "Veuillez selectionner la date de promotion du personnel ",
                                  "OK",
                                  {
                                    duration: 2000,
                                    panelClass: ["red-snackbar"]
                                  }
                                );
                              }
                            } else {
                              this._snackBar.open(
                                "Veuillez insérer la Matricule CNRPS du personnel ",
                                "OK",
                                {
                                  duration: 2000,
                                  panelClass: ["red-snackbar"]
                                }
                              );
                            }
                          } else {
                            this._snackBar.open(
                              "Veuillez insérer la Matricule CNSS du personnel ",
                              "OK",
                              {
                                duration: 2000,
                                panelClass: ["red-snackbar"]
                              }
                            );
                          }
                        } else {
                          this._snackBar.open(
                            "Veuillez insérer la cin du personnel ",
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
                          "Veuillez sélectionner la date de recrutement du personnel ",
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
                        "Veuillez insérer l'email du personnel ",
                        "OK",
                        {
                          duration: 2000,
                          panelClass: ["red-snackbar"]
                        }
                      );
                    }
                  } else {
                    this._snackBar.open(
                      "Veuillez insérer le telephone du personnel ",
                      "OK",
                      {
                        duration: 2000,
                        panelClass: ["red-snackbar"]
                      }
                    );
                  }

                } else {
                  this._snackBar.open(
                    "Veuillez insérer Adresse du personnel ",
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
                  "Veuillez sélectionner le DateNaissance du personnel ",
                  "OK",
                  {
                    duration: 2000,
                    panelClass: ["red-snackbar"]
                  }
                );
              }
            } else {
              this._snackBar.open(
                "Veuillez sélectionner le sexe du personnel ",
                "OK",
                {
                  duration: 2000,
                  panelClass: ["red-snackbar"]
                }
              );
            }
          } else {
            this._snackBar.open("Veuillez insérer le Prenom du personnel en Arabe", "OK", {
              duration: 2000,
              panelClass: ["red-snackbar"]
            });
          }
        } else {
          this._snackBar.open("Veuillez insérer le Nom du personnel en Arabe ", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar"]
          });
        }
      } else {
        this._snackBar.open("Veuillez insérer le prenom du personnel", "OK", {
          duration: 2000,
          panelClass: ["red-snackbar"]
        });
      }
    } else {
      this._snackBar.open("Veuillez insérer le nom du personnel", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  getId(event) {
    this.id = event.data["id_personnel"];
    console.log(event.data["id_personnel"]);
    console.log(this.id);
  }
  edit(event) {
    if (
      this.Rhservice.updatePersonnel(
        event.data["id_personnel"],
        event.data
      ).subscribe(res => {
        console.log("Personnel modifié");
        this.ngOnInit();
        this._snackBar.open("Personnel modifié avec succés", "OK", {
          duration: 2000
        });
      })
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
      this._snackBar.open("Veuillez sélectionner le personnel à supprimer", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  displayaddpers() {
    this.addpers = true;
  }
  cancel() {
    this.addpers = false;
  }

  columnDefs = [
    {
      headerName: "Nom",
      field: "nom",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "Prenom",
      field: "prenom",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "Sexe",
      field: "sexe",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 100
    },
    {
      headerName: "Téléphone",
      field: "telephone",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 140
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "SoldeRepos",
      field: "soldeRepos",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 140
    },
    {
      headerName: "Grade",
      field: "grade.nom_grade_fr",
      valueSetter: function (params) {
        params.data.grade.id_grade = params.newValue;
        console.log(params);
        return true;
      },
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 120,
      cellEditorFramework: DropDownEditorGrade,
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
      headerName: "Departement",
      field: "departement.nom_dept",
      valueSetter: function (params) {
        params.data.departement.id_dept = params.newValue;
        console.log(params);
        return true;
      },
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 170,
      cellEditorFramework: DropDownEditorDept,
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
      headerName: "Date de recrutement",
      field: "date_recrutement",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 210
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
      this.Rhservice.deletePersonnel(this.id).subscribe(res => {
        console.log("Personnel Supprimé");
        this.dialogRef.close();
      }, err => {
        this.message = err.error.message;
      });
    }
  }
}

/////////

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