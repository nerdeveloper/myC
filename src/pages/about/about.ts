import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController} from 'ionic-angular';
import {PopoverComponent} from '../../components/popover/popover';
import {Storage } from '@ionic/storage';
import{Http, Headers} from '@angular/http';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	showMessages: any;
	userDetails: any;
	result:any


  constructor(public navCtrl: NavController, 
  	public popoverCtrl: PopoverController, private storage: Storage, 
  	public modalCtrl: ModalController,
  	public http: Http) {
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
 doRefresh(refresher){  const userData = JSON.parse(localStorage.getItem("data"));
    this.userDetails = userData.data;
    let url =
      "https://mychurchmember.com/api/get/messages" +
      "?token=" +
      this.userDetails.token + "&church_id=" + this.userDetails.church.id;
    this.http.get(url).subscribe(data =>{
      this.result = data;
      if(this.result.code === "200"){
      console.log(this.result);
      this.showMessages = JSON.stringify(this.result);
      this.storage.set('message', this.showMessages)
    }

     
    

    });
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  
}
}
