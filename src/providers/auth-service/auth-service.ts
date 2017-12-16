import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

let apiUrl = "http://mychurchmember.com/api/auth/login"; 

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }
  postData(credentials, type){

  	return new Promise((resolve, reject) => {
  		let headers = new HttpHeaders();
  		this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).subscribe(res => {
  			resolve(resolve.json());
  		},(err) => {
  			reject(err);
  		});

  	})
  }


}
