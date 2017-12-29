import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController, ModalController, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js'
import {PopoverComponent} from '../../components/popover/popover' ; 
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';




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
result:any
data: any;
getMessages : any;
showMessages: any;
gethere : any;
  constructor(public loadingCtrl: LoadingController ,
    private http: HttpClient,
    private storage: Storage,
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController, 
    public modalCtrl: ModalController){
const getData = JSON.parse(localStorage.getItem('property'));

this.userGet = getData.data;

this.males = this.userGet.males;
this.females = this.userGet.females;

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
        

        console.log("home is here");
  console.log("ionViewDidLoad BroadcastPage");
    const userData = JSON.parse(localStorage.getItem("data"));
    this.userDetails = userData.data;
    let url =
      "https://mychurchmember.com/api/get/messages" +
      "?token=" +
      this.userDetails.token + "&church_id=" + this.userDetails.church.id;
    this.http.get(url).subscribe(data =>{
      this.result = data;
      if(this.result.code === "200"){
      console.log(this.result);
      this.showMessages = JSON.stringify(this.result);
      this.storage.set('message', this.showMessages)
    }

     
    

    })
     

        // if(this.result.code === "200"){
         // localStorage.setItem('property', JSON.stringify(this.result));

      //  }
     // });
      }
   

}


