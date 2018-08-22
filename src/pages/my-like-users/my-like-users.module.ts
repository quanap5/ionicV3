import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyLikeUsersPage } from './my-like-users';

@NgModule({
  declarations: [
    MyLikeUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyLikeUsersPage),
  ],
})
export class MyLikeUsersPageModule {}
