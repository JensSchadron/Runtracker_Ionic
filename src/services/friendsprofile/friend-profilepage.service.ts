import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {User} from "../../model/user";
import {Observable} from "rxjs/Observable";
import {AuthService} from '../auth/auth.service';
import * as myGlobals from "../../assets/globals";

@Injectable()
export class FriendProfilePageService {
  private authHeader;
  private jwt = localStorage.getItem('id_token');

  constructor(private http: Http, private auth: AuthService) {
    this.authHeader = new Headers();
    if(this.jwt) {
      this.authHeader.append('token', this.jwt);
    }
  }


  getUser(username): Observable<User> {
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/users/getUser/' + username,{
        headers: this.authHeader
      })
      .map((res: Response) =>  res.json())
      .catch(this.handleErrorObservable);
  }

  private handleErrorObservable(error: Response | any): Observable<any> {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
