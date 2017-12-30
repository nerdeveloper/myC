//import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Http, Headers,} from '@angular/http';
import { Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';



let apiUrl = "https://mychurchmember.com/api/auth/"; 

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(private http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials, type){

  	return new Promise((resolve, reject) => {
  		let headers = new Headers();
      headers.append('Content-Type','application/json');
  		this.http.post(apiUrl+type, (credentials), {headers: headers})
  		 .subscribe(res =>{
  			resolve(res.json());
  		},(err) => {
  			reject(err);
  		});

  	});
  }
   sendsms(credentials, type){

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      this.http.post(apiUrl+type, (credentials), {headers: headers})
       .subscribe(res =>{
        resolve(res.json());
      },(err) => {
        reject(err);
      });

    });
  }
   
  


}
