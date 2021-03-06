import { Component } from '@angular/core';
import { Platform, IonicPage}  from 'ionic-angular';

import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
selector: 'tabs-page',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
 // tab3Root = ContactPage;

  isAndroid: boolean = false;

  constructor(public platform: Platform) {
  	this.isAndroid = platform.is('android');

  }
}