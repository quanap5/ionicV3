import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoadmapPage } from './loadmap';

@NgModule({
  declarations: [
    LoadmapPage,
  ],
  imports: [
    IonicPageModule.forChild(LoadmapPage),
  ],
})
export class LoadmapPageModule {}
