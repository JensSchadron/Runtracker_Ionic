import {Injectable} from '@angular/core';
import {Response, Headers} from '@angular/http';
import {User} from "../../model/user";
import {Observable} from "rxjs/Observable";
import * as myGlobals from "../../assets/globals";
import {AuthHttpImpl} from "./auth-http-impl";

@Injectable()
export class UserService {

  constructor(private authHttp: AuthHttpImpl) {}

  getUser(): Observable<User|any> {
    console.log("Is it crashing in getUser()?");
    return this.authHttp.getAuthHttp().get(myGlobals.BACKEND_BASEURL + '/api/users/getUser')
      .map((res: Response) => res.json())
      .catch(err => this.handleUserError(err));
  }

  private handleUserError(error: Response | any): Observable<any> {
    console.log("User error");
    console.log(error);
    if (error.status == 404) {
      return this.createUser();
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

  private createUser(): Observable<User|any> {
    //Social login ==> extra info
    let strProfileInfo = localStorage.getItem('profile');
    console.log("Creating user - %s", strProfileInfo);
    let profileInfo = JSON.parse(strProfileInfo);

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

  updateUser(user : User): Observable<User>{
    return this.authHttp.getAuthHttp().put(myGlobals.BACKEND_BASEURL + '/api/users/updateUser', user)
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }

  checkUsernameAvailable(username: string): Observable<boolean>{
    return this.authHttp.getAuthHttp().get(myGlobals.BACKEND_BASEURL + '/api/users/checkUsername/' + username)
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }
}
