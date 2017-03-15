import {Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Injectable} from '@angular/core';
import {BACKEND_BASEURL} from "../../assets/globals";
import {User} from "../../model/user";
import {AuthHttpImpl} from "../auth/auth-http-impl";

@Injectable()
export class FriendsService {
  constructor(private authHttp: AuthHttpImpl) {

  }

  getPotentialFriends(): Observable<User[]> {
    return this.authHttp.getAuthHttp().get(BACKEND_BASEURL + '/api/users/getAllPotentialFriends')
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  getFriends(): Observable<User[]> {
    return this.authHttp.getAuthHttp().get(BACKEND_BASEURL + '/api/users/getAllFriends')
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  getFriendrequests(): Observable<User[]> {
    return this.authHttp.getAuthHttp().get(BACKEND_BASEURL + '/api/users/getFriendrequests')
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  addFriend(username): Observable<any> {
    // let options = new RequestOptions({headers: this.authHeaderTwo});

    return this.authHttp.getAuthHttp().put(BACKEND_BASEURL + '/api/users/addFriend/' + username, "")
      .map((res: Response) => {
          res.json();
          console.log(res);
        }
      )
      .catch(err => this.handleErrorObservable(err));
  }

  acceptFriend(username): Observable<any> {
    // let options = new RequestOptions({headers: this.authHeaderTwo});

    return this.authHttp.getAuthHttp().put(BACKEND_BASEURL + '/api/users/acceptFriend/' + username, "")
      .map((res: Response) => {
          res.json();
          console.log(res);
        }
      )
      .catch(err => this.handleErrorObservable(err));
  }

  deleteFriend(username): Observable<any> {
    return this.authHttp.getAuthHttp().delete(BACKEND_BASEURL + '/api/users/removeFriend/' + username)
      .map((res: Response) => {
          res.json();
        }
      )
      .catch(err => this.handleErrorObservable(err));
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
