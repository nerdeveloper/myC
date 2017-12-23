import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController, ModalController, LoadingController } from 'ionic-angular';
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


  constructor(public loadingCtrl: LoadingController ,private http: Http,public navCtrl: NavController, public popoverCtrl: PopoverController, public modalCtrl: ModalController){
const getData = JSON.parse(localStorage.getItem('property'));
if(getData){
this.userGet = getData.data;

this.males = this.userGet.males;
this.females = this.userGet.females;
}else{
  this.males=0;
  this.females=0;
}
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
                    data: [this.females, this.males],
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
        

         
 
      }
   

}


