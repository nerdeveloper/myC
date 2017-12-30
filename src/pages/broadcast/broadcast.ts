import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { Http, Headers } from "@angular/http";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Storage } from '@ionic/storage';


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

//values of sending messages
message: string;
selection: string;
sender: string

  constructor(
    private http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formbuilder: FormBuilder,
    public storage: Storage




  ) {


  }
 
 sendSms(){
    const userData = JSON.parse(localStorage.getItem("data"));
    this.userDetails = userData.data;
    let url =
      "https://mychurchmember.com/api/send/send_sms" +
      "?token=" +
      this.userDetails.token;
    let params = "message" + this.message + "type" + this.selection + "sender_name" + this.sender ;
    let headers = new Headers(); 
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    this.http
      .post(url, params, { headers: headers })
      .map(response => response.json())
      .toPromise()
      .then(response => {
        this.result = response;
        console.log(this.result);

        // if(this.result.code === "200"){
        //   localStorage.setItem('property', JSON.stringify(this.result));

        //}
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

        // if(this.result.code === "200"){
        //   localStorage.setItem('property', JSON.stringify(this.result));

        //}
     
     });
      
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  show = false;
  openPhone() {
    this.show = !this.show;
  }

}
