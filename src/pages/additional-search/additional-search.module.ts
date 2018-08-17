import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdditionalSearchPage } from './additional-search';

@NgModule({
  declarations: [
    AdditionalSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(AdditionalSearchPage),
  ],
})
export class AdditionalSearchPageModule {}
