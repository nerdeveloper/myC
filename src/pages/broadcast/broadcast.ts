import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the BroadcastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-broadcast',
  templateUrl: 'broadcast.html',
})
export class BroadcastPage {
	selection: string;
	

  constructor(public navCtrl: NavController, public navParams: NavParams , public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BroadcastPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
}
show = false;
openPhone(){
	this.show = !this.show;
}

}
