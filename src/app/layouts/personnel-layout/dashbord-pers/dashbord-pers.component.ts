import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PersonnelService } from "../../../services/Personnel/personnel.service";
import * as Chartist from "chartist";
@Component({
  selector: "app-dashbord-pers",
  templateUrl: "./dashbord-pers.component.html",
  styleUrls: ["./dashbord-pers.component.css"]
})
export class DashbordPersComponent implements OnInit {
  nbrMissAcc: any = {};
  nbrNonMissAcc: any = {};
  Dashbord = {
    axeX: [],
    axeY: []
  };

  DashMiss = {
    X: [],
    Y: []
  };

  constructor(
    private http: HttpClient,
    private PersonnelService: PersonnelService
  ) { }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function (data) {
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
    chart.on("draw", function (data) {
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
    this.PersonnelService.nbrMissionAccomplie().subscribe(data => {
      this.nbrMissAcc = data;
      console.log(data);
    });
    this.PersonnelService.nbrMissionNonAccomplie().subscribe(data => {
      this.nbrNonMissAcc = data;
    });

    this.PersonnelService.DashlisterMissParMois().subscribe(res =>
      res.forEach(Miss => {
        if (Miss.mois == "2020-01-01 00:00:00.0") {
          this.Dashbord.axeY.push("Janvier");
        } else if (Miss.mois == "2020-02-01 00:00:00.0") {
          this.Dashbord.axeY.push("Février");
        } else if (Miss.mois == "2020-03-01 00:00:00.0") {
          this.Dashbord.axeY.push("Mars");
        } else if (Miss.mois == "2020-04-01 00:00:00.0") {
          this.Dashbord.axeY.push("Avril");
        } else if (Miss.mois == "2020-05-01 00:00:00.0") {
          this.Dashbord.axeY.push("Mai");
        } else if (Miss.mois == "2020-06-01 00:00:00.0") {
          this.Dashbord.axeY.push("Juin");
        } else if (Miss.mois == "2020-07-01 00:00:00.0") {
          this.Dashbord.axeY.push("Juillet");
        } else if (Miss.mois == "2020-08-01 00:00:00.0") {
          this.Dashbord.axeY.push("Août");
        } else if (Miss.mois == "2020-09-01 00:00:00.0") {
          this.Dashbord.axeY.push("Septembre");
        } else if (Miss.mois == "2020-10-01 00:00:00.0") {
          this.Dashbord.axeY.push("Octobre");
        } else if (Miss.mois == "2020-11-01 00:00:00.0") {
          this.Dashbord.axeY.push("Novembre");
        } else if (Miss.mois == "2020-12-01 00:00:00.0") {
          this.Dashbord.axeY.push("Décembre");
        }

        this.Dashbord.axeX.push(Miss.nbr);

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

    this.PersonnelService.DashlisterMissParAffecP().subscribe(res =>
      res.forEach(dash => {
        this.DashMiss.X.push(dash.nbrMission);
        this.DashMiss.Y.push(dash.affectP);
        var websiteViewsChart = new Chartist.Bar(
          "#websiteViewsChart",
          { labels: this.DashMiss.Y, series: [this.DashMiss.X] },
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
      high: 10,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }
      ]
    ];
  }
}
