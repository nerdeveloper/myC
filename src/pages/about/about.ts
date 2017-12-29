import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController} from 'ionic-angular';
import {PopoverComponent} from '../../components/popover/popover';
import {Storage } from '@ionic/storage'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	showMessages: any;


  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private storage: Storage, public modalCtrl: ModalController) {
  	this.storage.get('message').then(data => {
   this.showMessages = JSON.parse(data).data;
 });


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
