import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController} from 'ionic-angular';
import {PopoverComponent} from '../../components/popover/popover';
import {Storage } from '@ionic/storage';
import{HttpClient} from '@angular/common/http';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	public showMessages: any;
	public userDetails: any;
	result:any;
 showResult: any;

  constructor(public navCtrl: NavController, 
  	public popoverCtrl: PopoverController, private storage: Storage, 
  	public modalCtrl: ModalController,
  	public http: HttpClient) {
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
    doRefresh(refresher){
    	const userData = JSON.parse(localStorage.getItem("data"));
    this.userDetails = userData.data;
    let url =
      "https://mychurchmember.com/api/get/messages" +
      "?token=" +
      this.userDetails.token + "&church_id=" + this.userDetails.church.id;
    this.http.get(url).subscribe(data =>{
      this.result = data;
     // this.result = Array.of(this.result);
        console.log(this.result);
      if(this.result.code === "200"){
      console.log(this.result.code);
      this.showResult = JSON.stringify(this.result);
     this.storage.set('message', this.showResult)
    }

     });
    //console.log('Begin async operation', refresher);
     this.storage.get('message').then(data => {
   this.showMessages = JSON.parse(data).data;
   console.log(this.showMessages);
 });
     setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);

  }


 ionViewCanEnter() {
 	console.log('this is it');
 	

 }
}
