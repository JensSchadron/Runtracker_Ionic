import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Injectable} from '@angular/core';
import * as myGlobals from "../../assets/globals";
import {User} from "../../model/user";

@Injectable()
export class FriendsService {
  private jwt = localStorage.getItem('id_token');
  private authHeader = new Headers();
  private authHeaderTwo = new Headers();

  constructor(private http: Http) {
    if (this.jwt) {
      this.authHeader.append('token', this.jwt);
      this.authHeaderTwo.append('token', this.jwt);
      this.authHeaderTwo.append('Content-Type', 'application/json');
    }
  }

  getPotentialFriends(): Observable<User[]> {
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/users/getAllPotentialFriends', {
      headers: this.authHeader
    })
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  getFriends(): Observable<User[]> {
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/users/getAllFriends', {
      headers: this.authHeader
    })
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  getFriendrequests(): Observable<User[]> {
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/users/getFriendrequests', {
      headers: this.authHeader
    })
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  addFriend(username): Observable<any> {
    let options = new RequestOptions({headers: this.authHeaderTwo});

    return this.http.put(myGlobals.BACKEND_BASEURL + '/api/users/addFriend/' + username, "", options)
      .map((res: Response) => {
          res.json();
          console.log(res);
        }
      )
      .catch(err => this.handleErrorObservable(err));
  }

  acceptFriend(username): Observable<any> {
    let options = new RequestOptions({headers: this.authHeaderTwo});

    return this.http.put(myGlobals.BACKEND_BASEURL + '/api/users/acceptFriend/' + username, "", options)
      .map((res: Response) => {
          res.json();
          console.log(res);
        }
      )
      .catch(err => this.handleErrorObservable(err));
  }

  deleteFriend(username): Observable<any> {
    return this.http.delete(myGlobals.BACKEND_BASEURL + '/api/users/removeFriend/' + username, {
      headers: this.authHeader
    })
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
