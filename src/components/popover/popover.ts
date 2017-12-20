import { Component} from '@angular/core';
import  { NavParams, NavController,} from 'ionic-angular';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text: string;
   


  constructor(public navParams: NavParams, public navCtrl: NavController,) {
   // console.log('Hello PopoverComponent Component');
   // this.text = 'Hello World';
  }
    gotoProfile() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push("ProfilePage");
  }
 // backtoLogin() {
  //	const root = this.app.getRootNav();
  //	root.popToRoot()
 // }
  logout(){
  	localStorage.clear();
  	this.navCtrl.setRoot("LoginPage");
     this.navCtrl.push("LoginPage");
   
  }
}



