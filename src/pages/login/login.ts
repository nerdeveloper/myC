import { Component} from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service'




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
responseData : any;
 data = {"email": "", "password":""}; 


	
constructor(public toastCtrl: ToastController, public formbuilder: FormBuilder, public navCtrl: NavController, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private iab: InAppBrowser) {
	
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
login(){
    this.authService.postData(this.data, "login").then((result)=>{
      this.responseData = result;
      console.log(this.responseData);
      localStorage.setItem('data', JSON.stringify(this.responseData));
       this.navCtrl.push("TabsPage");

      }, (err) => {
        //Connection fa
      })     
    }

  	 

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
