import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import { HttpClient } from "@angular/common/http";
import { RHService } from "../services/RH/rhservice.service";
import { element } from "protractor";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  nbrValidee: any = {};
  nbrRefusee: any = {};
  nbrMission: any = {};
  nbrPersonnel: any = {};
  Dashbord = {
    axeX: [],
    axeY: []
  };

  DashGouv = {
    X: [],
    Y: []
  };

  constructor(private http: HttpClient, private Rhservice: RHService) {}

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function(data) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    });

    seq2 = 0;
  }
  ngOnInit() {
    this.Rhservice.getNbrAffectValidee().subscribe(data => {
      this.nbrValidee = data;
    });

    this.Rhservice.getNbrAffectRefusee().subscribe(data => {
      this.nbrRefusee = data;
    });

    this.Rhservice.getNbrMissionToday().subscribe(data => {
      this.nbrMission = data;
    });

    this.Rhservice.getNbrPersonnel().subscribe(data => {
      this.nbrPersonnel = data;
    });

    this.Rhservice.DashAffpardate().subscribe(res =>
      res.forEach(aff => {
        if (aff.axeY == "2020-01-01 00:00:00.0") {
          this.Dashbord.axeY.push("Janvier");
        } else if (aff.axeY == "2020-02-01 00:00:00.0") {
          this.Dashbord.axeY.push("Février");
        } else if (aff.axeY == "2020-03-01 00:00:00.0") {
          this.Dashbord.axeY.push("Mars");
        } else if (aff.axeY == "2020-04-01 00:00:00.0") {
          this.Dashbord.axeY.push("Avril");
        } else if (aff.axeY == "2020-05-01 00:00:00.0") {
          this.Dashbord.axeY.push("Mai");
        } else if (aff.axeY == "2020-06-01 00:00:00.0") {
          this.Dashbord.axeY.push("Juin");
        } else if (aff.axeY == "2020-07-01 00:00:00.0") {
          this.Dashbord.axeY.push("Juillet");
        } else if (aff.axeY == "2020-08-01 00:00:00.0") {
          this.Dashbord.axeY.push("Août");
        } else if (aff.axeY == "2020-09-01 00:00:00.0") {
          this.Dashbord.axeY.push("Septembre");
        } else if (aff.axeY == "2020-10-01 00:00:00.0") {
          this.Dashbord.axeY.push("Octobre");
        } else if (aff.axeY == "2020-11-01 00:00:00.0") {
          this.Dashbord.axeY.push("Novembre");
        } else if (aff.axeY == "2020-12-01 00:00:00.0") {
          this.Dashbord.axeY.push("Décembre");
        }

        this.Dashbord.axeX.push(aff.axeX);

        var dailySalesChart = new Chartist.Line(
          "#dailySalesChart",
          {
            labels: this.Dashbord.axeY,
            series: [this.Dashbord.axeX]
          },
          optionsDailySalesChart
        );
        this.startAnimationForLineChart(dailySalesChart);

        this.startAnimationForLineChart(dailySalesChart);
      })
    );

    this.Rhservice.DashAffparGouv().subscribe(res =>
      res.forEach(dash => {
        this.DashGouv.X.push(dash.x);
        this.DashGouv.Y.push(dash.y);
        var websiteViewsChart = new Chartist.Bar(
          "#websiteViewsChart",
          { labels: this.DashGouv.Y, series: [this.DashGouv.X] },
          optionswebsiteViewsChart,
          responsiveOptions
        );
        this.startAnimationForBarChart(websiteViewsChart);
      })
    );

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    };

    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 20,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ];
  }
}
