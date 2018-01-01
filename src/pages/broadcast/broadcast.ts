import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  LoadingController,
  AlertController
} from "ionic-angular";
import { Http, Headers, } from "@angular/http";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { CustomValidators } from "ng2-validation";
import { Network } from "@ionic-native/network";


/**
 * Generated class for the BroadcastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-broadcast",
  templateUrl: "broadcast.html"
})
export class BroadcastPage {
  userDetails: any;
  result: any;
  groups: any
 form: FormGroup;
 getMessages : any;
info:any;
adapt: any;
phone_no: any;
getparam: any;
church_group: any;
phone_base_id: any;



//values of sending messages
message: string;
selection: string;
sender: string
getNumber: string = "phone_no";
getgroup: string = "church_group";
getphone: string = "phone_base_id";

  constructor(
    private http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formbuilder: FormBuilder,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public network: Network,

  ) { 
   this.form = formbuilder.group({
      selection: [null, Validators.required],
      sender: [null, Validators.required],
      message: [null, Validators.required],
    }); }



  justdo(){
if(this.selection === 'manual'){
this.adapt = this.getNumber;
this.getparam = this.phone_no
console.log(this.adapt);
console.log(this.getparam);

}else if(this.selection === 'group'){
  this.adapt = this.getgroup;
  this.getparam = this.church_group
  console.log(this.adapt)
  console.log(this.getparam);


}else if(this.selection === 'phonebase'){
  this.adapt = this.getphone;
  this.getparam = this.phone_base_id
  console.log(this.adapt);
  console.log(this.getparam);
}
  }
 
 sendSms(){
   let loading = this.loadingCtrl.create({
      content: "Sending...",
    });
    loading.present();
    const userData = JSON.parse(localStorage.getItem("data"));
    this.userDetails = userData.data;
    this.justdo();
    let url =
      "https://mychurchmember.com/api/send/send_sms" +
      "?token=" +
      this.userDetails.token;
    let params = "message=" + this.message + "&type=" + this.selection + "&sender_name=" + this.sender + "&"
    + this.adapt + "=" + this.getparam ;

    let headers = new Headers(); 
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    this.http
      .post(url, params, {headers: headers})
      .map(response => response.json())
      .toPromise()
      .then(response => {
        this.result = response;
        console.log(this.result);
 if(this.result.code === "200"){
   loading.dismissAll();
   let alert = this.alertCtrl.create({
        title: "Success",
        subTitle: "Message Sent!",
        buttons: ["Ok"]
      });
      alert.present();
      

        }else if(this.network.type == "none"){
          let alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Message was Unsuccessful! ",
        buttons: ["Try Again!"]
      });
      alert.present();
        }else{
          loading.dismiss();
      let alert = this.alertCtrl.create({
        title: "Network",
        subTitle: "Network Error Occured! Check your Internet Settings",
        buttons: ["Dismiss"]
      });
      alert.present();
        }
      });

 }  





  ionViewDidLoad() {
    
    console.log("ionViewDidLoad BroadcastPage");
    const userData = JSON.parse(localStorage.getItem("data"));
    this.userDetails = userData.data;
    let url =
      "https://mychurchmember.com/api/get/phonebase" +
      "?token=" +
      this.userDetails.token;
    let params = "church_id=" + this.userDetails.church.id;
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    this.http
      .post(url, params, { headers: headers })
      .map(response => response.json())
      .toPromise()
      .then(response => {
        this.result = response.data;
        console.log(this.result);

        // if(this.result.code === "200"){
        //   localStorage.setItem('property', JSON.stringify(this.result));

        //}
      });
let apiurl =
      "https://mychurchmember.com/api/get/churchgroup" +
      "?token=" +
      this.userDetails.token;
    let param = "church_id=" + this.userDetails.church.id;
    let header = new Headers();
    header.append("Content-Type", "application/x-www-form-urlencoded");
    this.http
      .post(apiurl, param, { headers: headers })
      .map(response => response.json())
      .toPromise()
      .then(response => {
        this.groups = response.data;
        console.log(this.groups);
     
     });
      
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
