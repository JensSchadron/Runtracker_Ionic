import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {User} from "../../model/user";
import {Observable} from "rxjs/Observable";
import {AuthService} from '../auth/auth.service';
import {BACKEND_BASEURL} from "../../assets/globals";
import {AuthHttpImpl} from "../auth/auth-http-impl";

@Injectable()
export class FriendProfilePageService {
  constructor(private authHttp: AuthHttpImpl, private auth: AuthService) {
  }


  getUser(username): Observable<User> {
    return this.authHttp.getAuthHttp().get(BACKEND_BASEURL + '/api/users/getUser/' + username)
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
