import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController, ModalController } from 'ionic-angular';
import { Chart } from 'chart.js'
import {PopoverComponent} from '../../components/popover/popover' ; 
import {Http, Headers,} from '@angular/http';
import 'rxjs/add/operator/map';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	 @ViewChild('doughnutCanvas') doughnutCanvas;
 males: any;
 females: any;
   doughnutChart: any;
   public userDetails: any;
    public user : any;
public userGet: any;


  constructor(private http: Http,public navCtrl: NavController, public popoverCtrl: PopoverController, public modalCtrl: ModalController){
const userData = JSON.parse(localStorage.getItem('data'));
this.userDetails = userData.data;
const userPrint = JSON.parse(localStorage.getItem('property'));
this.userGet = userPrint.data;

this.males = this.userGet.males;
this.females = this.userGet.females;



  }   presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
    	ev:event
    });
  }
  postUserDetails(){
      let url = "https://mychurchmember.com/api/get/church" + "?token=" + this.userDetails.token 
let params = "church_id=" + this.userDetails.id;
let headers  = new Headers();
headers.append('Content-Type','application/x-www-form-urlencoded');
 return this.http.post(url, params, {headers: headers}).map(response => response.json());
}

  


  openModal(event){
  	let broadcastPage: string = 'BroadcastPage'
  	let modal = this.modalCtrl.create(broadcastPage, event);
  	modal.present();

  }
   ionViewDidLoad() {

        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

 
            type: 'doughnut',
            data: {
                labels: ["Males", "Females"],
                datasets: [{
                    label: '# of Votes',
                    data: [this.males, this.females],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        
                    ]
                }]
            }
 
        });
this.postUserDetails().subscribe(data => this.user = (data),
  error => alert(error),() =>  localStorage.setItem('property', JSON.stringify(this.user)))


// console.log(thisser);;
  //   
 }
        


}


