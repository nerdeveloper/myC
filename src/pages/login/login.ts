import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation'




/**
 * Generated class for the LoginPage page.
 
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	pushPage: string;
	forget: string;
	tabPage: string;


form: FormGroup;


	
constructor(public toastCtrl: ToastController,public formbuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private iab: InAppBrowser) {
	
  //this.email = new FormControl("", CustomValidators.email);
  //this.form = new FormGroup({
  //email: this.email
 //})
 this.form = formbuilder.group({
   email: [null, Validators.compose(
     [Validators.required, CustomValidators.email])],
   password: [null, Validators.required]
 });
 
	this.forget = "ForgetPasswordPage";
	this.tabPage = "TabsPage";
 
 

	
	
}
   presentLoading() {
    this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3000,
      dismissOnPageChange: true
    }).present();

  }
  iabOpen(){
  	const options: InAppBrowserOptions = {
  		clearsessioncache : 'yes',
  		toolbar:'yes',
  		toolbarposition: 'top'

  	}
   const broswer = this.iab.create('http://mychurchmember.com/signup', '_self', options); 
broswer.show();
}
showToast(position:string){
  let toast = this.toastCtrl.create({
    message: 'how are you',
    position: position
  });
  toast.present();
}

  	 

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
