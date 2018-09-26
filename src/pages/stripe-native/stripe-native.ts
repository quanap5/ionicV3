import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { PaymentProvider } from '../../providers/payment/payment';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';
import { Chart } from 'chart.js';

/**
 * Generated class for the StripeNativePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stripe-native',
  templateUrl: 'stripe-native.html',
})
export class StripeNativePage {

  cardNumber: string;
  cardMonth: number;
  cardYear: number;
  cardCVC: string;

  amount = 0;

  data: Observable<any[]>;
  ref: AngularFireList<any>;

  @ViewChild('valueBarsCanvas') valueBarsCanvas;
  @ViewChild('valueRadarsCanvas') valueRadarsCanvas;
  valueBarsChart: any;
  valueRadarsChart: any;
 
  chartData = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public stripe: Stripe, private paymentSvc: PaymentProvider, private db: AngularFireDatabase) {

   this.amount= this.navParams.get('amount')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StripeNativePage');
    this.stripe.setPublishableKey('pk_test_zoWhh6Kh0xRVEEtDEgzfMuKX');


    // for Visulaization

     // Reference to our Firebase List
     this.ref = this.db.list('payments/1TxKcEatGab4isSEXwx9jCDcxh62', ref => ref.orderByChild('amount'));

     // Catch any update to draw the Chart
    //  this.ref.valueChanges().subscribe(result => {
    //    if (this.chartData){
    //      this.updateCharts(result)
    //      this.updateRadars(result);
    //    }
    //    else {
    //      this.createCharts(result)
    //    }
    //  })
  }

  validateCard(){
    let card = {
      number: this.cardNumber,
      expMonth: this.cardMonth,
      expYear: this.cardYear,
      cvc: this.cardCVC
    };

    // Run card validation here and then attempte to tokenize

    this.stripe.createCardToken(card).then(token =>  {
      console.log(token);
      this.paymentSvc.processPayment(token, this.amount)

    
    }).catch(error => console.error(error));
  }


  // createChart

  createCharts(data) {
    this.chartData = data;
   
    // Calculate Values for the Chart
    let chartData = this.getReportValues();
   
    // Create the chart
    this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ["1$", "2$", "3$", "4$", "5$",],
        datasets: [{
          data: chartData,
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
              return data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] +' $';
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
                return value + '$';
              },
              suggestedMin: 0
            }
          }]
        },
      }
    });

// Radar graph
let radarData1 = this.getReportValues();
let radarData2 = this.getReportRadars3();

this.valueRadarsChart = new Chart(this.valueRadarsCanvas.nativeElement, {
  type: 'radar',
  data: {
    labels: ["Age", "Salary", "Smoking", "Drink", "Education"],
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

  // Update chart

  updateCharts(data) {
    this.chartData = data;
    let chartData = this.getReportValues();
   
    // Update our dataset
    this.valueBarsChart.data.datasets.forEach((dataset) => {
      dataset.data = chartData
    });
    this.valueBarsChart.update();
  }

  updateRadars(data) {
   // this.chartData = data;
    let radarData1 = this.getReportValues();
    let radarData2 = this.getReportRadars3();
    // Update our dataset
    // this.valueRadarsChart.data.datasets[0].forEach((dataset) => {
    //   dataset.data = radarData1;
    //   //dataset.data[1] = radarData2;
    //   //dataset.data.push(radarData2);
    // });
    // this.valueRadarsChart.data.datasets[1].forEach((dataset) => {
    //   dataset.data = radarData2;
    //   //dataset.data[1] = radarData2;
    //   //dataset.data.push(radarData2);
    // });
    this.valueRadarsChart.data.datasets[0].data= radarData1;
    this.valueRadarsChart.data.datasets[1].data= radarData2;
    this.valueRadarsChart.update();
  }
  

  getReportValues(){
    let reportByTransaction = {
      100: null,
      200: null,
      300: null,
      400: null,
      500: null
    }

    for (let trans of this.chartData){
      if (reportByTransaction[trans.amount]){
        reportByTransaction[trans.amount] += +trans.amount;
      }
      else{
        reportByTransaction[trans.amount] = trans.amount
      }
    }

    return Object.keys(reportByTransaction).map(a => reportByTransaction[a]);
  }


  // For radar get data
  getReportRadars1(){

    return [25.48,54.16,7.61,8.06,4.45];

  }

  getReportRadars2(){
    return [100, 130,500,1000,1210];
  }

  getReportRadars3(){
    let reportByTransaction = {
      100: null,
      200: null,
      300: null,
      400: null,
      500: null
    }

    for (let trans of this.chartData){
      if (reportByTransaction[trans.amount]){
        reportByTransaction[trans.amount] += +trans.amount+300;
      }
      else{
        reportByTransaction[trans.amount] = trans.amount*2
      }
    }

    return Object.keys(reportByTransaction).map(a => reportByTransaction[a]);
  }


  

}
