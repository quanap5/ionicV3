import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewUsersPage } from './new-users';

@NgModule({
  declarations: [
    NewUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(NewUsersPage),
  ],
})
export class NewUsersPageModule {}
