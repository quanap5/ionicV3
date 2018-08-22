import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageChargePage } from './manage-charge';

@NgModule({
  declarations: [
    ManageChargePage,
  ],
  imports: [
    IonicPageModule.forChild(ManageChargePage),
  ],
})
export class ManageChargePageModule {}
