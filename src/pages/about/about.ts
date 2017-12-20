import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import {PopoverComponent} from '../../components/popover/popover'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {

  }
presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
    	ev:event
    });
  }

}
