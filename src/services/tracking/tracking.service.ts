import {Injectable} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Tracking} from "../../model/tracking";
import * as myGlobals from "../../assets/globals";
import {AuthHttpImpl} from "../auth/auth-http-impl";

@Injectable()
export class TrackingService {

  constructor(public authHttp: AuthHttpImpl) {

  }

  public createTracking(tracking: Tracking): Observable<Tracking|any> {
    console.log("Start persisting tracking...");
    return this.authHttp.getAuthHttp().post(myGlobals.BACKEND_BASEURL + "/api/trackings/createTracking", JSON.stringify(tracking))
      .map((res: Response) => {
        alert("Tracking persisted!");
        console.log("Tracking persisted!")
      })
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
