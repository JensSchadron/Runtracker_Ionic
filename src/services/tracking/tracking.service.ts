import { Injectable }   from "@angular/core";
import { Response }     from '@angular/http';
import { Observable }   from "rxjs/Observable";
import { Tracking }     from "../../model/tracking";
import * as myGlobals   from "../../assets/globals";
import { AuthHttpImpl } from "../auth/auth-http-impl";

@Injectable()
export class TrackingService {

  constructor(public authHttp: AuthHttpImpl) {

  }

  public saveTracking(tracking: Tracking): Observable<any> {
    console.log("Saving tracking...");

    return this.authHttp.getAuthHttp().post(myGlobals.BACKEND_BASEURL + "/api/trackings/createTracking", tracking)
      .map((res: Response) => {
        console.log("Create tracking status: " + res.status);
      })
      .catch(error => this.handleErrorObservable(error));
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
