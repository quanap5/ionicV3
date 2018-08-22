import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Profile } from '../../models/profile';
import { UserProvider } from '../../providers/user/user';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the MatchingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matching',
  templateUrl: 'matching.html',
})
export class MatchingPage {


  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;

  // @ViewChild('valueBarsCanvas') valueBarsCanvasMatch;
  // @ViewChild('valueRadarsCanvas') valueRadarsCanvasMatch;

  valueBarsChartM: any;
  valueRadarsChartM: any;
  valueBarsChartM2: any;

  SwipedTabsIndicator: any = null;
  tabs: any = [];

  avatar2 = {} as Profile;
  avatar1 = {} as Profile;
  myUser: any;
  chartData: any;
  


  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider) {

    this.avatar2 = this.navParams.get('avatar2');

    this.userservice.getMydetails().then((res: any) => {
      this.myUser = res;
      this.avatar1 = res.profile;
    }).then(() => {
      this.createCharts();
    })

    this.tabs = ["PLAIN TEXT", "VISUALIZATION", "CLUSTERING"];


  }

  ionViewDidLoad() {
    //this.createCharts();

  }



  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
  }

  selectTab(index) {
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (100 * index) + '%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
    // this condition is to avoid passing to incorrect index
    if (this.SwipedTabsSlider.length() > this.SwipedTabsSlider.getActiveIndex()) {
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (this.SwipedTabsSlider.getActiveIndex() * 100) + '%,0,0)';
    }

  }

  animateIndicator($event) {
    if (this.SwipedTabsIndicator)
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress * (this.SwipedTabsSlider.length() - 1)) * 100) + '%,0,0)';
  }

  // Drawing using Chartjs

  createCharts() {
    //this.chartData = data;

    // Calculate Values for the Chart
   let chartData1 = this.getMatchingData(this.avatar1);
   let chartData2 = this.getMatchingData(this.avatar2);
  //  let chartData1= [100, 130, 500, 1000, 1210];
    // Create the chart
    this.valueBarsChartM = new Chart(document.getElementById("valueBarsCanvasMatch"), {
      type: 'bar',
      data: {
        labels: ["Age", "Weight", "Education", "Salary", "Height"],
        datasets: [{
          data: chartData1,
          backgroundColor: '#32db64'
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItems, data) {
              return data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] + 'score';
            }
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            ticks: {
              callback: function (value, index, values) {
                return value + 'score';
              },
              suggestedMin: 0
            }
          }]
        },
      }
    });


    //Horizontal Bar
    this.valueBarsChartM2 = new Chart(document.getElementById("valueBarsCanvasMatch2"), {
      type: 'horizontalBar',
      data: {
        labels: ["Age", "Weight", "Education", "Salary", "Height"],
        datasets: [{
          data: chartData1,
          backgroundColor: '#32db64'
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItems, data) {
              return data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] + 'score';
            }
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            ticks: {
              callback: function (value, index, values) {
                return value + 'score';
              },
              suggestedMin: 0
            }
          }]
        },
      }
    });


    // Radar graph
    let radarData1 = this.getMatchingData(this.avatar1);
    let radarData2 = this.getMatchingData(this.avatar2);

    console.log(radarData1);
    console.log(radarData2);
    // let radarData1= [10, 10, 50, 100, 120];
    // let radarData2= [100, 130, 50, 100, 110];

    this.valueRadarsChartM = new Chart(document.getElementById("valueRadarsCanvasMatch"), {
      type: 'radar',
      data: {
        labels: ["Age", "Weight", "Education", "Salary", "Height"],
        datasets: [
          {
            label: "I",
            fill: true,
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(179,181,198,1)",
            // data: [8.77,55.61,21.69,6.62,6.82]
            data: radarData1
          }, {
            label: "You",
            fill: true,
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(255,99,132,1)",
            //data: [25.48,54.16,7.61,8.06,4.45]
            data: radarData2
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Analysis matching between 2 users'
        }
      }
    });

  }

  // Update drawings


  // Get data from database

  getMatchingData(avatar: Profile) {
    let avatarData = {
      "Age": null,
      "Weight": null,
      "Education": null,
      "Salary": null,
      "Height": null
    }

    if (avatar.birth)   avatarData["Age"] = avatar.birth;
    else  avatarData["Age"] = 0;

    if (avatar.weight)   avatarData["Weight"] = avatar.weight;
    else  avatarData["Weight"] = 0;

    if (avatar.education)   avatarData["Education"] = 10;
    else  avatarData["Education"] = 0;

    if (avatar.balance)   avatarData["Salary"] = parseInt(avatar.balance);
    else  avatarData["Salary"] = 0;

    if (avatar.height)   avatarData["Height"] = avatar.height;
    else  avatarData["Height"] = 0;


    return Object.keys(avatarData).map(a => avatarData[a]);
  }


  getMatchingData2(avatar: Profile) {
    return [100, 130, 500, 1000, 1210];
  }

}
