import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController } from 'ionic-angular';

import {PopoverComponent} from '../../components/popover/popover' ;



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public modalCtrl: ModalController){

  }
   presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
    	ev:event
    });
  }
  openModal(event){
  	let broadcastPage: string = 'BroadcastPage'
  	let modal = this.modalCtrl.create(broadcastPage, event);
  	modal.present();
  }
}


