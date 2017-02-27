import {AuthConfig, AuthHttp}     from "angular2-jwt";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";


@Injectable()
export class AuthHttpImpl {
  constructor(private http: Http) {
  }

  getAuthHttp(): AuthHttp {
    let tokenValue = localStorage.getItem('id_token');
    console.log('token found in localStorage: ' + tokenValue);
    if (tokenValue.length > 0) {
      return new AuthHttp(new AuthConfig({
        globalHeaders: [
          {'token': tokenValue}
        ]
      }), this.http);
    } else {
      console.log('returning authHttp without token');
    }
  }
}
