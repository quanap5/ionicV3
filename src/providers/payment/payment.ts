import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the PaymentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentProvider {

  userId: string;

  constructor(public http: HttpClient, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    console.log('Hello PaymentProvider Provider');
    this.afAuth.authState.subscribe((auth) => {
      if (auth) this.userId = auth.uid;
    })
  }


  // This will save the token to firebase, trigger the cloud function

  processPayment(token: any, amount){
    const payment = {token , amount}
    return this.db.list(`/payments/${this.userId}`).push(payment);
  }

}
