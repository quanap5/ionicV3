import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StripeNativePage } from './stripe-native';

@NgModule({
  declarations: [
    StripeNativePage,
  ],
  imports: [
    IonicPageModule.forChild(StripeNativePage),
  ],
})
export class StripeNativePageModule {}
