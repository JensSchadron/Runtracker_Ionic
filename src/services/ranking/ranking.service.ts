import {Headers, Response} from '@angular/http';
import {User} from "../../model/user";
import {Observable} from "rxjs/Observable";
import {Injectable} from '@angular/core';
import {BACKEND_BASEURL} from "../../assets/globals";
import {AuthHttpImpl} from "../auth/auth-http-impl";

@Injectable()
export class RankingService {

  constructor(private authHttp: AuthHttpImpl) {
  }

  getFriends(sortoption): Observable<User[]> {
    return this.authHttp.getAuthHttp().get(BACKEND_BASEURL + '/api/users/getAllFriendsSorted/' + sortoption)
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  getUsers(sortoption): Observable<User[]> {
    return this.authHttp.getAuthHttp().get(BACKEND_BASEURL + '/api/users/getAllUsersSorted/' + sortoption)
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
