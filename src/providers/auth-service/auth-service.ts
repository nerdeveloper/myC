//import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Http, Headers,} from '@angular/http';
import { Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

let apiUrl = "http://mychurchmember.com/api/auth/"; 

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials, type){

  	return new Promise((resolve, reject) => {
  		let headers = new Headers();
  		this.http.post(apiUrl+type, (credentials), {headers: headers})
  		 .subscribe(res =>{
  			resolve(res.json());
  		},(err) => {
  			reject(err);
  		});

  	});
  }


}
