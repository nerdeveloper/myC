import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BroadcastPage } from './broadcast';
//import {TabsPageModule } from '../../pages/tabs/tabs.module'




@NgModule({
  declarations: [
    BroadcastPage,
  ],
  imports: [
    IonicPageModule.forChild(BroadcastPage),
    //TabsPageModule,
  ],
})
export class BroadcastPageModule {}
