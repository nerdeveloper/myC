import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { Http, Headers } from "@angular/http";
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
  selection: string;
  userDetails: any;
  result: any;

  constructor(
    private http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad BroadcastPage");
    const userData = JSON.parse(localStorage.getItem("data"));
    this.userDetails = userData.data;
    let url =
      "https://mychurchmember.com/api/get/phonebase" +
      "?token=" +
      this.userDetails.token;
    let params = "church_id=" + this.userDetails.id;
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

  dismiss() {
    this.viewCtrl.dismiss();
  }
  show = false;
  openPhone() {
    this.show = !this.show;
  }
}
