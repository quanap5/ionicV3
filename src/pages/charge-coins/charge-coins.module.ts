import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChargeCoinsPage } from './charge-coins';

@NgModule({
  declarations: [
    ChargeCoinsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChargeCoinsPage),
  ],
})
export class ChargeCoinsPageModule {}
