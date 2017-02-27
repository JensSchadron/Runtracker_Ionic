import {Injectable} from '@angular/core';
import {Response, Headers} from '@angular/http';
import {User} from "../../model/user";
import {Observable} from "rxjs/Observable";
import * as myGlobals from "../../assets/globals";
import {Profileinfo} from "../../model/profileinfo";
import {AuthHttpImpl} from "./auth-http-impl";

@Injectable()
export class UserService {

  constructor(private authHttp: AuthHttpImpl) {
  }

  storeUserTokens(url: string) {
    localStorage.setItem('access_token', url.split('=')[1].split('&')[0]);
    localStorage.setItem('id_token', url.split('=')[5]);
  }

  getCreateUserFromBackEnd(profileInfo: Profileinfo): Observable<User|any> {
    console.log("Is it crashing in getCreateUserFromBackEnd()?");
    // let token = localStorage.getItem('id_token');
    // console.log("id_token - " + token);
    //
    // let tokenSegment = new Headers([{'token': token}]);

    return this.authHttp.getAuthHttp().get(myGlobals.BACKEND_BASEURL + '/api/users/getUser'
      // , {
      //   headers: tokenSegment
      // }
    )
      .map((res: Response) => res.json())
      .catch(err => this.handleUserError(profileInfo, err));
  }

  private handleUserError(profileInfo: Profileinfo, error: Response | any): Observable<any> {
    console.log("User error");
    console.log(error);
    console.log(profileInfo);
    if (error.status == 404) {
      return this.createUser(profileInfo);
    } else {
      return this.handleError(error);
    }
  }

  private handleError(error: Response | any): Observable<any> {
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

  private createUser(profileInfo: Profileinfo): Observable<User|any> {
    //Social login ==> extra info
    let firstname: string = "";
    let lastname: string = "";
    let gender: string = "UNDEFINED";
    if (profileInfo.sub.indexOf("facebook") >= 0 || profileInfo.sub.indexOf("google") >= 0) {
      firstname = profileInfo.givenName;
      lastname = profileInfo.familyName;
      if (typeof profileInfo.gender !== 'undefined')
        gender = profileInfo.gender.toUpperCase();
    }

    let newUser = {
      "userId": 0,
      "username": profileInfo.nickname.replace('.',''),
      "firstname": firstname,
      "lastname": lastname,
      "gender": gender,
      "city": "",
      "birthday": null,
      "friends": [],
      "competitionsCreated": [],
      "trackings": [],
      "competitionsWon": [],
      "competitionsRun": [],
      "maxSpeed": 0,
      "avgSpeed": 0,
      "maxDistance": 0,
      "avgDistance": 0,
      "totalDistance": 0,
      "ranTenKm": false,
      "ranTwentyKm": false,
      "ranMarathon": false,
      "nrOfCompetitionsWon": 0
    };
    console.log("Creating user");
    return this.authHttp.getAuthHttp().post(myGlobals.BACKEND_BASEURL + '/api/users/createUser', newUser)
      .map((res: Response) => {
        console.log("User hopefully created: " + res);
        return newUser;
      })
      .catch(err => this.handleError(err));
    // (res: Response) => res.json()
  }

  setOnline(): Observable<any> {
    return this.authHttp.getAuthHttp().put(myGlobals.BACKEND_BASEURL + '/api/users/setOnline', "{}")
      .map((res: Response) => {
        console.log(res);
      })
      .catch(err => this.handleError(err));
  }

  setOffline(): Observable<any> {
    return this.authHttp.getAuthHttp().put(myGlobals.BACKEND_BASEURL + '/api/users/setOffline', "{}")
      .map((res: Response) => {
        console.log(res);
      })
      .catch(err => this.handleError(err));
  }
}
