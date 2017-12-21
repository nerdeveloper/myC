import { Component} from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController, AlertController} from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { Network } from "@ionic-native/network"




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
 data = {email:"", password:""}; 

	
constructor(private alertCtrl: AlertController,private network: Network,public toastCtrl: ToastController, public formbuilder: FormBuilder, public navCtrl: NavController, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private iab: InAppBrowser) {
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


  iabOpen(){
  	const options: InAppBrowserOptions = {
  		clearsessioncache : 'yes',
  		toolbar:'yes',
  	toolbarposition: 'top'
}
   const broswer = this.iab.create('https://mychurchmember.com/signup', '_self', options); 
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
   let loading =  this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true,
      duration:5000,
    });
   
this.authService.postData(this.data, "login").then((result)=>{
      this.responseData = result;
      console.log(this.responseData);
      console.log(this.responseData.code);
      if(this.responseData.code === "200"){
        localStorage.setItem('data', JSON.stringify(this.responseData));
       this.navCtrl.push("TabsPage");
    
 }else{
   loading.dismissAll();
   let alert = this.alertCtrl.create({
    title: 'Oops!',
    subTitle: 'Invalid Email or Password!',
    buttons: ['Dismiss']
  });
  alert.present();

 }
  


})
}
 ionViewDidLoad() {
console.log('ionViewDidLoad LoginPage');
// watch network for a disconnect
this.network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-(');
  let toast = this.toastCtrl.create({
    message: 'The network is Off',
   showCloseButton: true,
   closeButtonText: "Ok",
    position: 'top',
    duration:4000,

  });
  toast.present();
});
 this.network.onConnect().subscribe(() => {
  console.log('network connected!');
  let toast = this.toastCtrl.create({
    message: 'The network is Stable',
   showCloseButton: true,
   closeButtonText: "Ok",
    position: 'top',
    duration:4000
  });
  toast.present();
  

});


 }

 }

