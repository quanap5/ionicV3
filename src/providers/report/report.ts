import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Report } from '../../models/profile';

/*
  Generated class for the ReportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class ReportProvider {

  fireReport = firebase.database().ref('/report');
  


  constructor(public http: HttpClient) {
    console.log('Hello ReportProvider Provider');
  }

    /**
  Read report from database (Firebase)
  Called from - login.ts
  Inputs - nothing
  Outputs - promise
  */

 report() {
    var promise = new Promise((resolve, reject) => {
      this.fireReport.child('1').once('value', (snapshot) => {
        resolve(snapshot.val());
        
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

    /**
  Update report when have new user register or make a couple
  Called from - profile.ts
  Inputs - report object which updated
  Outputs - promise

   */

  updateReport(report: Report) {
   
    var promise = new Promise((resolve, reject) => {
      
      this.fireReport.child('1').set({
        femaleUser: report.femaleUser,
        maleUser: report.maleUser,
        matchedUser: report.matchedUser,
        sumUser: report.sumUser 

      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }











}
