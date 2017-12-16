import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import  {PopoverComponent } from '../components/popover/popover';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import  {ReactiveFormsModule} from '@angular/forms';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';




//import  { BroadcastPage } from '../pages/broadcast/broadcast'



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PopoverComponent,
    //BroadcastPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
//     tabsLayout: 'icon-start',

    }),
   ReactiveFormsModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PopoverComponent,
   // BroadcastPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
