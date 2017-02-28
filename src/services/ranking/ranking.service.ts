import {Http,Headers,Response} from '@angular/http';
import {User} from "../../model/user";
import {Observable} from "rxjs/Observable";
import {Injectable} from '@angular/core';
import * as myGlobals from "../../app/globals";

@Injectable()
export class RankingService {
  private jwt = localStorage.getItem('id_token');
  private authHeader = new Headers();

  constructor(private http:Http){
    if(this.jwt) {
      this.authHeader.append('token', this.jwt);
    }
  }

  getFriends(sortoption): Observable<User[]>{
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/users/getAllFriendsSorted/' + sortoption, {
        headers: this.authHeader
      })
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  getUsers(sortoption): Observable<User[]>{
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/users/getAllUsersSorted/' + sortoption, {
        headers: this.authHeader
      })
      .map((res: Response) => res.json())
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
