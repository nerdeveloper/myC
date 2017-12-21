import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController, ModalController } from 'ionic-angular';
import { Chart } from 'chart.js'
import {PopoverComponent} from '../../components/popover/popover' ; 
import {Http, Headers} from '@angular/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	 @ViewChild('doughnutCanvas') doughnutCanvas;

   doughnutChart: any;
   public userDetails: any 


  constructor(public http: Http,public navCtrl: NavController, public popoverCtrl: PopoverController, public modalCtrl: ModalController){
const userData = JSON.parse(localStorage.getItem('data'));
this.userDetails = userData.data;




  }   presentPopover(event) {
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
   ionViewDidLoad() {

        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["Males", "Females"],
                datasets: [{
                    label: '# of Votes',
                    data: [345, 422],
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


      let url = "http://mychurchmember.com/api/get/church"
let params = "?token=" + this.userDetails.token + "church_id=" + this.userDetails.church_id;
let headers  = new Headers;
 return this.http.post(url, params, {headers: headers}).map(res => res.json());
      

  
   }

}


