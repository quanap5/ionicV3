import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyInterestUsersPage } from './my-interest-users';

@NgModule({
  declarations: [
    MyInterestUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyInterestUsersPage),
  ],
})
export class MyInterestUsersPageModule {}
